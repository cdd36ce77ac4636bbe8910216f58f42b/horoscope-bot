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
exports.bot = void 0;
const telegraf_1 = require("telegraf");
const text_messages_handler_1 = require("./text-messages-handler");
const callback_query_handler_1 = require("./callback-query-handler");
const horoscope_sender_1 = require("./horoscope-sender");
const commands_1 = require("./commands");
const logs_1 = require("./logs");
class Bot {
    constructor(token) {
        this.handleTextMessages = () => {
            this.me.on("text", (context) => __awaiter(this, void 0, void 0, function* () {
                if (!context || !context.message || !context.message.text)
                    return;
                const message = context.message;
                yield text_messages_handler_1.textMessagesHandler.handle(message, this.methods);
            }));
        };
        this.handleCallbackQuery = () => {
            this.me.on("callback_query", (context) => __awaiter(this, void 0, void 0, function* () {
                if (!context || !context.callbackQuery)
                    return;
                const query = context.callbackQuery;
                yield callback_query_handler_1.callbackQueryHandler.handle(query, this.methods);
                yield context.answerCbQuery();
            }));
        };
        this.run = () => {
            this.methods.setMyCommands(commands_1.commands.get());
            this.handleTextMessages();
            this.handleCallbackQuery();
            horoscope_sender_1.horoscopeSender.run(this.methods);
            this.me.launch()
                .then(() => logs_1.logs.write("Horoscope bot launched!"))
                .catch((error) => logs_1.logs.write("Bot error: " + error));
        };
        this.me = new telegraf_1.Telegraf(token);
        this.methods = this.me.telegram;
    }
}
exports.bot = new Bot("5356554804:AAEo-fCHpAYWTN0OI8IMzDWmjK8cLtcr6Sc");
