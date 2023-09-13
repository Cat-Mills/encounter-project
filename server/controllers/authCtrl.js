import { User } from "../model.js";
import bcrypt from 'bcryptjs'

export default {
    register: async (req, res) => {
        
        try {
            const {username, password} = req.body
            const foundUser = await User.findOne({where: {username}})

            if(foundUser){
                res.status(400).send('That username already exists.')
            } else {
                const salt = bcrypt.genSaltSync(10)
                const hash = bcrypt.hashSync(password, salt)

                const newUser = await User.create({username, hashedPass: hash})

                req.session.user = {
                    userId: newUser.userId,
                    username: newUser.username
                }

                res.status(200).send(req.session.user)

            }
        } catch(err){
            console.log(err)
            res.sendStatus(500)
        }
    },

    login: async (req, res) => {
        console.log('login')
        try {
            const {username, password} = req.body
            const foundUser = await User.findOne({where: {username}})

            if(!foundUser){
                res.status(400).send('There was no user found with that username')
            } else {
                const isAuthenticated = bcrypt.compareSync(password, foundUser.hashedPass)
                if(isAuthenticated){
                    req.session.user = {
                        userId: foundUser.userId,
                        username: foundUser.username
                    }
                    res.status(200).send(req.session.user)
                } else {
                    res.status(401).send('Password is incorrect')
                }
            }

        } catch(err) {
            console.log(err)
            res.sendStatus(500)
        }
    },

    checkUser: async (req, res) => {
        console.log('checkUser')
        if(req.session.user){
            res.status(200).send(req.session.user)
        } else {
            res.status(400).send('There is no user on the session')
        }
    },

    logout: async (req, res) => {
        console.log('logout')
        req.session.destroy()
        res.status(200).send('You have logged out')
    }
}