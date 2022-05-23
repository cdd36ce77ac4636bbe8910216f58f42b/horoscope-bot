import { Telegram } from "telegraf"

export type InlineKeyboard = Array<Array<{ callback_data: string, text: string }>>
export type QueryData = { chatId: number, messageId: number, methods: Telegram, data: string }

export interface Predictions {
  [key: string]: string
}

export interface HoroscopeSended {
  [key: string]: { [key: string]: boolean }
}

export interface ChatSettings {
  silent: boolean,
  signs: {
    [sign: string]: boolean
  }
}

export interface CallbackQuery {
  data?: string,
  from: { id: number },
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
  message_id: number,
  chat: { id: number }
  from: { id: number }
}