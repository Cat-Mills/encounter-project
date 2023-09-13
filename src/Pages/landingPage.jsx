import { useState } from "react"
import axios from "axios"
import React from "react"
import Register from "../Elements/Register.jsx"
import Login from "../Elements/Login.jsx"


const Landing = () => {   
    //TODO make useState props for register, togglePassword, username and password
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [register, setRegister] = useState(true)
    const [togglePassword, setTogglePassword] = useState(false)
    //TODO make a button that toggles visual passwords in input field.
    

    const handleFormSubmit = e => {
        e.preventDefault()

        axios
        .post(register ? '/api/register' : '/api/login', {
            username, 
            password
        })
        .then(res => {
            console.log(res.data)
            //TODO dispatch redux to put the userId on global state, then redirect user to home page.
        })
        .catch(err => console.log(err))
    }


    //TODO render login and register components here //
    return (
        <>
        { register ? 
            <Register 
                setPassword={setPassword}
                setUsername={setUsername}
                username={username}
                password={password}
                handleFormSubmit={handleFormSubmit}
            />
            :
            <Login
                setPassword={setPassword}
                setUsername={setUsername}
                username={username}
                password={password}
                handleFormSubmit={handleFormSubmit}
            />
        }
        <button onClick={()=> setRegister(!register)}>Need to {register ? 'login?' : 'make an account?'} </button>
        </>
    )
}

export default Landing