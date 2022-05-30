import { Predictions, HoroscopeSended, ChatSettings } from "./interfaces"
import { Horoscope } from "./horoscope"
import { Telegram } from "telegraf"
import { settings } from "./settings"
import { zodiacSigns } from "./zodiac-signs"
import { logs } from "./logs"

class HoroscopeSender {
  predictionDate: string = ""
  predictions: Predictions = {}
  sended: HoroscopeSended = {}

  constructor () {}

  updatePredictions = async (): Promise<void> => {
    const signs = zodiacSigns.getListOfSigns()

    for (let i = 0; i < signs.length; i++) {
      const sign = signs[i]
      const horoscope = new Horoscope(sign)

      logs.write(sign + " prediction updating...")

      this.predictions[sign] = await horoscope.getPrediction()
    }
  }

  checkPredictionsUpdate = async (): Promise<void> => {
    const horoscope = new Horoscope("aries")
    const predictionDate = await horoscope.getPredictionDate()
    
    if (predictionDate !== this.predictionDate) {
      logs.write("New prediction! (" + predictionDate + ")")
      await this.updatePredictions()

      this.sended = {}
      this.predictionDate = predictionDate
    }

    setTimeout(
      async () => await this.checkPredictionsUpdate(),
      !this.predictionDate ? 1000 : 90000
    )
  }

  chatsCallback = (callback: (chatId: number) => void): void => {
    const chats = Object.keys(settings.currentSettings)
    
    for (let i = 0; i < chats.length; i++) {
      const chatId = Number(chats[i])
      callback(chatId)
    }
  }

  signsCallback = (chatSettings: ChatSettings, callback: (sign: string) => void): void => {
    const signs = Object.keys(chatSettings.signs)
  
    for (let j = 0; j < signs.length; j++) {
      const sign = signs[j]
      callback(sign)
    }
  }

  sendHoroscopeIfUpdated = async (methods: Telegram): Promise<void> => {
    this.chatsCallback((chatId) => {
      const chatSettings = settings.getChatSettings(chatId)
      
      this.signsCallback(chatSettings, async (sign) => {
        const signValue = chatSettings.signs[sign]
        const russianSignName = zodiacSigns.getSign(sign).ru

        if (!this.sended[chatId]) this.sended[chatId] = {}

        if (signValue === true && this.predictions[sign] && !this.sended[chatId][sign]) {
          try {
            const msg = await methods.sendMessage(
              chatId,
              russianSignName + " | " + this.predictionDate + "\n" + this.predictions[sign],
              { disable_notification: chatSettings.silent }
            )

            if (msg && msg.message_id) {
              logs.write("Sending " + sign + " horoscope to " + chatId + " chat...")
              this.sended[chatId][sign] = true
            }
          } catch (e) {}
        }
      })
    })

    setTimeout(
      async () => await this.sendHoroscopeIfUpdated(methods),
      1500
    )
  }

  run = (methods: Telegram): void => {
    this.sendHoroscopeIfUpdated(methods)
    this.checkPredictionsUpdate()
  }
}

export const horoscopeSender = new HoroscopeSender()