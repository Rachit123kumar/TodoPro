"use client"
import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Button, Input, Modal, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { toast } from 'react-toastify';
let Organisation = [


    {
      name: "Lorem Inc",
      Boards: "boards",
      Activity: "activity",
      setting: "setting",
      Billing: "Billing"
    },
  
    {
      name: "Foo Inc",
      Boards: "boards",
      Activity: "activity",
      setting: "setting",
      Billing: "Billing"
    },
    {
      name: "Resend",
      Boards: "boards",
      Activity: "activity",
      setting: "setting",
      Billing: "Billing"
    },
  
  ]
  
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
export default function DashBoard() {
    const [modalOpen,setModalOpen]=useState(false)
    const [orgName,setOrgName]=useState("")

    function handleCreateOrganisation(){
     if(!orgName){
        toast("please specify a organisation")
     }
     setModalOpen(false)
     Organisation.push({
        name: "Bittu kumar",
      Boards: "boards",
      Activity: "activity",
      setting: "setting",
      Billing: "Billing"

     })
     toast.success('🦄 Your organisations has been created !',{
        position:"bottom-right"

     })
    }

  return (
    <div className='flex max-w-[1200px] mx-auto'>
        
    <div className={` h-[88vh] max-w-[350px] shadow-xl rounded-md `}>




      <div className='flex flex-col mt-10 w-[350px]'>
        <div className='flex justify-between px-3 mb-2'>
          <p className='text-white font-md font-semibold '>WorkSpaces</p>
          <p className='cursor-pointer' onClick={()=>setModalOpen(true)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          </p>
        </div>

        {
          Organisation.map((el, i) => <div key={i}>

            <Accordion >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"

                id="panel1-header"
              >
                <span className='mr-3'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-blue-500">
                  <path fillRule="evenodd" d="M3 2.25a.75.75 0 0 0 0 1.5v16.5h-.75a.75.75 0 0 0 0 1.5H15v-18a.75.75 0 0 0 0-1.5H3ZM6.75 19.5v-2.25a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-.75.75h-3a.75.75 0 0 1-.75-.75ZM6 6.75A.75.75 0 0 1 6.75 6h.75a.75.75 0 0 1 0 1.5h-.75A.75.75 0 0 1 6 6.75ZM6.75 9a.75.75 0 0 0 0 1.5h.75a.75.75 0 0 0 0-1.5h-.75ZM6 12.75a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 0 1.5h-.75a.75.75 0 0 1-.75-.75ZM10.5 6a.75.75 0 0 0 0 1.5h.75a.75.75 0 0 0 0-1.5h-.75Zm-.75 3.75A.75.75 0 0 1 10.5 9h.75a.75.75 0 0 1 0 1.5h-.75a.75.75 0 0 1-.75-.75ZM10.5 12a.75.75 0 0 0 0 1.5h.75a.75.75 0 0 0 0-1.5h-.75ZM16.5 6.75v15h5.25a.75.75 0 0 0 0-1.5H21v-12a.75.75 0 0 0 0-1.5h-4.5Zm1.5 4.5a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.008a.75.75 0 0 1-.75-.75v-.008Zm.75 2.25a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75v-.008a.75.75 0 0 0-.75-.75h-.008ZM18 17.25a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.008a.75.75 0 0 1-.75-.75v-.008Z" clipRule="evenodd" />
                </svg>

                </span>
                <Typography component="span">{el.name}</Typography>
              </AccordionSummary>
              <AccordionDetails  style={{ backgroundColor: "#1111", paddingLeft: "20px", display: "flex ",cursor:"pointer" }}  >

                <span className='mr-2 hover:bg-gray-300'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" />
                  </svg>

                </span>
                <span>

                  {
                    el.Boards
                  }
                </span>
              </AccordionDetails>
              <AccordionDetails style={{ backgroundColor: "#1111", paddingLeft: "20px", display: "flex" ,cursor:"pointer"}}>
                <span className='mr-2'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
                  </svg>

                </span>
                {
                  el.Billing
                }
              </AccordionDetails>
              <AccordionDetails style={{ backgroundColor: "#1111", paddingLeft: "20px", display: "flex" ,cursor:"pointer" }}>
                <span className='mr-2'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                  </svg>

                </span>
                {
                  el.Activity
                }
              </AccordionDetails>

            </Accordion>


          </div>


          )

        }
      </div>
      
    

    </div>

    <Modal
        open={modalOpen}
        onClose={()=>setModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
         <p className='text-md font-bold mb-3'>Name of Organisation</p>
          <TextField value={orgName} onChange={(e)=>setOrgName(e.target.value)} required={true} id="filled-basic" label="Filled" variant="filled" />
        <div className='mt-3'>

          <Button type="submit" variant="outlined" onClick={handleCreateOrganisation} >create</Button>
        </div>
        </Box>
        </Modal>
    </div>
  )
}
