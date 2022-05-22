class Commands {
  commands = [
    { command: "start", description: "Starts the bot." },
    { command: "settings", description: "Sends the message with the bot settings." }
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
    return command.replace("/", "").replace("@some_horoscope_bot", "")
  }
}

export const commands = new Commands()