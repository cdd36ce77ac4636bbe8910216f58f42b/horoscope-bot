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
exports.horoscopeSender = void 0;
const horoscope_1 = require("./horoscope");
const settings_1 = require("./settings");
const zodiac_signs_1 = require("./zodiac-signs");
const logs_1 = require("./logs");
class HoroscopeSender {
    constructor() {
        this.predictionDate = "";
        this.predictions = {};
        this.sended = {};
        this.updatePredictions = () => __awaiter(this, void 0, void 0, function* () {
            const signs = zodiac_signs_1.zodiacSigns.getListOfSigns();
            for (let i = 0; i < signs.length; i++) {
                const sign = signs[i];
                const horoscope = new horoscope_1.Horoscope(sign);
                logs_1.logs.write(sign + " prediction updating...");
                this.predictions[sign] = yield horoscope.getPrediction();
            }
        });
        this.checkPredictionsUpdate = () => __awaiter(this, void 0, void 0, function* () {
            const horoscope = new horoscope_1.Horoscope("aries");
            const predictionDate = yield horoscope.getPredictionDate();
            if (predictionDate.match(/\d/) && predictionDate !== this.predictionDate) {
                logs_1.logs.write("New prediction! (" + predictionDate + ")");
                yield this.updatePredictions();
                this.sended = {};
                this.predictionDate = predictionDate;
            }
            setTimeout(() => __awaiter(this, void 0, void 0, function* () { return yield this.checkPredictionsUpdate(); }), !this.predictionDate ? 1000 : 90000);
        });
        this.chatsCallback = (callback) => {
            const chats = Object.keys(settings_1.settings.currentSettings);
            for (let i = 0; i < chats.length; i++) {
                const chatId = Number(chats[i]);
                callback(chatId);
            }
        };
        this.signsCallback = (chatSettings, callback) => {
            const signs = Object.keys(chatSettings.signs);
            for (let j = 0; j < signs.length; j++) {
                const sign = signs[j];
                callback(sign);
            }
        };
        this.sendHoroscopeIfUpdated = (methods) => __awaiter(this, void 0, void 0, function* () {
            this.chatsCallback((chatId) => {
                const chatSettings = settings_1.settings.getChatSettings(chatId);
                this.signsCallback(chatSettings, (sign) => __awaiter(this, void 0, void 0, function* () {
                    const signValue = chatSettings.signs[sign];
                    const russianSignName = zodiac_signs_1.zodiacSigns.getSign(sign).ru;
                    if (!this.sended[chatId])
                        this.sended[chatId] = {};
                    if (signValue === true && this.predictions[sign] && !this.sended[chatId][sign]) {
                        try {
                            yield methods.sendMessage(chatId, russianSignName + " | " + this.predictionDate + "\n" + this.predictions[sign], { disable_notification: chatSettings.silent });
                            logs_1.logs.write("Sending " + sign + " horoscope to " + chatId + " chat...");
                            this.sended[chatId][sign] = true;
                        }
                        catch (e) { }
                    }
                }));
            });
            setTimeout(() => __awaiter(this, void 0, void 0, function* () { return yield this.sendHoroscopeIfUpdated(methods); }), 1500);
        });
        this.run = (methods) => {
            this.sendHoroscopeIfUpdated(methods);
            this.checkPredictionsUpdate();
        };
    }
}
exports.horoscopeSender = new HoroscopeSender();
