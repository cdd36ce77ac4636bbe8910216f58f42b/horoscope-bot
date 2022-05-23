import { Telegram } from "telegraf"

export type InlineKeyboard = Array<Array<{ callback_data: string, text: string }>>
export type QueryData = { chatId: number, messageId: number, methods: Telegram }

export interface ChatSettings {
  silent: boolean,
  signs: {
    [sign: string]: boolean
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