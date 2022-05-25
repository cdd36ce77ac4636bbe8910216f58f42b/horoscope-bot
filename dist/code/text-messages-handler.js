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
exports.textMessagesHandler = void 0;
const commands_handler_1 = require("./commands-handler");
class TextMessagesHandler {
    constructor() {
        this.handle = (message, methods) => __awaiter(this, void 0, void 0, function* () {
            const text = message.text;
            if (this.isTextCommand(text)) {
                yield commands_handler_1.commandsHandler.handle(message, methods);
            }
        });
        this.isTextCommand = (text) => {
            return text[0] === "/" && (!text.includes("@") || text.includes("@some_horoscope_bot"));
        };
    }
}
exports.textMessagesHandler = new TextMessagesHandler();
