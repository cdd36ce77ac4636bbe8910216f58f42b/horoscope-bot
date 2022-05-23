class Commands {
  commands = [
    { command: "settings", description: "Отправляет сообщение с настройками бота." }
  ]

  get = () => {
    return this.commands
  }

  has = (command: string): boolean => {
    command = this.fixCommand(command)
    return !!this.commands.filter(cmd => { return cmd.command === command })[0]
  }

  equal = (command1: string, command2: string): boolean => {
    command1 = this.fixCommand(command1), command2 = this.fixCommand(command2)
    return command1 === command2    
  }

  private fixCommand = (command: string) => {
    return command.replace("/", "").replace("@some_horoscope_bot", "").replace(" ", "")
  }
}

export const commands = new Commands()