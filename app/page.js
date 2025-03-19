"use client"
import { createContext, useState } from "react";
import Header from "./_components/Header";
import "./_utils/meon.js"
import { signup } from "./_utils/actions";
import FormTodo from "./_components/FormTodo";
import UserTodo from "./_components/UserTodo";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// import { ToastContainer} from 'react-toastify';

export const ThemeContext = createContext(null);

export default function Home() {

  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [loadingUserData,setLoadingUserData]=useState(false);


  const [theme,setTheme]=useState("light")
  const [user,setUser]=useState(null)
  
  
  


async function handleSubmit(e){
  e.preventDefault();
  const res=await signup(email,password)
  console.log(res)
}

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
