import { InlineKeyboard } from "./interfaces"
import { zodiacSigns } from "./zodiac-signs"

class InlineKeyboardGetter {
  constructor () {}
  
  getMainInlineKeyboard = (): InlineKeyboard => {
    return [
      [ { callback_data: "silent", text: "Бесшумный режим" } ],
      [ { callback_data: "signs", text: "Знаки зодиака" } ]
    ]
  }

  getSignsInlineKeyboard = (): InlineKeyboard => {
    const signs = zodiacSigns.getListOfSigns()
    const keyboard: InlineKeyboard = []

    let tempRow = []

    for (let i = 0; i < signs.length; i++) {
      const sign = signs[i]

      const russianSignName = zodiacSigns.getSign(sign).ru
      const data = { callback_data: sign, text: russianSignName }
      
      if (tempRow.length < 2 && signs.indexOf(sign) !== (signs.length - 1)) {
        tempRow.push(data)
      } else {
        keyboard.push(tempRow)
        tempRow = []
      }
    }

    keyboard.push( [ { callback_data: "return", text: "Вернуться" } ] )
    return keyboard
  }
}

export const inlineKeyboardGetter = new InlineKeyboardGetter()