"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commands = void 0;
class Commands {
    constructor() {
        this.commands = [
            { command: "start", description: "Starts the bot." },
            { command: "settings", description: "Sends the message with the bot settings." }
        ];
        this.get = () => {
            return this.commands;
        };
        this.has = (command) => {
            command = this.fixCommand(command);
            return !!this.commands.filter(cmd => { return cmd.command === command; })[0];
        };
        this.equal = (command1, command2) => {
            command1 = this.fixCommand(command1), command2 = this.fixCommand(command2);
            return command1 === command2;
        };
        this.fixCommand = (command) => {
            return command.replace("/", "").replace("@some_horoscope_bot", "");
        };
    }
}
exports.commands = new Commands();
