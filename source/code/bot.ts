import { Telegraf, Telegram } from "telegraf"
import { TextMessage, CallbackQuery } from "./interfaces"
import { textMessagesHandler } from "./text-messages-handler"
import { callbackQueryHandler } from "./callback-query-handler"
import { commands } from "./commands"
import { logs } from "./logs"

class Bot {
  me: Telegraf
  methods: Telegram

  constructor (token: string) {
    this.me = new Telegraf(token)
    this.methods = this.me.telegram
  }

  handleTextMessages = () => {
    this.me.on("text", async context => {
      if (!context || !context.message || !context.message.text) return
      const message: TextMessage = context.message
      await textMessagesHandler.handle(message, this.methods)
    })
  }

  handleCallbackQuery = () => {
    this.me.on("callback_query", async context => {
      if (!context || !context.callbackQuery) return
      const query: CallbackQuery = context.callbackQuery
      await callbackQueryHandler.handle(query, this.methods)
    })
  }

  run = (): void => {
    this.methods.setMyCommands(commands.get())

    this.handleTextMessages()
    this.handleCallbackQuery()

    this.me.launch()
      .then(() => logs.write("Horoscope bot launched!"))
      .catch((error) => logs.write("Bot error: " + error))
  }
}

export const bot = new Bot("5356554804:AAEo-fCHpAYWTN0OI8IMzDWmjK8cLtcr6Sc")