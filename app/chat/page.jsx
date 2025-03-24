"use client";

import { toast } from "react-toastify";
import { useGetUser } from "../_components/useBooking";
import { useEffect, useState } from "react";
import { fetchFriends } from "../_utils/actions";
import { useSelector } from "react-redux";
import ChatPage from "../_components/ChatPage";
import { useRouter } from "next/navigation";

export default function Chat() {
  const [notification, setNotification] = useState("");

  const username = useSelector((state) => state.user.username);

  const [chatPerson, setChatPerson] = useState(null);
  const router = useRouter();

  const [friendsData, setFriendsData] = useState([]);
  const { isLoading, error, data } = useGetUser();

  useEffect(() => {
    if (!data?.id) return;

    async function fetchMyFriends() {
      const res = await fetchFriends(data.id);
      setFriendsData(res);
    //   console.log(res); // Log the fetched data instead of the old state
    }

    fetchMyFriends();
  }, [data]);

  useEffect(() => {
    if (!isLoading && !data) {
      toast.error("Please login to send Messages");
      router.push("/login");
    }
  }, [isLoading, data, router]);

  if (!friendsData) {
    return <p>Loading friends...</p>;
  }

  if (!isLoading && data) {
    return (
      <div className="grid grid-cols-10 bg-red-500">
        <div
          className={`flex flex-col min-h-screen gap-y-4 col-span-4 mx-auto bg-green-200`}
        >
          <p className="px-3 py-4 font-xl font-bold text-center cursor-pointer">
            Your userId : {data?.id}
          </p>

          {friendsData.map((el, i) => (
            <div
              className="flex bg-red-200 space-y-1 justify-around w-[500px] px-2 py-3 rounded-lg cursor-pointer"
              onClick={() => setChatPerson(el)}
              key={i}
            >
              <p>{el?.freind_id}</p>
            </div>
          ))}
        </div>

        <div className="col-span-6">
          {chatPerson && (
            <ChatPage
              name={chatPerson?.name}
              userId={data?.id}
              friendId={chatPerson.freind_id}
              setNotification={setNotification}
            />
          )}
        </div>
      </div>
    );
  }

  return <p>Loading...</p>;
}
