import connectToDB from "./db.js";
import {Campaign, User} from './model.js'

const db = await connectToDB('postgresql:///encounterdb')

const campaignData = [
    {
        campaignName: 'campTest1',
        userId: 1
    },
    {
        campaignName: 'campTest2',
        userId: 1
    }
]

await db.sync({force: true}).then(async () => {
    await User.create({username: 'tester1', hashedPass: 'test'})
    const newCampaigns = await Campaign.bulkCreate(campaignData)
    console.log('db has been successfully reset and seeded!')
})

await db.close()