import {
  existsSync,
  readFileSync,
  writeFileSync,
  appendFileSync,
  unlinkSync,
  rmdirSync,
  mkdirSync,
  statSync
} from "fs"

interface Json {
  [key: string]: any
}

class FileSystem {
  constructor () {}

  isExists = (path: string): boolean => {
    return existsSync(path)
  }

  appendFile = (path: string, data: string): void => {
    try {
      appendFileSync(path, data)
    } catch {
      throw Error("[appendFile] Cannot append to file! (" + [path, data].join(" | ") + ")")
    }
  }

  writeFile = (path: string, data: string): void => {
    try {
      writeFileSync(path, data)
    } catch {
      throw Error("[writeFile] Cannot write file! (" + [path, data].join(" | ") + ")")
    }
  }

  writeJsonFile = (path: string, data: Object): void => {
    try {
      const stringData = JSON.stringify(data, null, "\t")
      this.writeFile(path, stringData)
    } catch {
      throw Error("[writeJsonFile] Cannot write json file! (" + [path, data].join(" | ") + ")")
    }
  }

  readFileToString = (path: string): string => {
    try {
      const fileData = readFileSync(path, { "encoding": "utf-8" }).toString()
      return fileData
    } catch {
      throw Error("[readFileToString] Cannot read the file! (" + path + ")")
    }
  }

  readJsonFile = (path: string): Json  => {
    try {
      const fileData = this.readFileToString(path)
      const parsedData: Json = JSON.parse(fileData)
      return parsedData
    } catch {
      throw Error("[readJsonFile] Cannot parse the file! (" + path + ")")
    }
  }

  deleteFileOrDirectory = (path: string): void => {
    try {
      if (this.isExists(path)) {
        const stat = statSync(path)
        stat.isFile() ? unlinkSync(path) : rmdirSync(path, { "recursive": true })
      }
    } catch {
      throw Error("[deleteFileOrDirectory] Cannot delete the file or dir! (" + path + ")")
    }
  }

  createDirectory = (path: string): void => {
    try {
      if (!this.isExists(path)) mkdirSync(path)
    } catch {
      throw Error("[createDirectory] Cannot create directory! (" + path + ")")
    }
  }

  createPath = (path: string): void => {
    try {
      path.split("/").reduce((path, dir, index) => {
        const newPath = path + "/" + dir + "/"
  
        if (index === 1) this.createDirectory(path)
        this.createDirectory(newPath)
  
        return newPath
      })
    } catch {
      throw Error("[createPath] Cannot create path! (" + path + ")")
    }
  }
}

export const fileSystem = new FileSystem()