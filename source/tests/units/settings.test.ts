import { settings } from "../../code/settings"
import assert from "assert"

import { fileSystem } from "../../code/filesystem"
import { logs } from "../../code/logs"

export class SettingsTest {
  testInitializeChatSettings = (): void => {
    settings.initializeChatSettings("test-chat")

    const fileData = fileSystem.readFileToString(settings.getSettingsPath())

    assert.ok(fileData.includes("test-chat"))
  }

  testDeleteChatSettings = (): void => {
    settings.initializeChatSettings("test-chat")

    assert.equal(settings.hasChatSettings("test-chat"), true)
    settings.deleteChatSettings("test-chat")
    assert.equal(settings.hasChatSettings("test-chat"), false)
  }

  testHasChat = (): void => {
    settings.deleteChatSettings("test-chat")
    settings.initializeChatSettings("test-chat")

    assert.equal(settings.hasChatSettings("test-chat"), true)
    assert.equal(settings.hasChatSettings("non-existing-chat"), false)
  }

  testToggleSilentValue = (): void => {
    settings.deleteChatSettings("test-chat")
    settings.initializeChatSettings("test-chat")

    assert.equal(settings.getChatSettings("test-chat").silent, false)
    settings.toggleSilentValue("test-chat")
    assert.equal(settings.getChatSettings("test-chat").silent, true)
  }

  testToggleSignValue = (): void => {
    settings.deleteChatSettings("test-chat")
    settings.initializeChatSettings("test-chat")

    assert.equal(settings.getChatSettings("test-chat").signs.aquarius, false)
    settings.toggleSignValue("test-chat", "aquarius")
    assert.equal(settings.getChatSettings("test-chat").signs.aquarius, true)
  }

  deleteTestChat = (): void => {
    settings.deleteChatSettings("test-chat")
  }

  run = (): void => {
    this.testInitializeChatSettings()
    logs.writeSuccessTestMessage("Settings", "initializeChatSettings")

    this.testDeleteChatSettings()
    logs.writeSuccessTestMessage("Settings", "deleteChatSettings")

    this.testHasChat()
    logs.writeSuccessTestMessage("Settings", "hasChat")

    this.testToggleSilentValue()
    logs.writeSuccessTestMessage("Settings", "toggleSilentValue")

    this.testToggleSignValue()
    logs.writeSuccessTestMessage("Settings", "toggleSignValue")

    this.deleteTestChat()
  }
}