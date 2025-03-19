"use client"
import { Box, Button, Input, Modal, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import { useGetUser } from "./useBooking";
import { insertDocs } from "../_utils/actions";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,


    p: 4,
  };
  

export default function CreateDocsForm(){

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [docsTitle,setDocsTitle]=useState("")
const router=useRouter()

    const {data,isLoading,error}=useGetUser();


async function handleCreateDocs(){
    if(!data.id || !docsTitle){
        console.log("wewe")
        return
    
    }
try{

    const res=await insertDocs(docsTitle,data.id )

    // console.log(res)

    router.push(`/docs/edit/${res[0].id}`);

}catch(err){
    toast(err)
}
    


    // console.log(data,isLoading,error)
}

    return    <div className='mx-w-[800px] flex items-center justify-around mt-10 mb-10'>
    
    <div className='bg-gray-400 rounded relative h-[200px] w-[200px]  bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500'>
    
    <span className='absolute  bottom-5 right-5 ' onClick={()=>setOpen(true)}>
    
    
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5 h-10 w-10 stroke-gradient-to-r hover:scale-[1.5] ease-in-out duration-700 cursor-pointer from-green-300 via-blue-500 to-purple-600 hover:text-blue-400 hover:transform-x-1.5">
      <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z" clipRule="evenodd" />
    </svg>
    
    </span>
    <div>
    
    </div>
    </div>
    <div></div>

    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} >
           
          <Typography id="modal-modal-title" variant="h6" component="h2">
           Enter the name for your document
          </Typography>
        
       <Input placeholder="Title" value={docsTitle} onChange={(e)=>setDocsTitle(e.target.value)} required sx={{marginTop:"10px"}}/>

       <Button variant="contained" sx={{display:"block", marginTop:"10px"}} onClick={handleCreateDocs}>Create Now</Button>
        </Box>
      </Modal>

    
        </div>
}