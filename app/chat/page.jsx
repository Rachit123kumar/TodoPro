"use client"
import { toast } from "react-toastify";
import { useFetchFriends, useGetUser } from "../_components/useBooking"
import { useEffect, useState } from "react";
import { fetchFriends } from "../_utils/actions";
import { useDispatch, useSelector } from "react-redux";
import { updateName } from "../_feature/user/UserSlice";
import ChatPage from "../_components/ChatPage";
import { useRouter } from "next/navigation";
import { Island_Moments } from "next/font/google";

export default function Chat() {


const [notificiation,setNotification]=useState("")


const username=useSelector(state=>state.user.username)

const [chatPerson,setChatPerson]=useState("")
const router=useRouter()
//    const dispatch=useDispatch()
    const [friendsData, setFriendsData] = useState([])

    const { isLoading, error, data } = useGetUser()





    console.log(data);

    useEffect(() => {
        if (!data?.id) {
            return
        }
        async function fetchMyFriends() {

            const res = await fetchFriends(data.id)
            setFriendsData(res)
            console.log(friendsData)

        }
        fetchMyFriends(data.id)


    }, [data])



    if(!isLoading && !data){
        toast.error("Please login to send Messages")
        router.push("/login")
    }


if(!friendsData){
    return <p>Loading friends</p>
}



return <div className="grid grid-cols-10 bg-red-500">
    <div className={`flex  flex-col min-h-screen gap-y-4 ${chatPerson ? "col-span-4":"col-span-4"}    mx-auto  bg-green-200`}>

   <p className="px-3 py-4 font-xl font-bold text-center cursor-pointer"> Your userId : {data?.id}</p>
    {/* <input placeholder="enter your name" onClick={(e)=>dispatch(updateName(e.target.value))} /> */}
    {
        friendsData.map((el,i)=>(
            <div className=" flex bg-red-200 space-y-1 justify-around w-[500px] px-2 py-3 rounded-lg" onClick={()=>setChatPerson(el)} key={i}>
                <p>{el?.freind_id}  </p>
                {/* <p>{el?.id}</p> */}
              

            </div>
        ))
    }
    </div>

    <div className="cols-span-6">
{
  chatPerson &&  <ChatPage name={chatPerson?.name} userId={data?.id} friendId={chatPerson.freind_id} setNotification={setNotification}/>
}

    </div>

</div>


}
