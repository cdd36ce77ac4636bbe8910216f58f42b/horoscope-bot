"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileSystemTest = void 0;
const filesystem_1 = require("../../code/filesystem");
const assert_1 = __importDefault(require("assert"));
class FileSystemTest {
    constructor() {
        this.testIsExists = () => __awaiter(this, void 0, void 0, function* () {
            const existingFilePath = "tsconfig.json";
            const nonExistingFilePath = String(Math.random() * 0xffffff);
            assert_1.default.equal(filesystem_1.fileSystem.isExists(existingFilePath), true, ("'Existing' file does not exists!"));
            assert_1.default.equal(filesystem_1.fileSystem.isExists(nonExistingFilePath), false, ("'Non Existing' file is exists!"));
        });
        this.testAppendFile = () => __awaiter(this, void 0, void 0, function* () {
            const testFileName = "append.txt";
            filesystem_1.fileSystem.appendFile(testFileName, "append");
            const nonExistingFilePath = String(Math.random() * 0xffffff) + "/file.txt";
            const fileData = filesystem_1.fileSystem.readFileToString(testFileName);
            assert_1.default.equal(fileData, "append", ("File data not equals!"));
            assert_1.default.throws(() => { filesystem_1.fileSystem.appendFile(nonExistingFilePath, "append"); }, ("Function 'appendFile' does not throw exception!"));
        });
        this.testWriteFile = () => __awaiter(this, void 0, void 0, function* () {
            const testFileName = "test.txt";
            filesystem_1.fileSystem.writeFile(testFileName, "test data");
            const nonExistingFilePath = String(Math.random() * 0xffffff) + "/file.txt";
            const fileData = filesystem_1.fileSystem.readFileToString(testFileName);
            assert_1.default.equal(fileData, "test data", ("File data not equals!"));
            assert_1.default.throws(() => { filesystem_1.fileSystem.writeFile(nonExistingFilePath, "test data"); }, ("Function 'writeFile' does not throw exception!"));
        });
        this.testWriteJsonFile = () => __awaiter(this, void 0, void 0, function* () {
            const testFileName = "test.json";
            filesystem_1.fileSystem.writeJsonFile(testFileName, {});
            const nonExistingFilePath = String(Math.random() * 0xffffff) + "/file.json";
            const fileData = filesystem_1.fileSystem.readJsonFile(testFileName);
            assert_1.default.ok(fileData instanceof Object, ("Returned file data type is not Object!"));
            assert_1.default.throws(() => { filesystem_1.fileSystem.writeJsonFile(nonExistingFilePath, {}); }, ("Function 'writeJsonFile' does not throw exception!"));
        });
        this.testReadFileToString = () => __awaiter(this, void 0, void 0, function* () {
            const testFileName = "test.txt";
            filesystem_1.fileSystem.writeFile(testFileName, "some test data");
            const nonExistingFilePath = String(Math.random() * 0xffffff);
            assert_1.default.equal(filesystem_1.fileSystem.readFileToString(testFileName), "some test data", ("Read file data does not equal!"));
            assert_1.default.throws(() => { filesystem_1.fileSystem.readFileToString(nonExistingFilePath); }, ("Function 'readFileToString' does not throw exception!"));
        });
        this.testReadJsonFile = () => __awaiter(this, void 0, void 0, function* () {
            const testFileName = "test.json";
            filesystem_1.fileSystem.writeJsonFile(testFileName, {});
            const nonExistingJsonFilePath = String(Math.random() * 0xffffff);
            assert_1.default.ok(filesystem_1.fileSystem.readJsonFile(testFileName), ("Cannot read json file!"));
            assert_1.default.ok(filesystem_1.fileSystem.readJsonFile(testFileName) instanceof Object, ("Read file data type does not equals to Object!"));
            assert_1.default.throws(() => { filesystem_1.fileSystem.readJsonFile(nonExistingJsonFilePath); }, ("Function 'readJsonFile' does not throw exception!"));
        });
        this.testCreateDirectory = () => __awaiter(this, void 0, void 0, function* () {
            const testDirName = "test-dir";
            filesystem_1.fileSystem.createDirectory(testDirName);
            const nonExistingPath = String(Math.random() * 0xffffff) + "/";
            assert_1.default.doesNotThrow(() => { filesystem_1.fileSystem.writeFile(testDirName + "/test.txt", "test"); }, ("Function 'createDirectory' throw exception!"));
            assert_1.default.throws(() => { filesystem_1.fileSystem.createDirectory(nonExistingPath + testDirName); }, ("Function 'createDirectory' does not throw exception!"));
        });
        this.testDeleteFileOrDirectory = () => __awaiter(this, void 0, void 0, function* () {
            const testFileName = "test.txt";
            const testDirName = "test-dir";
            filesystem_1.fileSystem.writeFile(testFileName, "some test data");
            filesystem_1.fileSystem.createDirectory(testDirName);
            assert_1.default.doesNotThrow(() => { filesystem_1.fileSystem.deleteFileOrDirectory(testFileName); }, ("Function 'deleteFileOrDirectory' throw exception on file deletion!"));
            assert_1.default.doesNotThrow(() => { filesystem_1.fileSystem.deleteFileOrDirectory(testDirName); }, ("Function 'deleteFileOrDirectory' throw exception on directory deletion!"));
            assert_1.default.throws(() => { filesystem_1.fileSystem.readFileToString(testFileName); }, ("Function 'readFileToString' can read deleted file!"));
        });
        this.testCreatePath = () => __awaiter(this, void 0, void 0, function* () {
            filesystem_1.fileSystem.createDirectory("test-dir");
            filesystem_1.fileSystem.writeFile("file.txt", "");
            const path = "first-dir/second-dir/third-dir/fourth-dir";
            const pathWithExistingDirectory = "test-dir/next-dir/last-dir";
            const badPath = "file.txt/dir";
            assert_1.default.doesNotThrow(() => { filesystem_1.fileSystem.createPath(path); }, ("Function 'createPath' throw exception on default path creation!"));
            assert_1.default.doesNotThrow(() => { filesystem_1.fileSystem.createPath(pathWithExistingDirectory); }, ("Function 'createPath' throw exception on existing path creation!"));
            assert_1.default.throws(() => { filesystem_1.fileSystem.createPath(badPath); }, ("Function 'createPath' does not throw exception on bad path creation!"));
        });
        this.deleteTestFiles = () => __awaiter(this, void 0, void 0, function* () {
            filesystem_1.fileSystem.deleteFileOrDirectory("append.txt");
            filesystem_1.fileSystem.deleteFileOrDirectory("test.txt");
            filesystem_1.fileSystem.deleteFileOrDirectory("test.json");
            filesystem_1.fileSystem.deleteFileOrDirectory("file.txt");
            filesystem_1.fileSystem.deleteFileOrDirectory("test-dir");
            filesystem_1.fileSystem.deleteFileOrDirectory("first-dir");
        });
        this.run = () => __awaiter(this, void 0, void 0, function* () {
            yield this.testIsExists();
            yield this.testAppendFile();
            yield this.testWriteFile();
            yield this.testWriteJsonFile();
            yield this.testReadFileToString();
            yield this.testReadJsonFile();
            yield this.testCreateDirectory();
            yield this.testDeleteFileOrDirectory();
            yield this.testCreatePath();
            yield this.deleteTestFiles();
        });
    }
}
exports.FileSystemTest = FileSystemTest;
