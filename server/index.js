import  express  from "express";
import ViteExpress from 'vite-express'
import session from "express-session";
import campCtrl from './controllers/campaignCtrl.js'
import authCtrl from './controllers/authCtrl.js'

const {addCampaign, getAllCampaigns} = campCtrl
const {register, login, checkUser, logout} = authCtrl

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

//endpoints
app.get('/campaigns', getAllCampaigns)
app.post('/campaigns', addCampaign)
app.put('/campaigns')
app.delete('/campaigns')

app.get('/players')
app.post('/players')
app.put('/players')
app.delete('/players')

app.get('/encounters')
app.post('/encounters')
app.put('/encounters')
app.delete('/encounters')

//authentication endpoints
app.post('/api/register', register)
app.post('/api/login', login)
app.get('/api/user', checkUser)
app.delete('/api/logout', logout)


ViteExpress.listen(app, PORT, () => console.log(`Running on port ${PORT}!`))

