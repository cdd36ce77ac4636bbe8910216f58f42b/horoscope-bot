import { Telegraf } from "telegraf"
import assert from "assert"

export class TelegrafTest {
  testConstructor = async (): Promise<void> => {
    const horoscopeBotToken = "5356554804:AAEo-fCHpAYWTN0OI8IMzDWmjK8cLtcr6Sc"

    assert.ok(new Telegraf(horoscopeBotToken))
  }

  run = async (): Promise<void> => {
    await this.testConstructor()
  }
}