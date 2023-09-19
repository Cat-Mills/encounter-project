import { Player } from "../model.js";

export default {

    getPlayers: async (req, res) => {
        try {
            console.log(req.params)
            const players = await Player.findAll(
                {where: {campaignId: +req.params.campaignId}}
            )
            res.status(200).send(players)
        } catch(theseHands) {
            console.log(theseHands) 
            res.sendStatus(500)
        }
    },

    addPlayer: async (req, res) => {
        try {
            console.log('hit addPlayer')
            const { playerName, playerLv, playerHP, playerAC, playerInit } = req.body
            await Player.create({ playerName, playerLv, playerHP, playerAC, playerInit, campaignId: req.params.campaignId })
            res.status(200).send("New Player Added")
        } catch(err) {
            console.log(err)
            res.sendStatus(500)
        }
    },

    editPlayer: async (req, res) => {
        try {
            console.log("hit editPlayer")
            const { playerName, playerLv, playerHP, playerAC, playerInit } = req.body
            const {playerId} = req.params
            await Player.update({playerName, playerLv, playerHP, playerAC, playerInit}, {where: {playerId: playerId}})

            const updatedPlayer = await Player.findOne({where: {playerId}})
            res.status(200).send(updatedPlayer)
        } catch(err){
            console.log(err)
            res.sendStatus(500)
        }
    },

    deletePlayer: async (req, res) => {
        console.log('delete player')
        try{
            const {playerId} = req.params
            await Player.destroy({where: {playerId: playerId}})
            res.sendStatus(200)
        } catch(err) {
            console.log(err)
            res.sendStatus(500)
        }
    },
}