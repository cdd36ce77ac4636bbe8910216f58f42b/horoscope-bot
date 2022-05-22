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
exports.HoroscopeTest = void 0;
const horoscope_1 = require("../../code/horoscope");
const assert_1 = __importDefault(require("assert"));
const logs_1 = require("../../code/logs");
class HoroscopeTest {
    constructor() {
        this.testConstructor = () => {
            assert_1.default.ok(new horoscope_1.Horoscope("capricorn"));
            assert_1.default.throws(() => { new horoscope_1.Horoscope("none"); });
        };
        this.testGetPredictionDay = () => __awaiter(this, void 0, void 0, function* () {
            const horoscope = new horoscope_1.Horoscope("capricorn");
            const predictionDay = yield horoscope.getPredictionDay();
            assert_1.default.ok(typeof predictionDay == "number");
            assert_1.default.ok(predictionDay >= 1 && predictionDay <= 31);
        });
        this.testGetPrediction = () => __awaiter(this, void 0, void 0, function* () {
            const horoscope = new horoscope_1.Horoscope("capricorn");
            const prediction = yield horoscope.getPrediction();
            assert_1.default.ok(typeof prediction == "string");
            assert_1.default.ok(prediction.length > 0);
        });
        this.run = () => __awaiter(this, void 0, void 0, function* () {
            this.testConstructor();
            logs_1.logs.writeSuccessTestMessage("Horoscope", "constructor");
            yield this.testGetPredictionDay();
            logs_1.logs.writeSuccessTestMessage("Horoscope", "getPredictionDay");
            yield this.testGetPrediction();
            logs_1.logs.writeSuccessTestMessage("Horoscope", "getPrediction");
        });
    }
}
exports.HoroscopeTest = HoroscopeTest;
