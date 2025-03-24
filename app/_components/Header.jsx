"use client"
import { useRouter } from "next/navigation"
import { useContext, useEffect, useState } from "react"
import { getCurrentUser, getuser } from "../_utils/actions"
import { ThemeContext } from "../page";
import CustomizedSwitches from "./Switch";
import { useGetUser } from "./useBooking";
import { useQuery } from "@tanstack/react-query";
import AccountMenu from "./AccountMenu";



export default function Header() {
  const{ theme,setTheme,setUser,loadingUserData,setLoadingUserData }= useContext(ThemeContext);

  // const [user, setuser] = useState(false)



 const {data:user,isLoading} =useGetUser()
 const email =user?.email 
 console.log(isLoading?"true":"false")
// console.log(user.email)
  // useEffect(() => {


  //   async function getUser(){
  //       setLoadingUserData(true)
  //     // const{ isLoading,data:user} =useGetUser()
      
      

  //     if(user){
  //       setUser(user.id)
  //       setuser(user)
  //     }

  //     if(!user){
  //       setuser(false)
  //     }
      
  //     if (!user?.code == "user_not_found") {
  //       setuser(true)
  //     }
  //     console.log(user,"i am user")
    
  //   }
  //   getUser()
  //   setLoadingUserData(false)
    

  // }, [])



  const router = useRouter()


  // if(isLoading){
  //   return<>
  //   <p>We are fetching data</p>
  //   </>
  // }

return (<header className={` ${theme=="dark"? " bg-[#1E1B4B]":"bg-[#FFF7ED] text-gray-900" }  text-gray-400 body-font shadow-lg w-full`}>
    <div className="container mx-auto flex flex-wrap p-5 justify-between items-center md:flex-row ">
      <a className="flex title-font font-medium items-center text-white  md:mb-0">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
        </svg>
        <span className={`  ${theme=="dark"? " bg-gray-900 ":" text-gray-900" }  ml-3 text-md`}>TodoPro</span>
      </a>
      <nav className="md:mr hidden  md:flex md-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-700	 flex-wrap items-center text-base justify-center">
        <a className={`  ${theme=="dark" ? " ": "hover:text-black" } mr-5 cursor-pointer`} onClick={()=>router.push("/dashboard")}>Dashboard</a>
        {/* <a className="mr-5 hover:text-white">Second Link</a>
        <a className="mr-5 hover:text-white">Third Link</a>
        <a className="mr-5 hover:text-white">Fourth Link</a> */}
      </nav>
      <div className={` ${theme=="light" ? " " :""}  inline-flex items-center  border-0  focus:outline-none   text-base  md:mt-0 cursor-pointer `}  >{isLoading ? "Login": <AccountMenu title={email} user={user}/> }
 
       {/* {user &&  (<svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
          <path d="M5 12h14M12 5l7 7-7 7"></path>
        </svg>) */}
{/* } */}



     <CustomizedSwitches/>

      </div>
      {/* <button onClick={()=>setTheme(theme==="light"? "dark":"light")}>{theme==="light"? "light":"dark"}</button> */}
    </div>
  </header>)
}