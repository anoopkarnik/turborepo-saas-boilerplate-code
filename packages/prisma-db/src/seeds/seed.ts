import db from '../index.js'
import { createCategories, createFTSIndex } from './aiCompanion.js'
import { createAdminUser, createGuestUser } from './fakeUsers.js'
import { createAgents } from './meet.js'


async function main () {
    // await createGuestUser()
    // await createAdminUser()
    await createCategories()
    await createFTSIndex()
    await createAgents()
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