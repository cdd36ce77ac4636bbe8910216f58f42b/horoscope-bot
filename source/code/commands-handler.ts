import { TextMessage } from "./interfaces"
import { Telegram } from "telegraf"
import { commands } from "./commands"
import { settings } from "./settings"
import { zodiacSigns } from "./zodiac-signs"

class CommandsHandler {
  constructor () {}

  sendChatSettingsMessage = async (chatId: number, methods: Telegram): Promise<void> => {
    const text = ("⚙️ Выбранные параметры:\n" + settings.getChatSettingsMessage(chatId))
    await methods.sendMessage(chatId, text, {
      reply_markup: { inline_keyboard: zodiacSigns.getKeyboard() }
    })
  }

  handle = async (message: TextMessage, methods: Telegram): Promise<void> => {
    const command = message.text
    const chatId = message.chat.id
    
    if (!commands.has(command)) return

    if (!settings.isChatExists(chatId)) settings.initializeChatSettings(chatId)

    if (commands.equal(command, "settings")) {
      await this.sendChatSettingsMessage(chatId, methods)
    }
  }
}

export const commandsHandler = new CommandsHandler()