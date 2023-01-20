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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotTest = void 0;
const bot_1 = require("../../code/bot");
const assert_1 = __importDefault(require("assert"));
const logs_1 = require("../../code/logs");
class BotTest {
    constructor() {
        this.testMe = () => {
            const telegram = bot_1.bot.me.telegram;
            assert_1.default.ok(telegram);
            assert_1.default.equal(telegram.token, "1780275092:AAGYPKjbBrgY6uLoE8pMOkJbxu2aREZa1qQ");
        };
        this.testMethods = () => __awaiter(this, void 0, void 0, function* () {
            const meInfo = yield bot_1.bot.methods.getMe();
            assert_1.default.ok(meInfo);
            assert_1.default.equal(meInfo.username, "some_horoscope_bot");
        });
        this.run = () => __awaiter(this, void 0, void 0, function* () {
            this.testMe();
            logs_1.logs.writeSuccessTestMessage("Bot", "me");
            yield this.testMethods();
            logs_1.logs.writeSuccessTestMessage("Bot", "methods");
        });
    }
}
exports.BotTest = BotTest;
