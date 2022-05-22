import { ChatSettings, JsonChatSettings } from "./interfaces"
import { fileSystem } from "./filesystem"

class Settings {
  settingsDirectoryPath = "data"
  currentSettings: JsonChatSettings = {}
  defaultSettings: ChatSettings = {
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

    if (!fileSystem.isExists(this.getSettingsPath())) {
      fileSystem.writeJsonFile(this.getSettingsPath(), {})
    }

    this.currentSettings = fileSystem.readJsonFile(this.getSettingsPath())
  }

  toggleSilentValue = (chatId: number | string): void => {
    if (this.hasChatSettings(chatId)) {
      const chatSettings = this.getChatSettings(chatId)
      chatSettings.silent = !chatSettings.silent
      this.setChatSettings(chatId, chatSettings)
    }

    this.updateSettings()
  }

  toggleSignValue = (chatId: number | string, sign: string): void => {
    if (this.hasChatSettings(chatId) && sign in this.getChatSettings(chatId).signs) {
      const chatSettings = this.getChatSettings(chatId)
      // @ts-ignore
      chatSettings.signs[sign] = !chatSettings.signs[sign]
      this.setChatSettings(chatId, chatSettings)
    }

    this.updateSettings()
  }

  deleteChatSettings = (chatId: number | string): void => {
    if (this.hasChatSettings(chatId)) {
      delete this.currentSettings[String(chatId)]
      this.updateSettings()
    }
  }

  initializeChatSettings = (chatId: number | string): void => {
    if (this.hasChatSettings(chatId)) return

    try {
      this.setChatSettings(String(chatId), this.defaultSettings)
    } catch {
      throw Error("Failed to initialize chat!")
    }
    
    this.updateSettings()
  }

  setChatSettings = (chatId: number | string, settings: ChatSettings): void => {
    this.currentSettings[String(chatId)] = settings
  }

  getChatSettings = (chatId: number | string): ChatSettings => {
    if (this.hasChatSettings(chatId)) {
      return this.currentSettings[String(chatId)]
    }

    return this.defaultSettings
  }

  hasChatSettings = (chatId: number | string): boolean => {
    return !!this.currentSettings[String(chatId)]
  }

  updateSettings = (): void => {
    try {
      fileSystem.writeJsonFile(this.getSettingsPath(), this.currentSettings)
    } catch {
      throw Error("Failed to update settings!")
    }
  }

  getSettingsPath = (): string => {
    return this.settingsDirectoryPath + "/settings.json"
  }
}

export const settings = new Settings()