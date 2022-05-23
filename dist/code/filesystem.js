"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileSystem = void 0;
const fs_1 = require("fs");
class FileSystem {
    constructor() {
        this.isExists = (path) => {
            return (0, fs_1.existsSync)(path);
        };
        this.appendFile = (path, data) => {
            try {
                (0, fs_1.appendFileSync)(path, data);
            }
            catch (_a) {
                throw Error("[appendFile] Cannot append to file! (" + [path, data].join(" | ") + ")");
            }
        };
        this.writeFile = (path, data) => {
            try {
                (0, fs_1.writeFileSync)(path, data);
            }
            catch (_a) {
                throw Error("[writeFile] Cannot write file! (" + [path, data].join(" | ") + ")");
            }
        };
        this.writeJsonFile = (path, data) => {
            try {
                const stringData = JSON.stringify(data, null, "\t");
                this.writeFile(path, stringData);
            }
            catch (_a) {
                throw Error("[writeJsonFile] Cannot write json file! (" + [path, data].join(" | ") + ")");
            }
        };
        this.readFileToString = (path) => {
            try {
                const fileData = (0, fs_1.readFileSync)(path, { "encoding": "utf-8" }).toString();
                return fileData;
            }
            catch (_a) {
                throw Error("[readFileToString] Cannot read the file! (" + path + ")");
            }
        };
        this.readJsonFile = (path) => {
            try {
                const fileData = this.readFileToString(path);
                const parsedData = JSON.parse(fileData);
                return parsedData;
            }
            catch (_a) {
                throw Error("[readJsonFile] Cannot parse the file! (" + path + ")");
            }
        };
        this.deleteFileOrDirectory = (path) => {
            try {
                if (this.isExists(path)) {
                    const stat = (0, fs_1.statSync)(path);
                    stat.isFile() ? (0, fs_1.unlinkSync)(path) : (0, fs_1.rmdirSync)(path, { "recursive": true });
                }
            }
            catch (_a) {
                throw Error("[deleteFileOrDirectory] Cannot delete the file or dir! (" + path + ")");
            }
        };
        this.createDirectory = (path) => {
            try {
                if (!this.isExists(path))
                    (0, fs_1.mkdirSync)(path);
            }
            catch (_a) {
                throw Error("[createDirectory] Cannot create directory! (" + path + ")");
            }
        };
        this.createPath = (path) => {
            try {
                path.split("/").reduce((path, dir, index) => {
                    const newPath = path + "/" + dir + "/";
                    if (index === 1)
                        this.createDirectory(path);
                    this.createDirectory(newPath);
                    return newPath;
                });
            }
            catch (_a) {
                throw Error("[createPath] Cannot create path! (" + path + ")");
            }
        };
    }
}
exports.fileSystem = new FileSystem();
