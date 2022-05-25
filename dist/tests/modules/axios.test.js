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
exports.AxiosTest = void 0;
const axios_1 = __importDefault(require("axios"));
const assert_1 = __importDefault(require("assert"));
class AxiosTest {
    constructor() {
        this.testGet = () => __awaiter(this, void 0, void 0, function* () {
            const response = yield (0, axios_1.default)("https://example.com", {
                "method": "get",
                "responseType": "json"
            });
            assert_1.default.equal(response.status, 200);
            assert_1.default.equal(response.config.method, "get");
            assert_1.default.ok(String(response.data).includes("<h1>Example Domain</h1>"));
        });
        this.run = () => __awaiter(this, void 0, void 0, function* () {
            yield this.testGet();
        });
    }
}
exports.AxiosTest = AxiosTest;
