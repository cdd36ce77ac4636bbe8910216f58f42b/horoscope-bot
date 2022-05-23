import { fileSystem } from "./filesystem"

class Logs {
  private logsDirectoryPath = "data/logs"

  constructor () {
    fileSystem.createPath(this.logsDirectoryPath)
  }

  writeSuccessTestMessage = (className: string, unitName: string): void => {
    this.write("[" + className + "] " + unitName + " is OK!")
  }

  write = (text: any, silent: boolean = false): void => {
    text = String(text)

    const logPath = this.getCurrentLogDirectory()
    const log = this.convertTextToLog(text)

    !silent && console.log(log)
    fileSystem.appendFile(logPath, log + "\n")
  }

  getCurrentLogDirectory = (): string => {
    const currentStringDate = new Date().toLocaleDateString().replace(new RegExp("/", "g"), ".")
    const logPath = this.logsDirectoryPath + "/" + currentStringDate + ".txt"
    return logPath
  }

  private convertTextToLog = (text: string): string => {
    const currentStringTime = new Date().toLocaleTimeString()
    return "[" + currentStringTime + "] " + text
  }
}

export const logs = new Logs()