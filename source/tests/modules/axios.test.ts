import axios from "axios"
import assert from "assert"

export class AxiosTest {
  constructor () {}

  testGet = async (): Promise<void> => {
    const response = await axios("https://example.com", {
      "method": "get",
      "responseType": "json"
    })
    
    assert.equal(response.status, 200)
    assert.equal(response.config.method, "get")
    assert.ok(String(response.data).includes("<h1>Example Domain</h1>"))
  }

  run = async (): Promise<void> => {
    await this.testGet()
  }
}