import { zodiacSigns } from "./zodiac-signs"
import { HttpParser } from "./http-parser"

export class Horoscope {
  baseUrl = "horo.mail.ru"
  zodiac = ""

  constructor (zodiac: string) {
    if (!zodiacSigns.hasSign(zodiac)) {
      throw Error("Bad zodiac sign!")
    }

    this.zodiac = zodiac
  }

  getPredictionDay = async (): Promise<number> => {
    const fullUrl = this.baseUrl
    const parser = new HttpParser(fullUrl)
    const day = await parser.getElementsTextByClassName("p-prediction__date-day")
    return Number(day)
  }

  getPrediction = async (): Promise<string> => {
    const fullUrl = this.baseUrl + "/prediction/" + this.zodiac + "/today"
    const parser = new HttpParser(fullUrl)
    const prediction = await parser.getElementsTextByClassName("article__item")
    return prediction
  }
}