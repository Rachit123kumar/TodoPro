"use client"
import { Provider, useDispatch } from "react-redux";
import store from "../_feature/user/store";
import { useEffect } from "react";
import { getSocket } from "../_utils/SocketClient";
import { setSocket } from "../_feature/user/UserSlice";

export function WebSocketInitializer(){
    const dispatch=useDispatch()


//     useEffect(()=>{
//   const socket=getSocket();
//   dispatch(setSocket(socket))

//   return ()=>{
//     socket.close()


//   }

    // },[])
return null


}



export default function ReduxProvider({children}){
    return <Provider store={store}>
        <WebSocketInitializer/>

        {children}


    </Provider>
}