import { Horoscope } from "../../code/horoscope"
import assert from "assert"

import { logs } from "../../code/logs"

export class HoroscopeTest {
  constructor () {}

  testConstructor = (): void => {
    assert.ok(new Horoscope("capricorn"))
    assert.throws(() => { new Horoscope("none") })
  }

  testGetPredictionDay = async (): Promise<void> => {
    const horoscope = new Horoscope("capricorn")
    const predictionDay = await horoscope.getPredictionDay()

    assert.ok(typeof predictionDay == "number")
    assert.ok(predictionDay >= 1 && predictionDay <= 31)
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

    await this.testGetPredictionDay()
    logs.writeSuccessTestMessage("Horoscope", "getPredictionDay")

    await this.testGetPrediction()
    logs.writeSuccessTestMessage("Horoscope", "getPrediction")
  }
}