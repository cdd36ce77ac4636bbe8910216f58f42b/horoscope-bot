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
const callback_query_handler_1 = require("./callback-query-handler");
const commands_1 = require("./commands");
const settings_1 = require("./settings");
class CommandsHandler {
    constructor() {
        this.settingsCommand = (methods, chatId) => __awaiter(this, void 0, void 0, function* () {
            const message = yield methods.sendMessage(chatId, "⚙️");
            const messageId = message.message_id;
            callback_query_handler_1.callbackQueryHandler.updateSettingsText({ chatId, messageId, methods }, "main");
        });
        this.startCommand = (methods, chatId) => __awaiter(this, void 0, void 0, function* () {
            if (settings_1.settings.hasChatSettings(chatId)) {
                yield methods.sendMessage(chatId, "Бот уже запущен!");
                return;
            }
            settings_1.settings.initializeChatSettings(chatId);
            yield methods.sendMessage(chatId, "Бот отправляющий гороскоп был успешно запущен!");
            yield this.settingsCommand(methods, chatId);
        });
        this.handle = (message, methods) => __awaiter(this, void 0, void 0, function* () {
            const command = message.text;
            const chatId = message.chat.id;
            if (!commands_1.commands.has(command))
                return;
            if (commands_1.commands.equal(command, "start")) {
                yield this.startCommand(methods, chatId);
            }
            if (commands_1.commands.equal(command, "settings")) {
                yield this.settingsCommand(methods, chatId);
            }
        });
    }
}
exports.commandsHandler = new CommandsHandler();
