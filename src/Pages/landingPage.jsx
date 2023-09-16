import { useState } from "react"
import axios from "axios"
import React from "react"
import Register from "../Elements/Register.jsx"
import Login from "../Elements/Login.jsx"
import { useDispatch } from "react-redux"


const Landing = () => {   
    
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [register, setRegister] = useState(false)
    const [togglePassword, setTogglePassword] = useState(false)
    const dispatch = useDispatch()
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
            dispatch({type: "LOGIN", payload: res.data.userId})
        })
        .catch(err => console.log(err))
    }



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