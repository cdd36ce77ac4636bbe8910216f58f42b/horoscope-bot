class ZodiacSigns {
  zodiacs = [
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
  ]

  getListOfSigns = (): string[] => {
    const list: string[] = []
    this.zodiacs.forEach(sign => list.push(sign.en))
    return list
  }

  getSign = (zodiac: string): { en: string, ru: string } => {
    return this.zodiacs.filter(sign => { return [sign.en, sign.ru].includes(zodiac) })[0] || { en: "", ru: "" }
  }

  hasSign = (zodiac: string): boolean => {
    return !!this.zodiacs.filter(sign => { return [sign.en, sign.ru].includes(zodiac) })[0]
  }
}

export const zodiacSigns = new ZodiacSigns()