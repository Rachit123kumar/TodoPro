import { useEffect, useState } from "react"


import Variants from "./Skeleton"


import { useGetTodo, useGetUser } from "./useBooking"
import { Box, Button, Modal, TextField, Tooltip, Typography } from "@mui/material"
import Autocomplete from '@mui/material/Autocomplete';


import { toast } from 'react-toastify';
import { deleteTodo, updateTodo } from "../_utils/actions"
import { useMutation, useQueryClient } from "@tanstack/react-query"
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

export default function UserTodo() {

  const queryClient = useQueryClient()
    const [name,setName]=useState("");
    const [description,setDescription]=useState("");
    const [status,setStatus]=useState("");
    const [due_date,setDueDate]=useState("");
    const [priority,setPriority]=useState("");
    const [category,setCategory]=useState("");
    const [now,setNow]=useState("")
    const [id,setId]=useState("")

    const[deleteTodoid,setDeleteTodoid]=useState("")




    const[deleteModal,setDeleteModal]=useState(false)

    const[showModal,setShowModal]=useState(false)

    const [modalData,setModalData]=useState([])


    const [open, setOpen] = useState(false);



    



    function handleOpenDeleteModal(id){
      setDeleteModal(!deleteModal)
      // console.log(id || "no id")
      setDeleteTodoid(id)
      // console.log(deleteTodoid)
      return
    }

    function handleCloseDeleteModal(){
      setDeleteModal(false)
     
      setDeleteTodoid("")
    }





    const handleOpen = (data) => {
        setOpen(true)
        setModalData(data)
        console.log(data)
    return;
    
    }
        


        ;
    const handleClose = () =>{
        
        setOpen(false)
        setModalData([])
    
    
    };


    const { isLoading, data } = useGetUser();
    const { data: todoData, isLoading: isTodoLoaded } = useGetTodo(data?.id, {
        enabled: !!data, // Runs only when `data` is available
    });

    const mutation=useMutation({
      mutationFn:updateTodo,
      
      onSuccess:()=>{
        queryClient.invalidateQueries({ queryKey: ['todo',data.id] })
        toast("Your todo has been succesfully updated..")
      
      
      },
      onError:(err)=>toast(err)
    })

 async  function handleUpdateData(){
  
      console.log(priority,status,name,description,due_date,category,modalData.id,"data is Here");
    // 
    // const res=apiUpdateData();
    // console.log(res)


      // const res=await updateTodo(priority,status,name,description,due_date,category,Number(id))
      // if(res){
      //   toast("You have succesfully updated your data!")

      // }
      // console.log(id,"from userTodo")
      // // const id=modalData.id
      mutation.mutate({
        priority,status,name,description,due_date,category,id
      }
    
    )

    //  console.log(res)

    handleClose()
    }

    const mutationDeleteTodo=useMutation({
      mutationFn:deleteTodo
        ,
      onSuccess:()=>{
        setDeleteModal(false)
        queryClient.invalidateQueries({ queryKey: ['todo',data.id] })
        toast("success")
      },
      onError:()=>{
       
  
        toast("error while delete your todo")

      }
    })

    function handleDeleteTodo(p){
mutationDeleteTodo.mutate(p)

    }


    useEffect(()=>{

      setPriority( modalData.priority);
      setStatus( modalData.status);
      setName(modalData.name);
      setDescription(modalData.description);
      setDueDate( modalData.due_date);
      setId(modalData.id)
      setCategory(modalData.category);
      
    },[modalData])

    // if (!Array.isArray(data)) {
    //     console.log("Data is not an array:", data);
    //     return <p>No data available</p>;
    //   }



    // console.log(typeof (todoData), Array(todoData));
    if (!todoData) {
        return <div className="max-w-[1200px] mx-auto px-5 bg-red-500">
            <Variants />
        </div>
    }

    return (<div className="max-w-[900px]  mx-5 lg:mx-auto  ">
        <div className="grid drid-cols-1 md:grid-cols-2 gap-y-5 gap-x-3  mt-5 p-4 ">
            {
                todoData.todo.map((el, i) => (
                    <div key={i} className="rounded-md py-3 px-3 flex justify-between items-center bg-gray-200 shadow-md">
                      <span>{el.name}</span>  
                        {/* {el.description} */}
                        {/* {el.status}  */}

                        <span className="text-xs">

                            {el.due_date.slice(0, 10)}  {"   "}{el.due_date.slice(11, -3)}
                        </span>
                        <p className={` ${el.priority == "high" ? "text-red-400  font-bold  " : ""}  text-xs flex  bg-white font-bold items-center gap-2  px-2 py-1 rounded-md cursor-pointer`}>
                           <span className={`${el.priority=="medium" ?"rounded-xl":"rounded-md"}`}>{el.priority}</span> 
                           {el.status=="completed" &&

                               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`size-6 text-blue-500`}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
}

                            {
                                el.status =="pending" &&
                               ( <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
</svg>)

                            }
                            {
                                el.status =="in-progress" &&
                               ( <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" />
                              </svg>
                              )

                            }
                           
                        </p>
                        <div className="flex gap-2 justify-between" >
                          
                        <Tooltip ssx={{ '& > :not(style)': { background:"bg-red-300 " } }} title="Delete"  >
                          <span onClick={()=>handleOpenDeleteModal(el.id)} className="bg-red-600">


                      
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-red-500">
  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
</svg>
                          </span>
</Tooltip>
<Tooltip ssx={{ '& > :not(style)': { background:"bg-red-300 " } }} title="Edit" onClick={()=>handleOpen(el)} >

                        <svg   xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
</svg>
</Tooltip>

                        </div>
                    </div>
                ))
            }
        </div>


  {
    setShowModal && 
    <div className="relative ">
    <Modal
    open={open}
    // onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >


    <Box sx={style}>
<span className="absolute right-3 top-5" onClick={handleClose}>

<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
</svg>
</span>
    <TextField id="outlined-basic" label="Todo Name" defaultValue={modalData.name}  onChange={(e)=>setName(e.target.value)} variant="outlined" />


      
      <TextField
         sx={{ '& > :not(style)': { background:"bg-gray-300 ",marginTop:"10px" } }}
          id="outlined-textarea"
          label="Multiline Placeholder"
          placeholder="Description"
          fullWidth
          defaultValue={modalData.description} onChange={(e)=>setDescription(e.target.value)}
          multiline
        />
        
{/* for selecting due Date */}
        {/* <DialogSelect setVariable={setDueDate}/>
         */}
         <input  type="datetime-local" defaultValue={modalData.due_date} onChange={(e)=>setDueDate(e.target.value) } />
       

       {/* For selecting status */}
        {/* <SelectC setVariable={setStatus} variable={modalData.status}/> */}
        <Autocomplete value={modalData.status} onChange={(e,n)=>setStatus(n?.label)}
      disablePortal
      options={[{label:'pending'},{label:"completed"},{label:"in-progress"}]}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Status" />}
    />
        <Autocomplete
value={modalData.priority} onChange={(e,n)=>setPriority(n?.label)}
      disablePortal
      options={[{label:'low'},{label:"medium"},{label:"high"}]}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="priority" />}
    />

     
     
     {/* for selecting priority */}
        {/* <SelectC first="low" second="medium" third={"high"} name={"priority"} setVariable={setPriority} variable={modalData.priority}/> */}


        {/* For typing cateogry */}
      <TextField id="filled-basic" label="cateogry"  onChange={(e)=>setCategory(e.target.value)} defaultValue={modalData.category} variant="filled" />
     
      <div>

      </div>
    <Button variant="contained" className='bg-blue-500' disabled={false} onClick={handleUpdateData}>Save Data</Button> 
      {/* <Typography id="modal-modal-title" variant="h6" component="h2">
        Text in a modal
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
      </Typography> */}
    </Box>
  </Modal>
  </div>
  }

  {
    deleteModal &&   <div className="relative bg-red-600">

      <Modal
    open={deleteModal}
    onClose={handleCloseDeleteModal}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
    >
    <Box sx={style}>
      <span className="absolute right-3 top-5" onClick={()=>setDeleteModal(false)}>

<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
</svg>
</span>
      <p className="text-xs font-bold bg-black rounded-xl py-2 px-3 max-w-[200px] text-center text-white mb-3 ">

       Delete your todo
      </p>

    <Button variant="contained" onClick={()=>handleDeleteTodo(deleteTodoid)}>DELETE</Button>
    </Box>
  </Modal>
    </div>
  }
    </div>)
}