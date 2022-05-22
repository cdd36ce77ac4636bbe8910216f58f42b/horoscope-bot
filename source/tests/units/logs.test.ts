import { fileSystem } from "../../code/filesystem"
import { logs } from "../../code/logs"
import assert from "assert"

export class LogsTest {
  constructor () {}

  testWriteLog = () => {
    const randomLog = "logs test " + String(Math.random() * 0xffffff)
    
    logs.write(randomLog, true)

    const logsDirectory = logs.getCurrentLogDirectory()
    const logsStringData = fileSystem.readFileToString(logsDirectory)

    assert.ok(logsStringData.includes(randomLog))
  }

  run = () => {
    this.testWriteLog()
  }
}