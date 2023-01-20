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
exports.HttpParser = void 0;
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = __importDefault(require("cheerio"));
const rawCheerIo = cheerio_1.default.load("")("");
class HttpParser {
    constructor(url) {
        this.getElementsTextByClassName = (className) => __awaiter(this, void 0, void 0, function* () {
            const classElements = yield this.getElementsByClassName(className);
            return classElements.text();
        });
        this.getElementsByClassName = (className) => __awaiter(this, void 0, void 0, function* () {
            if (className[0] !== ".")
                className = "." + className;
            const htmlString = yield this.getHtmlString();
            const $ = cheerio_1.default.load(htmlString);
            return $(className);
        });
        this.getHtmlString = () => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.response)
                    this.response = yield (0, axios_1.default)(this.url);
                return this.response.data;
            }
            catch (_a) { }
            return "";
        });
        this.addHttpProtocolToUrl = (url) => {
            if (!["http://", "https://"].includes(url))
                url = "https://" + url;
            return url;
        };
        this.url = this.addHttpProtocolToUrl(url);
    }
}
exports.HttpParser = HttpParser;
