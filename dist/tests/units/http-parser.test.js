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
exports.HttpParserTest = void 0;
const http_parser_1 = require("../../code/http-parser");
const assert_1 = __importDefault(require("assert"));
const logs_1 = require("../../code/logs");
class HttpParserTest {
    constructor() {
        this.testSite = "wikipedia.org";
        this.testClass = "localized-slogan";
        this.testText = "Free";
        this.testGetHtmlString = () => __awaiter(this, void 0, void 0, function* () {
            if (!this.parser)
                this.parser = new http_parser_1.HttpParser(this.testSite);
            const html = yield this.parser.getHtmlString();
            assert_1.default.ok(html.includes(this.testText));
        });
        this.testGetElementsByClassName = () => __awaiter(this, void 0, void 0, function* () {
            if (!this.parser)
                this.parser = new http_parser_1.HttpParser(this.testSite);
            const classes = yield this.parser.getElementsByClassName(this.testClass);
            assert_1.default.ok(classes.html);
            assert_1.default.ok(String(classes.html()).includes(this.testText));
        });
        this.testGetElementsTextByClassName = () => __awaiter(this, void 0, void 0, function* () {
            if (!this.parser)
                this.parser = new http_parser_1.HttpParser(this.testSite);
            const text = yield this.parser.getElementsTextByClassName(this.testClass);
            assert_1.default.ok(text);
            assert_1.default.ok(text.includes(this.testText));
        });
        this.run = () => __awaiter(this, void 0, void 0, function* () {
            yield this.testGetHtmlString();
            logs_1.logs.writeSuccessTestMessage("HttpParser", "getHtmlString");
            yield this.testGetElementsByClassName();
            logs_1.logs.writeSuccessTestMessage("HttpParser", "getElementsByClassName");
            yield this.testGetElementsTextByClassName();
            logs_1.logs.writeSuccessTestMessage("HttpParser", "getElementsTextByClassName");
        });
    }
}
exports.HttpParserTest = HttpParserTest;
