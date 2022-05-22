"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inlineKeyboardGetter = void 0;
const zodiac_signs_1 = require("./zodiac-signs");
class InlineKeyboardGetter {
    constructor() {
        this.getMainInlineKeyboard = () => {
            return [
                [{ callback_data: "silent", text: "Бесшумный режим" }],
                [{ callback_data: "signs", text: "Знаки зодиака" }]
            ];
        };
        this.getSignsInlineKeyboard = () => {
            const signs = zodiac_signs_1.zodiacSigns.getListOfSigns();
            const keyboard = [];
            let tempRow = [];
            for (let i = 0; i < signs.length; i++) {
                const sign = signs[i];
                const russianSignName = zodiac_signs_1.zodiacSigns.getSign(sign).ru;
                const data = { callback_data: sign, text: russianSignName };
                if (tempRow.length < 2 && signs.indexOf(sign) !== (signs.length - 1)) {
                    tempRow.push(data);
                }
                else {
                    keyboard.push(tempRow);
                    tempRow = [];
                }
            }
            keyboard.push([{ callback_data: "return", text: "Вернуться" }]);
            return keyboard;
        };
    }
}
exports.inlineKeyboardGetter = new InlineKeyboardGetter();
