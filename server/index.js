import express from "express";
import ViteExpress from 'vite-express'
import session from "express-session";
import campCtrl from './controllers/campaignCtrl.js'
import authCtrl from './controllers/authCtrl.js'
import playerCtrl from "./controllers/playerCtrl.js";
import encounterCtrl from "./controllers/encounterCtrl.js";


const { addCampaign, getAllCampaigns, deleteCampaign, editCampaign } = campCtrl
const { register, login, checkUser, logout } = authCtrl
const { getPlayers, addPlayer, deletePlayer, editPlayer } = playerCtrl
const { getEncounters, addEncounter, editEncounter, deleteEncounter } = encounterCtrl

const app = express()
const PORT = 2222

//top level middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(session({
    saveUninitialized: true,
    resave: false,
    secret: 'sssshhhhhh',
    cookie: {
        maxAge: 1000 * 60 * 60 * 48
    }
}))

//TODO endpoints
app.get('/api/campaigns', getAllCampaigns)
app.post('/api/campaigns', addCampaign)
app.put('/api/campaigns/:campaignId', editCampaign)
app.delete('/api/campaigns/:campaignId', deleteCampaign)


app.get('/api/players/:campaignId', getPlayers)
app.post('/api/players/:campaignId', addPlayer)
app.put('/api/players/:playerId', editPlayer)
app.delete('/api/players/:playerId', deletePlayer)


app.get('/api/encounters', getEncounters)
app.post('/api/encounters', addEncounter)
app.put('/api/encounters/:encounterId', editEncounter)
app.delete('/api/encounters/:encounterId', deleteEncounter)

//authentication endpoints
app.post('/api/register', register)
app.post('/api/login', login)
app.get('/api/user', checkUser)
app.delete('/api/logout', logout)


ViteExpress.listen(app, PORT, () => console.log(`Running on port ${PORT}!`))

