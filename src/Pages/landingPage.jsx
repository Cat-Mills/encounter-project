import { useState } from "react"
import axios from "axios"
import React from "react"
import Register from "../Elements/Register.jsx"
import Login from "../Elements/Login.jsx"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import '../index.css'


const Landing = () => {   
    
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [register, setRegister] = useState(false)
    const [togglePassword, setTogglePassword] = useState(false)
    const dispatch = useDispatch()
    //TODO make a button that toggles visual passwords in input field.
    let nav = useNavigate()

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
            nav('/campaigns')
        })
        .catch(err => console.log(err))
    }



    return (
        <div className="text-2xl flex flex-col border border-solid bg-gray-700 m-10 h-[50vh] align-middle items-center">
            <div className="absolute top-20 font-vinque text-4xl text-shadow shadow-black">Encounter Emporium</div>
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
        <button className=" hover:text-blue-400 text-xl w-fit mb-5" onClick={()=> setRegister(!register)}>Need to {register ? 'login?' : 'make an account?'} </button>
        </div>
    )
}

export default Landing