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
exports.commandsHandler = void 0;
const commands_1 = require("./commands");
const settings_1 = require("./settings");
const zodiac_signs_1 = require("./zodiac-signs");
class CommandsHandler {
    constructor() {
        this.sendChatSettingsMessage = (chatId, methods) => __awaiter(this, void 0, void 0, function* () {
            const text = ("⚙️ Выбранные параметры:\n" + settings_1.settings.getChatSettingsMessage(chatId));
            yield methods.sendMessage(chatId, text, {
                reply_markup: { inline_keyboard: zodiac_signs_1.zodiacSigns.getKeyboard() }
            });
        });
        this.handle = (message, methods) => __awaiter(this, void 0, void 0, function* () {
            const command = message.text;
            const chatId = message.chat.id;
            if (!commands_1.commands.has(command))
                return;
            if (!settings_1.settings.isChatExists(chatId))
                settings_1.settings.initializeChatSettings(chatId);
            if (commands_1.commands.equal(command, "settings")) {
                yield this.sendChatSettingsMessage(chatId, methods);
            }
        });
    }
}
exports.commandsHandler = new CommandsHandler();
