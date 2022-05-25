"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextMessagesHandlerTest = void 0;
const text_messages_handler_1 = require("../../code/text-messages-handler");
const assert_1 = __importDefault(require("assert"));
const logs_1 = require("../../code/logs");
class TextMessagesHandlerTest {
    constructor() {
        this.testIsTextCommand = () => {
            const commandWithoutTag = "/help";
            const commandWithTag = "/help@some_horoscope_bot";
            const text = "send";
            const textWithTag = "send@some_horoscope_bot";
            assert_1.default.equal(text_messages_handler_1.textMessagesHandler.isTextCommand(commandWithoutTag), true);
            assert_1.default.equal(text_messages_handler_1.textMessagesHandler.isTextCommand(commandWithTag), true);
            assert_1.default.equal(text_messages_handler_1.textMessagesHandler.isTextCommand(text), false);
            assert_1.default.equal(text_messages_handler_1.textMessagesHandler.isTextCommand(textWithTag), false);
        };
        this.run = () => {
            this.testIsTextCommand();
            logs_1.logs.writeSuccessTestMessage("TextMessagesHandler", "isTextCommand");
        };
    }
}
exports.TextMessagesHandlerTest = TextMessagesHandlerTest;
