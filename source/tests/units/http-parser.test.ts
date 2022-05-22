import { HttpParser } from "../../code/http-parser"
import assert from "assert"

import { logs } from "../../code/logs"

export class HttpParserTest {
  private parser: HttpParser | undefined
  private testSite = "wikipedia.org"
  private testClass = "localized-slogan"
  private testText = "Free"

  constructor () {}

  testGetHtmlString = async (): Promise<void> => {
    if (!this.parser) this.parser = new HttpParser(this.testSite)

    const html = await this.parser.getHtmlString()

    assert.ok(html.includes(this.testText))
  }

  testGetElementsByClassName = async (): Promise<void> => {
    if (!this.parser) this.parser = new HttpParser(this.testSite)

    const classes = await this.parser.getElementsByClassName(this.testClass)

    assert.ok(classes.html)
    assert.ok(String(classes.html()).includes(this.testText))
  }

  testGetElementsTextByClassName = async (): Promise<void> => {
    if (!this.parser) this.parser = new HttpParser(this.testSite)

    const text = await this.parser.getElementsTextByClassName(this.testClass)

    assert.ok(text)
    assert.ok(text.includes(this.testText))
  }

  run = async (): Promise<void> => {
    await this.testGetHtmlString()
    logs.writeSuccessTestMessage("HttpParser", "getHtmlString")

    await this.testGetElementsByClassName()
    logs.writeSuccessTestMessage("HttpParser", "getElementsByClassName")
    
    await this.testGetElementsTextByClassName()
    logs.writeSuccessTestMessage("HttpParser", "getElementsTextByClassName")
  }
}