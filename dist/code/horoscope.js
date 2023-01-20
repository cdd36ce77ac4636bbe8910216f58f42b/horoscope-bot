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
exports.Horoscope = void 0;
const zodiac_signs_1 = require("./zodiac-signs");
const http_parser_1 = require("./http-parser");
class Horoscope {
    constructor(zodiac) {
        this.baseUrl = "horo.mail.ru";
        this.zodiac = "";
        this.getPredictionDate = () => __awaiter(this, void 0, void 0, function* () {
            const fullUrl = this.baseUrl;
            const parser = new http_parser_1.HttpParser(fullUrl);
            const day = yield parser.getElementsTextByClassName("p-prediction__date-day");
            const month = yield parser.getElementsTextByClassName("p-prediction__date__text__inner");
            return day + " " + month;
        });
        this.getPrediction = () => __awaiter(this, void 0, void 0, function* () {
            const fullUrl = this.baseUrl + "/prediction/" + this.zodiac + "/today";
            const parser = new http_parser_1.HttpParser(fullUrl);
            const prediction = yield parser.getElementsTextByClassName("article__item");
            return prediction;
        });
        if (!zodiac_signs_1.zodiacSigns.hasSign(zodiac)) {
            throw Error("Bad zodiac sign!");
        }
        this.zodiac = zodiac;
    }
}
exports.Horoscope = Horoscope;
