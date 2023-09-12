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
    },

    checkUser: async (req, res) => {
        console.log('checkUser')
    },

    logout: async (req, res) => {
        console.log('logout')
    }
}