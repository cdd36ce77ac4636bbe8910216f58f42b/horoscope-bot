import { zodiacSigns } from "../../code/zodiac-signs"
import assert from "assert"

import { logs } from "../../code/logs"

export class ZodiacSignsTest {
  constructor () {}

  testGetSign = () => {
    const goodZodiac = "capricorn"
    const badZodiac = "pantera"

    assert.equal(zodiacSigns.getSign(goodZodiac).en, "capricorn")
    assert.equal(zodiacSigns.getSign(badZodiac).en, "")
  }

  testHasSign = () => {
    const goodZodiac = "capricorn"
    const badZodiac = "pantera"

    assert.equal(zodiacSigns.hasSign(goodZodiac), true)
    assert.equal(zodiacSigns.hasSign(badZodiac), false)
  }

  run = (): void => {
    this.testGetSign()
    logs.writeSuccessTestMessage("ZodiacSigns", "getSign")

    this.testHasSign()
    logs.writeSuccessTestMessage("ZodiacSigns", "hasSign")
  }
}