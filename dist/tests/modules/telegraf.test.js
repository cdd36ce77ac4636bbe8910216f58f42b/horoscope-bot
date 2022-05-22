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
exports.TelegrafTest = void 0;
const telegraf_1 = require("telegraf");
const assert_1 = __importDefault(require("assert"));
class TelegrafTest {
    constructor() {
        this.testConstructor = () => __awaiter(this, void 0, void 0, function* () {
            const horoscopeBotToken = "5356554804:AAEo-fCHpAYWTN0OI8IMzDWmjK8cLtcr6Sc";
            assert_1.default.ok(new telegraf_1.Telegraf(horoscopeBotToken));
        });
        this.run = () => __awaiter(this, void 0, void 0, function* () {
            yield this.testConstructor();
        });
    }
}
exports.TelegrafTest = TelegrafTest;
