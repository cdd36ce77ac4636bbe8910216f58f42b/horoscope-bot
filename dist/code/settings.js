"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.settings = void 0;
const filesystem_1 = require("./filesystem");
class Settings {
    constructor() {
        this.settingsDirectoryPath = "data";
        this.currentSettings = {};
        this.defaultSettings = {
            silent: false,
            signs: {
                aries: false,
                taurus: false,
                gemini: false,
                cancer: false,
                leo: false,
                virgo: false,
                libra: false,
                scorpio: false,
                sagittarius: false,
                capricorn: false,
                aquarius: false,
                pisces: false
            }
        };
        this.toggleSilentValue = (chatId) => {
            if (this.hasChatSettings(chatId)) {
                const chatSettings = this.getChatSettings(chatId);
                chatSettings.silent = !chatSettings.silent;
                this.setChatSettings(chatId, chatSettings);
            }
            this.updateSettings();
        };
        this.toggleSignValue = (chatId, sign) => {
            if (this.hasChatSettings(chatId) && sign in this.getChatSettings(chatId).signs) {
                const chatSettings = this.getChatSettings(chatId);
                // @ts-ignore
                chatSettings.signs[sign] = !chatSettings.signs[sign];
                this.setChatSettings(chatId, chatSettings);
            }
            this.updateSettings();
        };
        this.deleteChatSettings = (chatId) => {
            if (this.hasChatSettings(chatId)) {
                delete this.currentSettings[String(chatId)];
                this.updateSettings();
            }
        };
        this.initializeChatSettings = (chatId) => {
            if (this.hasChatSettings(chatId))
                return;
            try {
                this.setChatSettings(String(chatId), this.defaultSettings);
            }
            catch (_a) {
                throw Error("Failed to initialize chat!");
            }
            this.updateSettings();
        };
        this.setChatSettings = (chatId, settings) => {
            this.currentSettings[String(chatId)] = settings;
        };
        this.getChatSettings = (chatId) => {
            if (this.hasChatSettings(chatId)) {
                return this.currentSettings[String(chatId)];
            }
            return this.defaultSettings;
        };
        this.hasChatSettings = (chatId) => {
            return !!this.currentSettings[String(chatId)];
        };
        this.updateSettings = () => {
            try {
                filesystem_1.fileSystem.writeJsonFile(this.getSettingsPath(), this.currentSettings);
            }
            catch (_a) {
                throw Error("Failed to update settings!");
            }
        };
        this.getSettingsPath = () => {
            return this.settingsDirectoryPath + "/settings.json";
        };
        filesystem_1.fileSystem.createPath(this.settingsDirectoryPath);
        if (!filesystem_1.fileSystem.isExists(this.getSettingsPath())) {
            filesystem_1.fileSystem.writeJsonFile(this.getSettingsPath(), {});
        }
        this.currentSettings = filesystem_1.fileSystem.readJsonFile(this.getSettingsPath());
    }
}
exports.settings = new Settings();
