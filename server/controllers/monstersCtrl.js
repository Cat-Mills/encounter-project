import { Encounter, Monster } from "../model.js";

// Need an encounterId and a monsterUrl
export default {

    getMonsters: async (req, res) => {
        try {
            console.log(req.params)
            const monsters = await Monster.findAll(
                {where: {encounterId: +req.params.encounterId}}
            )
            res.status(200).send(monsters)
        } catch (theseHands) {
            console.log(theseHands)
            res.sendStatus(500)
        }
    },

    addMonster: async (req, res) => {
        try {
            console.log("hit addMonster")
            const {monsterUrl} = req.body
            console.log(req.body)
            await Monster.create({ monsterUrl, encounterId: req.params.encounterId})
            .then(async(info) => {
                console.log(info)
            })
            res.status(200).send("Monster has been added to encounter")
        } catch (err) {
            console.log(err)
            res.status(500).send("Something went wrong")
        }
    },

    deleteMonster: async (req, res) => {
        console.log("delete monster")
        try{
            const {monsterId} = req.params
            await Monster.destroy({where: {monsterId: monsterId}})
            res.sendStatus(200)
        }catch(err) {
            console.log(err)
            res.sendStatus(500)
        }
    }
}