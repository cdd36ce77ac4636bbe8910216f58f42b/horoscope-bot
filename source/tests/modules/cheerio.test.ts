import cheerio from "cheerio"
import assert from "assert"

export class CheerIoTest {
  constructor () {}

  testLoad = async (): Promise<void> => {
    const testHTML = "<html><p>test</p></html>"
    const $ = cheerio.load(testHTML)
    const paragraphText = $("p").text()
    
    assert.ok($)
    assert.equal(paragraphText, "test")
  }

  run = async (): Promise<void> => {
    await this.testLoad()
  }
}