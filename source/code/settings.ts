import { ChatSettings, JsonChatSettings } from "./interfaces"
import { zodiacSigns } from "./zodiac-signs"
import { fileSystem } from "./filesystem"

class Settings {
  settingsDirectoryPath = "data"
  currentSettings: JsonChatSettings

  readonly defaultChatSettings: ChatSettings = {
    silent: false,
    signs: {
      aries: false,
      taurus: false,
      gemini: false,
      cancer: false,
      leo: false,
      virgo: false,
      libra: false,
      scorpio: false,
      sagittarius: false,
      capricorn: false,
      aquarius: false,
      pisces: false
    }
  }

  constructor () {
    fileSystem.createPath(this.settingsDirectoryPath)

    if (fileSystem.isExists(this.getSettingsPath())) {
      this.currentSettings = fileSystem.readJsonFile(this.getSettingsPath())
    } else {
      this.currentSettings = {}
    } 
  }

  getChatSettingsMessage = (chatId: number): string => {
    let text = ""

    if (!this.isChatExists(chatId)) return text

    const chatSettings = this.currentSettings[chatId]
    const signs = Object.keys(chatSettings.signs)

    if (chatSettings.silent) {
      text += "🪶 Бесшумный режим\n"
    }

    signs.forEach(sign => {
      text += this.getChatSetting(chatId, sign) ? zodiacSigns.getSign(sign).ru + "\n" : ""
    })

    return text
  }

  getChatSetting = (chatId: number, settingName: string): boolean => {
    let result = false

    if (this.isChatExists(chatId)) {
      const chatSettings = this.getChatSettings(chatId)

      if (settingName === "silent") {
        result = chatSettings.silent
      }

      const signs = Object.keys(this.defaultChatSettings.signs)

      signs.forEach(sign => {
        if (sign === settingName) result = chatSettings.signs[sign]
      })
    }

    return result
  }

  toggleChatSetting = (chatId: number, settingName: string): void => {
    if (!this.isChatExists(chatId)) return

    const chatSettings = this.getChatSettings(chatId)
    const settingValue = this.getChatSetting(chatId, settingName)
    const signs = Object.keys(this.defaultChatSettings.signs)

    if (settingName === "silent") {
      chatSettings.silent = !settingValue
    }

    signs.forEach(sign => {
      sign === settingName && (chatSettings.signs[sign] = !settingValue)
    })

    this.setChatSettings(chatId, chatSettings)
  }

  initializeChatSettings = (chatId: number): void => {
    this.setChatSettings(chatId, this.defaultChatSettings)
  }

  getChatSettings = (chatId: number): ChatSettings => {
    return this.currentSettings[chatId]
  }

  setChatSettings = (chatId: number, chatSettings: ChatSettings): void => {
    this.currentSettings[chatId] = JSON.parse(JSON.stringify(chatSettings))
  }

  isChatExists = (chatId: number): boolean => {
    return !!this.currentSettings[chatId]
  }

  getSettingsPath = (): string => {
    return this.settingsDirectoryPath + "/settings.json"
  }

  updateSettingsFile = (): void => {
    fileSystem.writeJsonFile(this.getSettingsPath(), this.currentSettings)
  }
}

export const settings = new Settings()