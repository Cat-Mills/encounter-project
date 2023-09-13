import { useState } from "react"
import axios from "axios"


const Landing = () => {   
    //TODO make useState props for register, username and password


    const handleFormSubmit = e => {
        e.preventDefault()

        axios.post(register ? '/api/register' : '/api/login', {username, password})
        .then(res => {
            console.log(res.data)
        })
        .catch(err => console.log(err))
    }

    return(
        <>
        {/*TODO render login and register components here */}
        </>
    )
}