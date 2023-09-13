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
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync('test', salt)

    await User.create({username: 'tester1', hashedPass: hash})
    const newCampaigns = await Campaign.bulkCreate(campaignData)
    console.log('db has been successfully reset and seeded!')
})

await db.close()