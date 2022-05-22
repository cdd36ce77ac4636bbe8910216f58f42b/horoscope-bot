import { Tests } from "./tests/index.test"
import { bot } from "./code/bot"

const main = async (): Promise<void> => {
  const tests = new Tests()

  await tests.runModuleTests()
  await tests.runUnitsTests()

  bot.run()
}

main()