import { callbackQueryHandler } from "./callback-query-handler"
import { TextMessage } from "./interfaces"
import { Telegram } from "telegraf"
import { commands } from "./commands"
import { settings } from "./settings"

class CommandsHandler {
  constructor () {}

  settingsCommand = async (methods: Telegram, chatId: number): Promise<void> => {
    const message = await methods.sendMessage(chatId, "⚙️")
    const messageId = message.message_id
    callbackQueryHandler.updateSettingsText({ chatId, messageId, methods }, "main")
  }

  startCommand = async (methods: Telegram, chatId: number): Promise<void> => {
    if (settings.hasChatSettings(chatId)) {
      await methods.sendMessage(chatId, "Бот уже запущен!")
      return
    }
    
    settings.initializeChatSettings(chatId)

    await methods.sendMessage(chatId, "Бот отправляющий гороскоп был успешно запущен!")
    await this.settingsCommand(methods, chatId)
  }

  handle = async (message: TextMessage, methods: Telegram): Promise<void> => {
    const command = message.text
    const chatId = message.chat.id
    
    if (!commands.has(command)) return

    if (commands.equal(command, "start")) {
      await this.startCommand(methods, chatId)
    }

    if (commands.equal(command, "settings")) {
      await this.settingsCommand(methods, chatId)
    }
  }
}

export const commandsHandler = new CommandsHandler()