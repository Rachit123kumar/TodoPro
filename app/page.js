"use client"
import { createContext, useState } from "react";
import Header from "./_components/Header";
import "./_utils/meon.js"

import FormTodo from "./_components/FormTodo";
import UserTodo from "./_components/UserTodo";

// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// import { ToastContainer} from 'react-toastify';

export const ThemeContext = createContext(null);

export default function Home() {

  const [loadingUserData,setLoadingUserData]=useState(false);


  const [theme,setTheme]=useState("light")
  const [user,setUser]=useState(null)
  
  


  return (
  
    <ThemeContext.Provider value={{theme,setTheme,user,setUser,setLoadingUserData,loadingUserData}}>
  <div  className={`${theme=="dark"?"bg-gray-800":""}  `}>
<Header/>
<FormTodo/>
<UserTodo/>



  </div>

    </ThemeContext.Provider>
  
  );
}
