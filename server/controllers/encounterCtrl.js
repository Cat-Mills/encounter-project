import { Campaign, Encounter } from "../model.js";

export default {

    getEncounters: async (req, res) => {
        try {
            console.log("hit getEncounters")
            const {userId} = req.params
            const encounters = await Encounter.findAll({where: {userId}})
            
            res.status(200).send(encounters)
        } catch(theseHands) {
            console.log(theseHands)
            res.sendStatus(500)
        }
    },

    //create new encounter
    addEncounter: async (req, res) => {
        try {
            console.log('hit addEncounter')
            const {encounterName} = req.body
            const {userId} = req.params
            
            await Encounter.create({ encounterName, userId})
            res.status(200).send("New Encounter Added")
        } catch (err) {
            console.log(err)
            res.sendStatus(500).send("Something went wrong")
        }
    },

    editEncounter: async (req, res) => {
        try {
            console.log('hit editEncounter')
            const {encounterName} = req.body
            const {encounterId} = req.params

            await Encounter.update({encounterName}, {where: {encounterId: encounterId}})
            const updatedEncounter = await Encounter.findOne({where: {encounterId}})

            res.status(200).send(updatedEncounter)
        } catch(err){
            console.log(err)
            res.sendStatus(500)
        }
    },

    deleteEncounter: async (req, res) => {
        console.log("hit deleteEncounter")
        try{
            const {encounterId} = req.params
            await Encounter.destroy({where: {encounterId: encounterId}})
            res.sendStatus(200)
        } catch(err){
            console.log(err)
            res.sendStatus(500)
        }
    }

}