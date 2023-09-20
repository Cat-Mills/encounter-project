import { Campaign } from '../model.js'

export default {
    //create new campaign
    addCampaign: async (req, res) => {
        try {
            console.log('hit addCampaign')
            const { campaignName } = req.body
            const {userId} = req.params
            
            await Campaign.create({ campaignName, userId: userId })
            res.send(200)
        } catch (err) {
            console.log(err)
            res.sendStatus(500).send("Something ain't right")
        }
    },

    getAllCampaigns: async (req, res) => {
        try {
            console.log(req.session.user)
            const campaigns = await Campaign.findAll({where: {userId: req.session.user.userId}})
            res.status(200).send(campaigns)
        } catch (theseHands) {
            console.log(theseHands)
            res.sendStatus(500)
        }
    },

    deleteCampaign: async (req, res) => {
        console.log('delete Campaign')
        try{
            const {campaignId} = req.params
            await Campaign.destroy({where: {campaignId: campaignId}})
            res.sendStatus(200)
        } catch(err) {
            console.log(err)
            res.status(400).send("Couldn't delete campaign")
        }
    }
}