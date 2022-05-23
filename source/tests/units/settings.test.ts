import { settings } from "../../code/settings"
import assert from "assert"

import { logs } from "../../code/logs"

export class SettingsTest {
  constructor () {}

  testGetChatSetting = (): void => {
    settings.initializeChatSettings(-1)

    assert.equal(settings.getChatSetting(-1, "silent"), false)
  }

  testToggleChatSetting = (): void => {
    settings.initializeChatSettings(-1)

    assert.equal(settings.getChatSetting(-1, "capricorn"), false)
    settings.toggleChatSetting(-1, "capricorn")
    assert.equal(settings.getChatSetting(-1, "capricorn"), true)
  }

  clearTestChats = (): void => {
    delete settings.currentSettings[-1]
  }

  run = (): void => {
    this.testGetChatSetting()
    logs.writeSuccessTestMessage("Settings", "getChatSetting")

    this.testToggleChatSetting()
    logs.writeSuccessTestMessage("Settings", "toggleChatSetting")

    this.clearTestChats()
  }
}