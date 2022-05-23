import { CallbackQuery, QueryData } from "./interfaces"
import { zodiacSigns } from "./zodiac-signs"
import { settings } from "./settings"
import { Telegram } from "telegraf"


class CallbackQueryHandler {

  handle = async (query: CallbackQuery, methods: Telegram): Promise<void> => {
    if (!query || !query.data || !query.message) return

    const chatId = query.message.chat.id
    const messageId = query.message.message_id
    const data = query.data

    const queryData: QueryData = { chatId, messageId, methods }

    

    settings.updateSettingsFile()
  }
}

export const callbackQueryHandler = new CallbackQueryHandler()