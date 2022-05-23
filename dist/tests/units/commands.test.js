"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandsTest = void 0;
const commands_1 = require("../../code/commands");
const assert_1 = __importDefault(require("assert"));
const logs_1 = require("../../code/logs");
class CommandsTest {
    constructor() {
        this.testHas = () => {
            const goodCommand = "settings";
            const badCommand = "i dont know who i am";
            assert_1.default.equal(commands_1.commands.has(goodCommand), true);
            assert_1.default.equal(commands_1.commands.has(badCommand), false);
        };
        this.testEqual = () => {
            assert_1.default.equal(commands_1.commands.equal("settings", "settings"), true);
            assert_1.default.equal(commands_1.commands.equal("settings", "command"), false);
        };
        this.run = () => {
            this.testHas();
            logs_1.logs.writeSuccessTestMessage("Commands", "has");
            this.testEqual();
            logs_1.logs.writeSuccessTestMessage("Commands", "equal");
        };
    }
}
exports.CommandsTest = CommandsTest;
