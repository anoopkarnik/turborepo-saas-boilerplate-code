import db from '../../src/index'
import { createCategories, createFTSIndex } from './aiCompanion'
import { createAdminUser, createGuestUser } from './fakeUsers'


async function main () {
    // await createGuestUser()
    // await createAdminUser()
    // await createCategories()
    // await createFTSIndex()
}

main()
  .then(async () => {
    await db.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await db.$disconnect()
    process.exit(1)
  })