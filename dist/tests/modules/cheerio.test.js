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
exports.CheerIoTest = void 0;
const cheerio_1 = __importDefault(require("cheerio"));
const assert_1 = __importDefault(require("assert"));
class CheerIoTest {
    constructor() {
        this.testLoad = () => __awaiter(this, void 0, void 0, function* () {
            const testHTML = "<html><p>test</p></html>";
            const $ = cheerio_1.default.load(testHTML);
            const paragraphText = $("p").text();
            assert_1.default.ok($);
            assert_1.default.equal(paragraphText, "test");
        });
        this.run = () => __awaiter(this, void 0, void 0, function* () {
            yield this.testLoad();
        });
    }
}
exports.CheerIoTest = CheerIoTest;
