"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogsTest = void 0;
const filesystem_1 = require("../../code/filesystem");
const logs_1 = require("../../code/logs");
const assert_1 = __importDefault(require("assert"));
class LogsTest {
    constructor() {
        this.testWriteLog = () => {
            const randomLog = "logs test " + String(Math.random() * 0xffffff);
            logs_1.logs.write(randomLog, true);
            const logsDirectory = logs_1.logs.getCurrentLogDirectory();
            const logsStringData = filesystem_1.fileSystem.readFileToString(logsDirectory);
            assert_1.default.ok(logsStringData.includes(randomLog));
        };
        this.run = () => {
            this.testWriteLog();
        };
    }
}
exports.LogsTest = LogsTest;
