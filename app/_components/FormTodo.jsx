
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import SelectC from './Select';

import { useContext, useEffect, useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Button, Typography } from '@mui/material';
import { insertTodo } from '../_utils/actions';
import { ThemeContext } from '../page';
import { useGetUser } from './useBooking';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import CreateDocsForm from './CreateDocsForm';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';




export default function FormTodo() {
  const { theme, setTheme } = useContext(ThemeContext)


  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [due_date, setDueDate] = useState("");
  const [priority, setPriority] = useState("");
  const [category, setCategory] = useState("");
  const [now, setNow] = useState("")


  const { data: user, error } = useGetUser();
  // console.log(user)

  const queryClient = useQueryClient()


  const mutation = useMutation(
    {
      mutationFn: insertTodo,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["todo", user.id] })
        toast("your todo has been created..")
      },
      onError: () => {
        toast.error("Error while creating your todos..")
      }

    }
  )


  // set Now ko fix karna hai..
  useEffect(() => {

    setNow(new Date().toLocaleString("en-US"))
  })

  async function handleAddTodo() {
    if (!user.id) {
      alert("error user id")
      return
    }
    // console.log(name,description,status,due_date,priority,category,user.id)


    //  const {data,error}= await insertTodo(name,description,status,due_date,priority,category,user.id);
    //  console.log(data,error,"data and error");
    if (!name || !description || !status || !due_date || !priority || !category) {
      toast.warning("please enter all the field")
      return;

    }

    mutation.mutate({ name, description, status, due_date, priority, category, userId: user.id })
    setName("")
    setDescription("")
    setStatus("")
    setDueDate("")
    setPriority("")
    setCategory("")


  }


  return (<div className='mx-w-[1200px] mx-auto'>
    <CreateDocsForm />

    <div className={` ${theme == "dark" ? "bg-gray-900" : ""}  max-w[1000px] flex  justify-center  gap-y-5  mt-10`}>

      <Box

        component="form"
        sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
        noValidate
        autoComplete="off"
      >
        {/* <TextField id="outlined-basic"  label="Todo Name" value={name} onChange={(e)=>setName(e.target.value)} variant="outlined" />


      
      <TextField
         sx={{ '& > :not(style)': { background:"bg-gray-300" } }}
          id="outlined-textarea"
          label="Multiline Placeholder"
          placeholder="Description"
          fullWidth
          value={description} onChange={(e)=>setDescription(e.target.value)}
          multiline
          
        /> */}

        {/* for selecting due Date */}
        {/* <DialogSelect setVariable={setDueDate}/>
         */}
        {/* <input  required type="datetime-local" value={due_date} onChange={(e)=>setDueDate(e.target.value) } min={now}/> */}


        {/* For selecting status */}
        {/* <SelectC setVariable={setStatus}/> */}



        {/* for selecting priority */}
        {/* <SelectC first="low" second="medium" third={"high"} name={"priority"} setVariable={setPriority}/> */}


        {/* For typing cateogry */}
        {/* <TextField id="filled-basic" label="cateogry" value={category} onChange={(e)=>setCategory(e.target.value)} variant="filled" />
      <TextField id="standard-basic" label="Standard" variant="standard" /> */}
        <div>

        </div>
        {/* <Button variant="contained" className='bg-blue-500' disabled={!user} onClick={handleAddTodo}>{ !user ?"Login to Add todo":" Add Todo"}</Button>  */}
      </Box>

    </div>




  </div>

  );

}
