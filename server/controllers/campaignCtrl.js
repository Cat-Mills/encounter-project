import {Campaign} from '../model.js'

export default {
    //create new campaign
    addCampaign: async (req, res) => {
        try {
            console.log('hit addCampaign')
            const {campaignName} = req.body
            await Campaign.create({campaignName})
            res.send(200)
        } catch (err) {
            console.log(err)
            res.sendStatus(500).send("Something ain't right")
        }
    },

    getAllCampaigns: async (req, res) => {
        try {
            const campaigns = await Campaign.findAll()
            res.status(200).send(campaigns)
        } catch(theseHands){
            console.log(theseHands)
            res.sendStatus(500)
        }
    }
}