import { useDispatch } from "react-redux"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function LogoutButton({ onLogout }) {
let nav = useNavigate()
    const dispatch = useDispatch()

    const handleLogout = (evt) => {
        evt.preventDefault()
        console.log("hit logout")

        axios
            .delete('/api/logout')

            .then(res => {
                dispatch({
                    type: "LOGOUT",
                    payload: res.data.userId
                })
                nav('/')
            })
            .catch(err => console.log(err))

    }

    return (
        <form onSubmit={handleLogout}>
            <button type="submit">Log Out</button>
        </form>
    );
}