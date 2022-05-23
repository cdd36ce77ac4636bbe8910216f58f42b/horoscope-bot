"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.callbackQueryHandler = void 0;
const zodiac_signs_1 = require("./zodiac-signs");
const settings_1 = require("./settings");
class CallbackQueryHandler {
    constructor() {
        this.editKeyboardToSigns = (queryData) => __awaiter(this, void 0, void 0, function* () {
            yield queryData.methods.editMessageReplyMarkup(queryData.chatId, queryData.messageId, "", {
                inline_keyboard: zodiac_signs_1.zodiacSigns.getKeyboard()
            });
        });
        this.editKeyboardToMain = (queryData) => __awaiter(this, void 0, void 0, function* () {
            yield queryData.methods.editMessageReplyMarkup(queryData.chatId, queryData.messageId, "", { inline_keyboard: settings_1.settings.getKeyboard() });
        });
        this.setSettingsText = (queryData) => __awaiter(this, void 0, void 0, function* () {
            settings_1.settings.toggleChatSetting(queryData.chatId, queryData.data);
            settings_1.settings.updateSettingsFile();
            yield queryData.methods.editMessageText(queryData.chatId, queryData.messageId, "", settings_1.settings.getChatSettingsMessage(queryData.chatId));
        });
        this.handle = (query, methods) => __awaiter(this, void 0, void 0, function* () {
            if (!query || !query.data || !query.message)
                return;
            const chatId = query.message.chat.id;
            const messageId = query.message.message_id;
            const data = query.data;
            const queryData = { chatId, messageId, methods, data };
            if (data === "return") {
                yield this.editKeyboardToMain(queryData);
            }
            if (data === "signs") {
                yield this.editKeyboardToSigns(queryData);
            }
            if (data === "silent") {
                yield this.setSettingsText(queryData);
                yield this.editKeyboardToMain(queryData);
            }
            if (zodiac_signs_1.zodiacSigns.hasSign(data)) {
                yield this.setSettingsText(queryData);
                yield this.editKeyboardToSigns(queryData);
            }
        });
    }
}
exports.callbackQueryHandler = new CallbackQueryHandler();
