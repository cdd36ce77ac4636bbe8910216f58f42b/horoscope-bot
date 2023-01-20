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
exports.Tests = void 0;
const axios_test_1 = require("./modules/axios.test");
const cheerio_test_1 = require("./modules/cheerio.test");
const telegraf_test_1 = require("./modules/telegraf.test");
const filesystem_test_1 = require("./units/filesystem.test");
const horoscope_test_1 = require("./units/horoscope.test");
const http_parser_test_1 = require("./units/http-parser.test");
const logs_test_1 = require("./units/logs.test");
const zodiac_signs_test_1 = require("./units/zodiac-signs.test");
const bot_test_1 = require("./units/bot.test");
const text_messages_handler_test_1 = require("./units/text-messages-handler.test");
const commands_test_1 = require("./units/commands.test");
const settings_test_1 = require("./units/settings.test");
class Tests {
    constructor() {
        this.runModuleTests = () => __awaiter(this, void 0, void 0, function* () {
            const axiosTest = new axios_test_1.AxiosTest();
            const cheerIoTest = new cheerio_test_1.CheerIoTest();
            const telegrafTest = new telegraf_test_1.TelegrafTest();
            yield axiosTest.run();
            yield cheerIoTest.run();
            yield telegrafTest.run();
        });
        this.runUnitsTests = () => __awaiter(this, void 0, void 0, function* () {
            const fileSystemTest = new filesystem_test_1.FileSystemTest();
            const logsTest = new logs_test_1.LogsTest();
            const httpParserTest = new http_parser_test_1.HttpParserTest();
            const zodiacSignsTest = new zodiac_signs_test_1.ZodiacSignsTest();
            const horoscopeTest = new horoscope_test_1.HoroscopeTest();
            const botTest = new bot_test_1.BotTest();
            const textMessagesHandlerTest = new text_messages_handler_test_1.TextMessagesHandlerTest();
            const commandsTest = new commands_test_1.CommandsTest();
            const settingsTest = new settings_test_1.SettingsTest();
            yield fileSystemTest.run();
            logsTest.run();
            zodiacSignsTest.run();
            yield httpParserTest.run();
            yield horoscopeTest.run();
            // await botTest.run()
            textMessagesHandlerTest.run();
            commandsTest.run();
            settingsTest.run();
        });
    }
}
exports.Tests = Tests;
