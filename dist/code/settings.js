"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.settings = void 0;
const zodiac_signs_1 = require("./zodiac-signs");
const filesystem_1 = require("./filesystem");
class Settings {
    constructor() {
        this.settingsDirectoryPath = "data";
        this.defaultChatSettings = {
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
        this.getChatSettingsMessage = (chatId) => {
            let text = "";
            if (!this.isChatExists(chatId))
                return text;
            const chatSettings = this.currentSettings[chatId];
            const signs = Object.keys(chatSettings.signs);
            if (chatSettings.silent) {
                text += "🪶 Бесшумный режим\n";
            }
            signs.forEach(sign => {
                text += this.getChatSetting(chatId, sign) ? zodiac_signs_1.zodiacSigns.getSign(sign).ru + "\n" : "";
            });
            return text;
        };
        this.getChatSetting = (chatId, settingName) => {
            let result = false;
            if (this.isChatExists(chatId)) {
                const chatSettings = this.getChatSettings(chatId);
                if (settingName === "silent") {
                    result = chatSettings.silent;
                }
                const signs = Object.keys(this.defaultChatSettings.signs);
                signs.forEach(sign => {
                    if (sign === settingName)
                        result = chatSettings.signs[sign];
                });
            }
            return result;
        };
        this.toggleChatSetting = (chatId, settingName) => {
            if (!this.isChatExists(chatId))
                return;
            const chatSettings = this.getChatSettings(chatId);
            const settingValue = this.getChatSetting(chatId, settingName);
            const signs = Object.keys(this.defaultChatSettings.signs);
            if (settingName === "silent") {
                chatSettings.silent = !settingValue;
            }
            signs.forEach(sign => {
                sign === settingName && (chatSettings.signs[sign] = !settingValue);
            });
            this.setChatSettings(chatId, chatSettings);
        };
        this.initializeChatSettings = (chatId) => {
            this.setChatSettings(chatId, this.defaultChatSettings);
        };
        this.getChatSettings = (chatId) => {
            return this.currentSettings[chatId];
        };
        this.setChatSettings = (chatId, chatSettings) => {
            this.currentSettings[chatId] = JSON.parse(JSON.stringify(chatSettings));
        };
        this.isChatExists = (chatId) => {
            return !!this.currentSettings[chatId];
        };
        this.getSettingsPath = () => {
            return this.settingsDirectoryPath + "/settings.json";
        };
        this.updateSettingsFile = () => {
            filesystem_1.fileSystem.writeJsonFile(this.getSettingsPath(), this.currentSettings);
        };
        filesystem_1.fileSystem.createPath(this.settingsDirectoryPath);
        if (filesystem_1.fileSystem.isExists(this.getSettingsPath())) {
            this.currentSettings = filesystem_1.fileSystem.readJsonFile(this.getSettingsPath());
        }
        else {
            this.currentSettings = {};
        }
    }
}
exports.settings = new Settings();
