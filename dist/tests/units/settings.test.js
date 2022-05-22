"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsTest = void 0;
const settings_1 = require("../../code/settings");
const assert_1 = __importDefault(require("assert"));
const filesystem_1 = require("../../code/filesystem");
const logs_1 = require("../../code/logs");
class SettingsTest {
    constructor() {
        this.testInitializeChatSettings = () => {
            settings_1.settings.initializeChatSettings("test-chat");
            const fileData = filesystem_1.fileSystem.readFileToString(settings_1.settings.getSettingsPath());
            assert_1.default.ok(fileData.includes("test-chat"));
        };
        this.testDeleteChatSettings = () => {
            settings_1.settings.initializeChatSettings("test-chat");
            assert_1.default.equal(settings_1.settings.hasChatSettings("test-chat"), true);
            settings_1.settings.deleteChatSettings("test-chat");
            assert_1.default.equal(settings_1.settings.hasChatSettings("test-chat"), false);
        };
        this.testHasChat = () => {
            settings_1.settings.deleteChatSettings("test-chat");
            settings_1.settings.initializeChatSettings("test-chat");
            assert_1.default.equal(settings_1.settings.hasChatSettings("test-chat"), true);
            assert_1.default.equal(settings_1.settings.hasChatSettings("non-existing-chat"), false);
        };
        this.testToggleSilentValue = () => {
            settings_1.settings.deleteChatSettings("test-chat");
            settings_1.settings.initializeChatSettings("test-chat");
            assert_1.default.equal(settings_1.settings.getChatSettings("test-chat").silent, false);
            settings_1.settings.toggleSilentValue("test-chat");
            assert_1.default.equal(settings_1.settings.getChatSettings("test-chat").silent, true);
        };
        this.testToggleSignValue = () => {
            settings_1.settings.deleteChatSettings("test-chat");
            settings_1.settings.initializeChatSettings("test-chat");
            assert_1.default.equal(settings_1.settings.getChatSettings("test-chat").signs.aquarius, false);
            settings_1.settings.toggleSignValue("test-chat", "aquarius");
            assert_1.default.equal(settings_1.settings.getChatSettings("test-chat").signs.aquarius, true);
        };
        this.deleteTestChat = () => {
            settings_1.settings.deleteChatSettings("test-chat");
        };
        this.run = () => {
            this.testInitializeChatSettings();
            logs_1.logs.writeSuccessTestMessage("Settings", "initializeChatSettings");
            this.testDeleteChatSettings();
            logs_1.logs.writeSuccessTestMessage("Settings", "deleteChatSettings");
            this.testHasChat();
            logs_1.logs.writeSuccessTestMessage("Settings", "hasChat");
            this.testToggleSilentValue();
            logs_1.logs.writeSuccessTestMessage("Settings", "toggleSilentValue");
            this.testToggleSignValue();
            logs_1.logs.writeSuccessTestMessage("Settings", "toggleSignValue");
            this.deleteTestChat();
        };
    }
}
exports.SettingsTest = SettingsTest;
