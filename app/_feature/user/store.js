const { configureStore } = require("@reduxjs/toolkit");
import userReducer from "./UserSlice"
const store=configureStore({
    reducer:{
        user:userReducer
    }
})

export default store;