import { bot } from "../../code/bot"
import assert from "assert"

import { logs } from "../../code/logs"

export class BotTest {
  constructor () {}

  testMe = (): void => {
    const telegram = bot.me.telegram
    
    assert.ok(telegram)
    assert.equal(telegram.token, "5356554804:AAEo-fCHpAYWTN0OI8IMzDWmjK8cLtcr6Sc")
  }

  testMethods = async (): Promise<void> => {
    const meInfo = await bot.methods.getMe()
    
    assert.ok(meInfo)
    assert.equal(meInfo.username, "some_horoscope_bot")
  }

  run = async (): Promise<void> => {
    this.testMe()
    logs.writeSuccessTestMessage("Bot", "me")

    await this.testMethods()
    logs.writeSuccessTestMessage("Bot", "methods")
  } 
}