import { Player } from "../model.js";

export default {

    getPlayers: async (req, res) => {
        try {
            //BUG error: column player.userId does not exist
            const players = await Player.findAll(
                // {where: {userId: req.session.user.userId}}
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
            await Player.create({ playerName, playerLv, playerHP, playerAC, playerInit, campaignId: req.campaign.campaignId })
        } catch(err) {
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