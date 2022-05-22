import { AxiosTest } from "./modules/axios.test"
import { CheerIoTest } from "./modules/cheerio.test"
import { TelegrafTest } from "./modules/telegraf.test"

import { FileSystemTest } from "./units/filesystem.test"
import { HoroscopeTest } from "./units/horoscope.test"
import { HttpParserTest } from "./units/http-parser.test"
import { LogsTest } from "./units/logs.test"
import { ZodiacSignsTest } from "./units/zodiac-signs.test"
import { BotTest } from "./units/bot.test"
import { TextMessagesHandlerTest } from "./units/text-messages-handler.test"
import { CommandsTest } from "./units/commands.test"
import { SettingsTest } from "./units/settings.test"

export class Tests {
  constructor () {}

  runModuleTests = async (): Promise<void> => {
    const axiosTest = new AxiosTest()
    const cheerIoTest = new CheerIoTest()
    const telegrafTest = new TelegrafTest()

    await axiosTest.run()
    await cheerIoTest.run()
    await telegrafTest.run()
  }

  runUnitsTests = async (): Promise<void> => {
    const fileSystemTest = new FileSystemTest()
    const logsTest = new LogsTest()
    const httpParserTest = new HttpParserTest()
    const zodiacSignsTest = new ZodiacSignsTest()
    const horoscopeTest = new HoroscopeTest()
    const botTest = new BotTest()
    const textMessagesHandlerTest = new TextMessagesHandlerTest()
    const commandsTest = new CommandsTest()
    const settingsTest = new SettingsTest()

    await fileSystemTest.run()
    logsTest.run()
    zodiacSignsTest.run()
    await httpParserTest.run()
    await horoscopeTest.run()
    await botTest.run()
    textMessagesHandlerTest.run()
    commandsTest.run()
    settingsTest.run()
  }
}