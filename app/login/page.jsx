"use client";

import { Alert, Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { login, signup } from "../_utils/actions";
import CheckIcon from '@mui/icons-material/Check';
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";


export default function Login() {

   const router=useRouter()
     
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [alertMessage,setAlertMessage]=useState("")
    const [alreadyAccount,setAlreadyAccount]=useState(false)

    async function handleSignup(){



// console.log(email,password)

const  res=await signup(email,password)
// console.log(res)
if(!res){
 alert("You have already an account please login")
    return
}
// console.log("data:",data,"error:",error)


if(data?.user?.user_metadata?.email_verified==false){
    setAlertMessage("Check your email we have send a link to login in our app")
    // router.push('/')
}


if(error && error.message){
    // console.log(error.message, " i am error")
    setAlertMessage(error.message)
}
    }

     async function handleLogin(){
  const {data,error}  =await login(email,password);
//   console.log(data,error)
  if(error && error.message){

      setAlertMessage(error.message)
  }

  if(!error){

    // console.log(data.user.email)
    setAlertMessage("Hii  "+ data.user.email +"  now are you being redirected to our dashboard page ")
    setTimeout(()=>{
        router.push("/")
    },3000)
   
  }

  

     }

    return <div className="">
        {
            alertMessage && (
                <div className="absolute top-[10%] max-w-[500px] left-[30%] text-center mx-auto">
                <Alert icon={<CheckIcon fontSize="inherit" />} sx={{ '& > :not(style)':{maxWidth:'500px', textAlign:'center'}}} severity="warning">
               {alertMessage}
                <button onClick={()=>setAlertMessage("")} className="pl-5"> X</button>
              </Alert>
                    </div>
            )
        }
        <div className="flex items-center justify-center  flex-col h-screen bg-gray-100">
            <p>Login Here to continue</p>

            <Box className="flex-col"
                component="form"
                sx={{ '& > :not(style)': { m: 1, width: '25ch' }, display: "flex", flexDirection: "column", maxWidth: "400px", }}
                noValidate
                autoComplete="off"
            >
                <TextField id="outlined-basic" label="Email" sx={{
                    '& > :not(style)': { width: "250px" }
                }} variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} />


                <TextField

                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    variant="filled"
                    sx={{
                        '& > :not(style)': { width: "250px" }
                    }}
                    value={password}
                    onChange={(e) => setPassword((e.target.value))}
                />

            </Box>
            
            {
                alreadyAccount ?
            (<Button variant="contained" onClick={handleLogin}>Login</Button>): (<Button variant="contained" onClick={handleSignup}>Sign Up</Button>)
                
            }
{
     <p className="text-xs mt-3 hover:underline" onClick={()=>setAlreadyAccount(!alreadyAccount)}>already? have an account? :</p>}
        </div>
    </div>
}
