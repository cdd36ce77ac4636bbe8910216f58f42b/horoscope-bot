import { inlineKeyboardGetter } from "./inline-keyboard-getter"
import { CallbackQuery, QueryData } from "./interfaces"
import { zodiacSigns } from "./zodiac-signs"
import { settings } from "./settings"
import { Telegram } from "telegraf"

const mainInlineKeyboard = inlineKeyboardGetter.getMainInlineKeyboard()
const signsInlineKeyboard = inlineKeyboardGetter.getSignsInlineKeyboard()

class CallbackQueryHandler {
  updateSettingsText = async (queryData: QueryData, inlineKeyboardType: string): Promise<void> => {
    const { chatId, messageId, methods } = queryData

    const inlineKeyboard = inlineKeyboardType === "main" ? mainInlineKeyboard : signsInlineKeyboard
    const chatSettings = settings.getChatSettings(chatId)
    let newText = "⚙️ Выбранные настройки:\n"
    newText += chatSettings.silent ? "Бесшумный режим\n" : ""

    const signs = Object.keys(chatSettings.signs)
    for (let i = 0; i < signs.length; i++) {
      const sign = signs[i]
      const russianSignName = zodiacSigns.getSign(sign).ru

      // @ts-ignore
      newText += chatSettings.signs[sign] ? russianSignName + "\n" : ""
    }

    await methods.editMessageText(chatId, messageId, "", newText, {
      "reply_markup": { "inline_keyboard": inlineKeyboard }
    })
  }

  zodiacCallback = async (sign: string, queryData: QueryData): Promise<void> => {
    settings.toggleSignValue(queryData.chatId, sign)
    await this.updateSettingsText(queryData, "signs")
  }

  signsCallback = async (queryData: QueryData): Promise<void> => {
    const { chatId, messageId, methods } = queryData
    await methods.editMessageReplyMarkup(chatId, messageId, "", {inline_keyboard: signsInlineKeyboard})
  }

  returnCallback = async (queryData: QueryData): Promise<void> => {
    const { chatId, messageId, methods } = queryData
    await methods.editMessageReplyMarkup(chatId, messageId, "", {inline_keyboard: mainInlineKeyboard})
  }

  silentCallback = async (queryData: QueryData): Promise<void> => {
    settings.toggleSilentValue(queryData.chatId)
    await this.updateSettingsText(queryData, "main")
  }

  handle = async (query: CallbackQuery, methods: Telegram): Promise<void> => {
    if (!query || !query.data || !query.message) return

    const chatId = query.message.chat.id
    const messageId = query.message.message_id
    const data = query.data

    const queryData = { chatId, messageId, methods }

    if (data === "return") {
      await this.returnCallback(queryData)
    }

    if (data === "signs") {
      await this.signsCallback(queryData)
    }

    if (data === "silent") {
      await this.silentCallback(queryData)
    }

    if (zodiacSigns.hasSign(data)) {
      await this.zodiacCallback(data, queryData)
    }
  }
}

export const callbackQueryHandler = new CallbackQueryHandler()