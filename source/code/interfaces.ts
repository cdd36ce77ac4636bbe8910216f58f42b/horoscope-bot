import { Telegram } from "telegraf"

export type InlineKeyboard = Array<Array<{ callback_data: string, text: string }>>
export type QueryData = { chatId: number, messageId: number, methods: Telegram }

export interface ChatSettings {
  silent: boolean,
  signs: {
    aries: boolean,
    taurus: boolean,
    gemini: boolean,
    cancer: boolean,
    leo: boolean,
    virgo: boolean,
    libra: boolean,
    scorpio: boolean,
    sagittarius: boolean,
    capricorn: boolean,
    aquarius: boolean,
    pisces: boolean
  }
}

export interface CallbackQuery {
  data?: string,
  message?: {
    chat: { id: number },
    message_id: number
  }
}

export interface JsonChatSettings {
  [key: string]: ChatSettings
}

export interface TextMessage {
  text: string,
  chat: { id: number }
}