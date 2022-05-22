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
const inline_keyboard_getter_1 = require("./inline-keyboard-getter");
const zodiac_signs_1 = require("./zodiac-signs");
const settings_1 = require("./settings");
const mainInlineKeyboard = inline_keyboard_getter_1.inlineKeyboardGetter.getMainInlineKeyboard();
const signsInlineKeyboard = inline_keyboard_getter_1.inlineKeyboardGetter.getSignsInlineKeyboard();
class CallbackQueryHandler {
    constructor() {
        this.updateSettingsText = (queryData, inlineKeyboardType) => __awaiter(this, void 0, void 0, function* () {
            const { chatId, messageId, methods } = queryData;
            const inlineKeyboard = inlineKeyboardType === "main" ? mainInlineKeyboard : signsInlineKeyboard;
            const chatSettings = settings_1.settings.getChatSettings(chatId);
            let newText = "⚙️ Выбранные настройки:\n";
            newText += chatSettings.silent ? "Бесшумный режим\n" : "";
            const signs = Object.keys(chatSettings.signs);
            for (let i = 0; i < signs.length; i++) {
                const sign = signs[i];
                const russianSignName = zodiac_signs_1.zodiacSigns.getSign(sign).ru;
                // @ts-ignore
                newText += chatSettings.signs[sign] ? russianSignName + "\n" : "";
            }
            yield methods.editMessageText(chatId, messageId, "", newText, {
                "reply_markup": { "inline_keyboard": inlineKeyboard }
            });
        });
        this.zodiacCallback = (sign, queryData) => __awaiter(this, void 0, void 0, function* () {
            settings_1.settings.toggleSignValue(queryData.chatId, sign);
            yield this.updateSettingsText(queryData, "signs");
        });
        this.signsCallback = (queryData) => __awaiter(this, void 0, void 0, function* () {
            const { chatId, messageId, methods } = queryData;
            yield methods.editMessageReplyMarkup(chatId, messageId, "", { inline_keyboard: signsInlineKeyboard });
        });
        this.returnCallback = (queryData) => __awaiter(this, void 0, void 0, function* () {
            const { chatId, messageId, methods } = queryData;
            yield methods.editMessageReplyMarkup(chatId, messageId, "", { inline_keyboard: mainInlineKeyboard });
        });
        this.silentCallback = (queryData) => __awaiter(this, void 0, void 0, function* () {
            settings_1.settings.toggleSilentValue(queryData.chatId);
            yield this.updateSettingsText(queryData, "main");
        });
        this.handle = (query, methods) => __awaiter(this, void 0, void 0, function* () {
            if (!query || !query.data || !query.message)
                return;
            const chatId = query.message.chat.id;
            const messageId = query.message.message_id;
            const data = query.data;
            const queryData = { chatId, messageId, methods };
            if (data === "return") {
                yield this.returnCallback(queryData);
            }
            if (data === "signs") {
                yield this.signsCallback(queryData);
            }
            if (data === "silent") {
                yield this.silentCallback(queryData);
            }
            if (zodiac_signs_1.zodiacSigns.hasSign(data)) {
                yield this.zodiacCallback(data, queryData);
            }
        });
    }
}
exports.callbackQueryHandler = new CallbackQueryHandler();
