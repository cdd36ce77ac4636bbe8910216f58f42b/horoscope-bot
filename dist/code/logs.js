"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logs = void 0;
const filesystem_1 = require("./filesystem");
class Logs {
    constructor() {
        this.logsDirectoryPath = "data/logs";
        this.writeSuccessTestMessage = (className, unitName) => {
            this.write("[" + className + "] " + unitName + " is OK!");
        };
        this.write = (text, silent = false) => {
            text = String(text);
            const logPath = this.getCurrentLogDirectory();
            const log = this.convertTextToLog(text);
            !silent && console.log(log);
            filesystem_1.fileSystem.appendFile(logPath, log + "\n");
        };
        this.getCurrentLogDirectory = () => {
            const currentStringDate = new Date().toLocaleDateString();
            const logPath = this.logsDirectoryPath + "/" + currentStringDate + ".txt";
            return logPath;
        };
        this.convertTextToLog = (text) => {
            const currentStringTime = new Date().toLocaleTimeString();
            return "[" + currentStringTime + "] " + text;
        };
        filesystem_1.fileSystem.createPath(this.logsDirectoryPath);
    }
}
exports.logs = new Logs();
