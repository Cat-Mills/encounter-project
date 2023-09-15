import { useDispatch } from "react-redux"
import axios from "axios"

export default function LogoutButton({ onLogout }) {

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
            })
            .catch(err => console.log(err))
    }

    return (
        <form onSubmit={handleLogout}>
            <button type="submit">Log Out</button>
        </form>
    );
}