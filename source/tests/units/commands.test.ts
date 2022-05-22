import { commands } from "../../code/commands"
import assert from "assert"

import { logs } from "../../code/logs"

export class CommandsTest {
  constructor () {}

  testHas = () => {
    const goodCommand = "start"
    const badCommand = "end"

    assert.equal(commands.has(goodCommand), true)
    assert.equal(commands.has(badCommand), false)
  }

  testEqual = () => {
    assert.equal(commands.equal("start", "start"), true)
    assert.equal(commands.equal("start", "settings"), false)
  }

  run = (): void => {
    this.testHas()
    logs.writeSuccessTestMessage("Commands", "has")

    this.testEqual()
    logs.writeSuccessTestMessage("Commands", "equal")
  }
}