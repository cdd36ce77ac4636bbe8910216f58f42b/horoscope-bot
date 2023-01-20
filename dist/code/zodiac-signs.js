"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zodiacSigns = void 0;
class ZodiacSigns {
    constructor() {
        this.zodiacs = [
            { en: "aries", ru: "♈️ Овен" },
            { en: "taurus", ru: "♉️ Телец" },
            { en: "gemini", ru: "♊️ Близнецы" },
            { en: "cancer", ru: "♋️ Рак" },
            { en: "leo", ru: "♌️ Лев" },
            { en: "virgo", ru: "♍️ Дева" },
            { en: "libra", ru: "♎️ Весы" },
            { en: "scorpio", ru: "♏️ Скорпион" },
            { en: "sagittarius", ru: "♐️ Стрелец" },
            { en: "capricorn", ru: "♑️ Козерог" },
            { en: "aquarius", ru: "♒️ Водолей" },
            { en: "pisces", ru: "♓️ Рыбы" }
        ];
        this.getKeyboard = () => {
            const keyboard = [];
            this.zodiacs.forEach((sign, index) => {
                const data = { callback_data: sign.en, text: sign.ru };
                if (index % 2 === 0)
                    keyboard.push([data]);
                if (index % 2 === 1)
                    keyboard[~~(index / 2)].push(data);
            });
            keyboard.push([{ callback_data: "return", text: "⬅️ Вернуться" }]);
            return keyboard;
        };
        this.getListOfSigns = () => {
            const list = [];
            this.zodiacs.forEach(sign => list.push(sign.en));
            return list;
        };
        this.getSign = (zodiac) => {
            return this.zodiacs.filter(sign => { return [sign.en, sign.ru].includes(zodiac); })[0] || { en: "", ru: "" };
        };
        this.hasSign = (zodiac) => {
            return !!this.zodiacs.filter(sign => { return [sign.en, sign.ru].includes(zodiac); })[0];
        };
    }
}
exports.zodiacSigns = new ZodiacSigns();
