import axios, { AxiosResponse } from "axios"
import cheerio from "cheerio"

const rawCheerIo = cheerio.load("")("")
type CheerIo = typeof rawCheerIo

export class HttpParser {
  url: string
  response: AxiosResponse<any, any> | undefined

  constructor (url: string) {
    this.url = this.addHttpProtocolToUrl(url)
  }

  getElementsTextByClassName = async (className: string): Promise<string> => {
    const classElements = await this.getElementsByClassName(className)
    return classElements.text()
  }

  getElementsByClassName = async (className: string): Promise<CheerIo> => {
    if (className[0] !== ".") className = "." + className
    
    const htmlString = await this.getHtmlString()
    const $ = cheerio.load(htmlString)
    
    return $(className)
  }

  getHtmlString = async (): Promise<string> => {
    try {
      if (!this.response) this.response = await axios(this.url)
      return this.response.data
    } catch {}
    return ""
  }

  private addHttpProtocolToUrl = (url: string): string => {
    if (!["http://", "https://"].includes(url)) url = "https://" + url
    return url
  }
}