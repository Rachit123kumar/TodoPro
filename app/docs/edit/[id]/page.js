"use client"
import EditorProviderComponent from "@/app/_components/EditorProvider";
import { getDocs } from "@/app/_utils/actions";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

// const EditorComponent = dynamic(() => import("../../../_components/EditorProvider"), {
//   // ssr: false, // Isko Server Component me use kar sakte hain
// });
export default function VeiwDocs(){
  const params=useParams()
  const id=params.id
const [data,setData]=useState("")


useEffect(()=>{

  async function fetchDocsData(){

    const res=await getDocs(id)
    // console.log(res)
    setData(res)

  }
  fetchDocsData()
},[])

if(!data){
  return <div>
No data
  </div>
}


  return <div>
    <EditorProviderComponent initalContent={data}/>
  </div>
}