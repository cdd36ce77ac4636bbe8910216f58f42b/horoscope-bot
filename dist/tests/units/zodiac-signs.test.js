"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZodiacSignsTest = void 0;
const zodiac_signs_1 = require("../../code/zodiac-signs");
const assert_1 = __importDefault(require("assert"));
const logs_1 = require("../../code/logs");
class ZodiacSignsTest {
    constructor() {
        this.testGetSign = () => {
            const goodZodiac = "capricorn";
            const badZodiac = "pantera";
            assert_1.default.equal(zodiac_signs_1.zodiacSigns.getSign(goodZodiac).en, "capricorn");
            assert_1.default.equal(zodiac_signs_1.zodiacSigns.getSign(badZodiac).en, "");
        };
        this.testHasSign = () => {
            const goodZodiac = "capricorn";
            const badZodiac = "pantera";
            assert_1.default.equal(zodiac_signs_1.zodiacSigns.hasSign(goodZodiac), true);
            assert_1.default.equal(zodiac_signs_1.zodiacSigns.hasSign(badZodiac), false);
        };
        this.run = () => {
            this.testGetSign();
            logs_1.logs.writeSuccessTestMessage("ZodiacSigns", "getSign");
            this.testHasSign();
            logs_1.logs.writeSuccessTestMessage("ZodiacSigns", "hasSign");
        };
    }
}
exports.ZodiacSignsTest = ZodiacSignsTest;
