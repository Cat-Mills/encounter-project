import connectToDB from "./db.js";
import {Campaign, User, Encounter} from './model.js'
import bcrypt from 'bcryptjs'

const db = await connectToDB('postgresql:///encounterdb')

const campaignData = [
    {
        campaignName: 'campy1',
        userId: 1
    },
    {
        campaignName: 'campy2',
        userId: 1
    }
]
// const encounterData = [
//     {
//         encounterName: 'enc1',
//         userId: 1
        
//     }
// ]

await db.sync({force: true}).then(async () => {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync('test', salt)

    await User.create({username: 'tester', hashedPass: hash})
    await Campaign.bulkCreate(campaignData)
    // await Encounter.bulkCreate(encounterData)
    console.log('db has been successfully reset and seeded!')
})

await db.close()