const { createSlice } = require("@reduxjs/toolkit")

const initialState={
    instance:null

}
const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        // updateName(state,action){
        //     state.username=action.payload
        // }

        setSocket(state,action){
            state.instance=action.payload
        },
        clearSocket(state){
            state.instance=null
        }
    }
})

export const {setSocket,clearSocket}=userSlice.actions

export default userSlice.reducer