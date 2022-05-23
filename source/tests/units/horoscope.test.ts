import { Horoscope } from "../../code/horoscope"
import assert from "assert"

import { logs } from "../../code/logs"

export class HoroscopeTest {
  constructor () {}

  testConstructor = (): void => {
    assert.ok(new Horoscope("capricorn"))
    assert.throws(() => { new Horoscope("none") })
  }

  testGetPredictionDate = async (): Promise<void> => {
    const horoscope = new Horoscope("capricorn")
    const predictionDate = await horoscope.getPredictionDate()

    assert.ok(typeof predictionDate == "string")
    assert.ok(predictionDate.length > 0)
  }

  testGetPrediction = async (): Promise<void> => {
    const horoscope = new Horoscope("capricorn")
    const prediction = await horoscope.getPrediction()

    assert.ok(typeof prediction == "string")
    assert.ok(prediction.length > 0)
  }

  run = async (): Promise<void> => {
    this.testConstructor()
    logs.writeSuccessTestMessage("Horoscope", "constructor")

    await this.testGetPredictionDate()
    logs.writeSuccessTestMessage("Horoscope", "getPredictionDate")

    await this.testGetPrediction()
    logs.writeSuccessTestMessage("Horoscope", "getPrediction")
  }
}