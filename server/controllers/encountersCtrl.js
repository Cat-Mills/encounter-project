import { Campaign, Encounter } from "../model.js";

export default {
    //create new encounter
    addEncounter: async (req, res) => {
        try {
            console.log('hit addEncounter')
            const {encounterName} = req.body
            await Campaign.create({ encounterName })
            res.send(200)
        } catch (err) {
            console.log(err)
            res.sendStatus(500).send("Something went wrong")
        }
    },

}