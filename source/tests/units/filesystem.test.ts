import { fileSystem } from "../../code/filesystem"
import assert from "assert"

export class FileSystemTest {
  constructor () {}

  testIsExists = async (): Promise<void> => {
    const existingFilePath = "tsconfig.json"
    const nonExistingFilePath = String(Math.random() * 0xffffff)

    assert.equal(fileSystem.isExists(existingFilePath), true, ("'Existing' file does not exists!"))
    assert.equal(fileSystem.isExists(nonExistingFilePath), false, ("'Non Existing' file is exists!"))
  }

  testAppendFile = async (): Promise<void> => {
    const testFileName = "append.txt"

    fileSystem.appendFile(testFileName, "append")

    const nonExistingFilePath = String(Math.random() * 0xffffff) + "/file.txt"
    const fileData = fileSystem.readFileToString(testFileName)

    assert.equal(fileData, "append", ("File data not equals!"))
    assert.throws(() => { fileSystem.appendFile(nonExistingFilePath, "append") }, ("Function 'appendFile' does not throw exception!"))
  
  }

  testWriteFile = async (): Promise<void> => {
    const testFileName = "test.txt"

    fileSystem.writeFile(testFileName, "test data")

    const nonExistingFilePath = String(Math.random() * 0xffffff) + "/file.txt"
    const fileData = fileSystem.readFileToString(testFileName)

    assert.equal(fileData, "test data", ("File data not equals!"))
    assert.throws(() => { fileSystem.writeFile(nonExistingFilePath, "test data") }, ("Function 'writeFile' does not throw exception!"))
  }

  testWriteJsonFile = async (): Promise<void> => {
    const testFileName = "test.json"

    fileSystem.writeJsonFile(testFileName, {})

    const nonExistingFilePath = String(Math.random() * 0xffffff) + "/file.json"
    const fileData = fileSystem.readJsonFile(testFileName)
    
    assert.ok(fileData instanceof Object, ("Returned file data type is not Object!"))
    assert.throws(() => { fileSystem.writeJsonFile(nonExistingFilePath, {}) }, ("Function 'writeJsonFile' does not throw exception!"))
  }

  testReadFileToString = async (): Promise<void> => {
    const testFileName = "test.txt"

    fileSystem.writeFile(testFileName, "some test data")

    const nonExistingFilePath = String(Math.random() * 0xffffff)

    assert.equal(fileSystem.readFileToString(testFileName), "some test data", ("Read file data does not equal!"))
    assert.throws(() => { fileSystem.readFileToString(nonExistingFilePath) }, ("Function 'readFileToString' does not throw exception!"))
  }

  testReadJsonFile = async (): Promise<void> => {
    const testFileName = "test.json"

    fileSystem.writeJsonFile(testFileName, {})
    
    const nonExistingJsonFilePath = String(Math.random() * 0xffffff)

    assert.ok(fileSystem.readJsonFile(testFileName), ("Cannot read json file!"))
    assert.ok(fileSystem.readJsonFile(testFileName) instanceof Object, ("Read file data type does not equals to Object!"))
    assert.throws(() => { fileSystem.readJsonFile(nonExistingJsonFilePath) }, ("Function 'readJsonFile' does not throw exception!"))
  }

  testCreateDirectory = async (): Promise<void> => {
    const testDirName = "test-dir"

    fileSystem.createDirectory(testDirName)

    const nonExistingPath = String(Math.random() * 0xffffff) + "/"

    assert.doesNotThrow(() => { fileSystem.writeFile(testDirName + "/test.txt", "test") }, ("Function 'createDirectory' throw exception!"))
    assert.throws(() => { fileSystem.createDirectory(nonExistingPath + testDirName) }, ("Function 'createDirectory' does not throw exception!"))
  }

  testDeleteFileOrDirectory = async (): Promise<void> => {
    const testFileName = "test.txt"
    const testDirName = "test-dir"

    fileSystem.writeFile(testFileName, "some test data")
    fileSystem.createDirectory(testDirName)
    
    assert.doesNotThrow(() => { fileSystem.deleteFileOrDirectory(testFileName) }, ("Function 'deleteFileOrDirectory' throw exception on file deletion!"))
    assert.doesNotThrow(() => { fileSystem.deleteFileOrDirectory(testDirName) }, ("Function 'deleteFileOrDirectory' throw exception on directory deletion!"))
    assert.throws(() => { fileSystem.readFileToString(testFileName) }, ("Function 'readFileToString' can read deleted file!"))
  }

  testCreatePath = async (): Promise<void> => {
    fileSystem.createDirectory("test-dir")
    fileSystem.writeFile("file.txt", "")

    const path = "first-dir/second-dir/third-dir/fourth-dir"
    const pathWithExistingDirectory = "test-dir/next-dir/last-dir"
    const badPath = "file.txt/dir"

    assert.doesNotThrow(() => { fileSystem.createPath(path) }, ("Function 'createPath' throw exception on default path creation!"))
    assert.doesNotThrow(() => { fileSystem.createPath(pathWithExistingDirectory) }, ("Function 'createPath' throw exception on existing path creation!"))
    assert.throws(() => { fileSystem.createPath(badPath) }, ("Function 'createPath' does not throw exception on bad path creation!"))
  }

  deleteTestFiles = async (): Promise<void> => {
    fileSystem.deleteFileOrDirectory("append.txt")
    fileSystem.deleteFileOrDirectory("test.txt")
    fileSystem.deleteFileOrDirectory("test.json")
    fileSystem.deleteFileOrDirectory("file.txt")
    fileSystem.deleteFileOrDirectory("test-dir")
    fileSystem.deleteFileOrDirectory("first-dir")
  }

  run = async (): Promise<void> => {
    await this.testIsExists()
    await this.testAppendFile()
    await this.testWriteFile()
    await this.testWriteJsonFile()
    await this.testReadFileToString()
    await this.testReadJsonFile()
    await this.testCreateDirectory()
    await this.testDeleteFileOrDirectory()
    await this.testCreatePath()

    await this.deleteTestFiles()
  }
}