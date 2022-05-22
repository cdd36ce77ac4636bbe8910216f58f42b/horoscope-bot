import { TextMessage } from "./interfaces"
import { Telegram } from "telegraf"
import { commandsHandler } from "./commands-handler"

class TextMessagesHandler {
  constructor () {}

  handle = async (message: TextMessage, methods: Telegram): Promise<void> => {
    const text = message.text

    if (this.isTextCommand(text)) {
      await commandsHandler.handle(message, methods)
    }
  }

  isTextCommand = (text: string): boolean => {
    return text[0] === "/" && (!text.includes("@") || text.includes("@some_horoscope_bot"))
  }
}

export const textMessagesHandler = new TextMessagesHandler()