const initialState = {
    userId: null
}

const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'

const authReducer = (state = initialState, action) => {
    switch(action.type){
        case LOGIN:
            return { userId: action.payload}
        case LOGOUT:
            return { userId: null}
        default:
            return state
    }
}

export default authReducer