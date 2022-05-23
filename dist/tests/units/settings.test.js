"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsTest = void 0;
const settings_1 = require("../../code/settings");
const assert_1 = __importDefault(require("assert"));
const logs_1 = require("../../code/logs");
class SettingsTest {
    constructor() {
        this.testGetChatSetting = () => {
            settings_1.settings.initializeChatSettings(-1);
            assert_1.default.equal(settings_1.settings.getChatSetting(-1, "silent"), false);
        };
        this.testToggleChatSetting = () => {
            settings_1.settings.initializeChatSettings(-1);
            assert_1.default.equal(settings_1.settings.getChatSetting(-1, "capricorn"), false);
            settings_1.settings.toggleChatSetting(-1, "capricorn");
            assert_1.default.equal(settings_1.settings.getChatSetting(-1, "capricorn"), true);
        };
        this.run = () => {
            this.testGetChatSetting();
            logs_1.logs.writeSuccessTestMessage("Settings", "getChatSetting");
            this.testToggleChatSetting();
            logs_1.logs.writeSuccessTestMessage("Settings", "toggleChatSetting");
        };
    }
}
exports.SettingsTest = SettingsTest;
