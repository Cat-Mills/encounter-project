import  express  from "express";
import ViteExpress from 'vite-express'
import session from "express-session";
import campCtrl from './controllers/campaignCtrl.js'
import authCtrl from './controllers/authCtrl.js'
import playerCtrl from "./controllers/playerCtrl.js";

const {addCampaign, getAllCampaigns, deleteCampaign} = campCtrl
const {register, login, checkUser, logout} = authCtrl
const {getPlayers, addPlayer, deletePlayer} = playerCtrl

const app = express()
const PORT = 2222

//top level middleware
app.use(express.urlencoded({extended:false}))
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
// app.put('/api/campaigns')
app.delete('/api/campaigns/:campaignId', deleteCampaign)

app.get('/api/players', getPlayers)
app.post('/api/players', addPlayer)
app.put('/players')
app.delete('/api/players/:playerId', deletePlayer)

// app.get('/encounters')
// app.post('/encounters')
// app.put('/encounters')
// app.delete('/encounters')

//authentication endpoints
app.post('/api/register', register)
app.post('/api/login', login)
app.get('/api/user', checkUser)
app.delete('/api/logout', logout)


ViteExpress.listen(app, PORT, () => console.log(`Running on port ${PORT}!`))

