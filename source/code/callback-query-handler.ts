import { CallbackQuery, QueryData } from "./interfaces"
import { zodiacSigns } from "./zodiac-signs"
import { settings } from "./settings"
import { Telegram } from "telegraf"

class CallbackQueryHandler {
  editKeyboardToSigns = async (queryData: QueryData): Promise<void> => {
    await queryData.methods.editMessageReplyMarkup(queryData.chatId, queryData.messageId, "", {
      inline_keyboard: zodiacSigns.getKeyboard()
    })
  }

  editKeyboardToMain = async (queryData: QueryData): Promise<void> => {
    await queryData.methods.editMessageReplyMarkup(
      queryData.chatId, queryData.messageId, "",
      { inline_keyboard: settings.getKeyboard() }
    )
  }

  setSettingsText = async (queryData: QueryData): Promise<void> => {
    settings.toggleChatSetting(queryData.chatId, queryData.data)
    settings.updateSettingsFile()

    await queryData.methods.editMessageText(
      queryData.chatId, queryData.messageId, "",
      settings.getChatSettingsMessage(queryData.chatId)
    )
  }

  handle = async (query: CallbackQuery, methods: Telegram): Promise<void> => {
    if (!query || !query.data || !query.message) return

    const chatId = query.message.chat.id
    const messageId = query.message.message_id
    const data = query.data

    const queryData: QueryData = { chatId, messageId, methods, data }

    if (data === "return") {
      await this.editKeyboardToMain(queryData)
    }

    if (data === "signs") {
      await this.editKeyboardToSigns(queryData)
    }
    
    if (data === "silent") {
      await this.setSettingsText(queryData)
      await this.editKeyboardToMain(queryData)
    }

    if (zodiacSigns.hasSign(data)) {
      await this.setSettingsText(queryData)
      await this.editKeyboardToSigns(queryData)
    }
  }
}

export const callbackQueryHandler = new CallbackQueryHandler()