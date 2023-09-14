import authReducer from "./authReducer.js";
import { configureStore } from "@reduxjs/toolkit";

export default configureStore({
    reducer: authReducer
})