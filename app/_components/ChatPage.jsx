import React, { useEffect, useRef, useState } from 'react'
import { getMessages, sendMessage } from '../_utils/actions'
// import { supabase } from '../_utils/meon'
// import { changes } from '../_utils/actions'
import { supabase, supabase2 } from '../_utils/meon'
import { toast } from 'react-toastify'

export default function ChatPage({userId,name,friendId,setNotification}) {
  // console.log(friendId,userId)
  const bottomRef = useRef(null);
    const [msgInput,setMsgInput]=useState("")
   const [databaseMsg,setDatabaseMsg]=useState("")
 
   const[databaseMsgLoading,setDatabaseMsgLoading]=useState(false)
 

    async function handelSendMessage(){
      // setDatabaseMsg(prev=>[...prev,
      //   {
         
        
      //     "sender_id": userId,
      //     "receiver_id": friendId,
      //     "message": msgInput,
      //     "is_seen": false
      
      //  }])

      if(!msgInput){
        toast("please enter message")
        return
      }
   
     const res=await sendMessage(msgInput,userId,friendId)
    //  console.log(res);
 

    }
 

    useEffect(()=>{
      // setDatabaseMsgLoading(true)
        async function getMessage(){
           const res=await getMessages(userId,friendId)
          //  console.log(res)
         setDatabaseMsg(res)
        
        }
        getMessage()
        // setMessageSended(false)
        // setDatabaseMsgLoading(false)

   



    },[friendId])
    useEffect(() => {
      // console.log("I am running");

      try{

        const channel = supabase
        .channel("custom-insert-channel")
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "messsages", // Fixed typo here
          },
          (payload) => {
            const newMsg = payload.new;
            // console.log(newMsg)
            // console.log(payload);
    
            // Only add if it belongs to this chat
            const isRelevant =
              (newMsg.sender_id === userId && newMsg.receiver_id === friendId) ||
              (newMsg.sender_id === friendId && newMsg.receiver_id === userId);
            
              const ReceivedReleivent=newMsg.receiver_id===userId && newMsg.senderId !==friendId
              // console.log(ReceivedReleivent)
              if(ReceivedReleivent){

             setNotification(newMsg)
            //  console.log("Yes ... ")
              }


            if (isRelevant) {
              setDatabaseMsg(prev=>[...prev,newMsg])
              
              // console.log(newMsg)
            }
          }
        )
        .subscribe();
        
        return () => {
          supabase.removeChannel(channel);
        };
      }catch(err){
        alert(err)
      }


    }, [userId, friendId]);
    // if(!name){

    useEffect(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [databaseMsg]);



    if(!userId){
        return <div className='mt-4 '>
            Select your friends to chat
        </div>
    }


  return (
    <div className=" pt-7   ">

<div className='flex items-center w-full text-sm rounded-md gap-3 justify-center cursor-pointer px-3 hover:bg-yellow-700 delay-100 bg-yellow-800 text-center '>

<p className='text-white '>
  {/* {name.length<10 ? name :name.substring(0,10)} */}
  {friendId}
  </p>
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"  className="size-6 text-white">
  <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
</svg>

</div>
<div >

{
  databaseMsgLoading && <button type="button" className="bg-indigo-500 ..." disabled>
  <svg className="mr-3 size-5 animate-spin ..." viewBox="0 0 24 24">
  
  </svg>
  Loading..
</button>

}

<div className=' max-h-[500px] mt-3 overflow-y-auto w-[800px]  bg-gray-400 border-none shadow-2xl pt-3 rounded-2xl  mx-auto'>

{
  
  databaseMsg && databaseMsg.map((e,i)=><div key={i}>
<p className={` px-4 py-2 mb-3 rounded-md  ${e.sender_id===userId ? "text-left bg-white":"text-right bg-blue-300"}`}> {e?.message}</p> 
 
 </div>)
 
}
<div ref={bottomRef}></div>
 </div>

</div>




<div className='absolute bottom-10 left-[50%]'>
<div className="flex  mt-5 w-[600px] py-3 px-3 rounded-xl justify-between bg-gray-300">

<input value={msgInput} onChange={(e)=>setMsgInput(e.target.value)} type="text"  placeholder='Send message to your friend' className='py-2 px-3 outline-none bg-gray-300 mr-4 w-full border-2 border-red-800 rounded-md'/>
<button className='flex items-center bg-green-400 rounded-md px-3 py-2 hover:bg-green-500 text-sm ' onClick={handelSendMessage}>
    <span className='mr-3 text-yellow-900'>

    send
    </span>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-white ">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
</svg>

    </button>

</div>
</div>

    </div>
  )
}
