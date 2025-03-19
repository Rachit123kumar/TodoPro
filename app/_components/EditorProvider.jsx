"use client"

// import { Button } from "@mui/material"
// import styles from "./styles.module.css"
import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import { EditorProvider, useCurrentEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React, { useEffect, useState } from 'react'
import CharacterCount from "@tiptap/extension-character-count"
import { useParams, useRouter } from "next/navigation"
import { checkDocsOwner, getDocs, updateDocs } from "@/app/_utils/actions"
import { useGetUser } from "@/app/_components/useBooking"
import { toast } from "react-toastify"


const MenuBar = () => {
  const params=useParams();
const [user_id,setUser_id]=useState("")
const [supabaseDocsData,setSupabaseDocsData]=useState("")
const router=useRouter();

  const {id:docsID}=params;
  // console.log(id)
  // yahan se edit karna hai 
  const { editor } = useCurrentEditor()

  const {data,isLoading,error}=useGetUser()


  useEffect(()=>{



async function checkOwner(){

  if(isLoading){
    return
  }


  if(!data){
    toast("no user account please login to view this page . We are redirecting you the view page")
    router.push(`/docs/view/${docsID}`)
    

    return
  }


  const res=await checkDocsOwner(docsID,data?.id);

  if(!res.length){
    // send the user to view page of this id 
    toast("Sorry you are not the editor of the file")
  }


//   const docsData=await getDocs(docsID);
//   setSupabaseDocsData(docsData[0].content)
//   console.log(docsData,"docsData")



}


checkOwner()
  },[data])



async function handleUpdateDocs(content){
  // console.log(content)
  const res=await updateDocs(docsID,content);
  // console.log(res)

}
  



  if (!editor) {
    return null
  }

  return (
    <div className={`control-group  max-w-[1000px] mx-auto `}>
      <div className={`button-group  grid grid-cols-5  space-x-1 space-y-2`}>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}

          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleBold()
              .run()
          }
          className={`${editor.isActive('bold') ? 'is-active' : ''} `}
        >
          Bold
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleItalic()
              .run()
          }
          className={`${editor.isActive('italic') ? 'is-active' : ''} bg-amber-100 px-2 py-3 cursor-pointer`}
        >
          Italic
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleStrike()
              .run()
          }
          className={`${editor.isActive('strike') ? 'is-active' : ''}  bg-amber-100 px-2 py-3 cursor-pointer`}
        >
          Strike
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleCode()
              .run()
          }
          className={`${editor.isActive('code') ? 'is-active' : ''}  bg-amber-100 px-2 py-3 cursor-pointer`}
        >
          Code
        </button>
        <button onClick={() => editor.chain().focus().unsetAllMarks().run()}   className={`  bg-amber-100 px-2 py-3 cursor-pointer`}>
          Clear marks
        </button>
        <button onClick={() => editor.chain().focus().clearNodes().run()} className={`  bg-amber-100 px-2 py-3 cursor-pointer`}>
          Clear nodes
        </button>
        <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={`${editor.isActive('paragraph') ? 'is-active' : ''} bg-amber-100 px-2 py-3 cursor-pointer`}
        >
          Paragraph
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`${editor.isActive('heading', { level: 1 }) ? 'is-active' : ''} bg-amber-100 px-2 py-3 cursor-pointer`}
        >
          H1
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`${editor.isActive('heading', { level: 2 }) ? 'is-active' : ''} bg-amber-100 px-2 py-3 cursor-pointer`}
        >
          H2
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`${editor.isActive('heading', { level: 3 }) ? 'is-active' : ''} bg-amber-100 px-2 py-3 cursor-pointer`}
        >
          H3
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
          className={`${editor.isActive('heading', { level: 4 }) ? 'is-active' : ''} bg-amber-100 px-2 py-3 cursor-pointer`}
        >
          H4
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
          className={`${editor.isActive('heading', { level: 5 }) ? 'is-active' : ''} bg-amber-100 px-2 py-3 cursor-pointer`}
        >
          H5
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
          className={`${editor.isActive('heading', { level: 6 }) ? 'is-active' : ''} bg-amber-100 px-2 py-3 cursor-pointer`}
        >
          H6
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`${editor.isActive('bulletList') ? 'is-active' : ''}  bg-amber-100 px-2 py-3 cursor-pointer`}
        >
          Bullet list
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`${editor.isActive('orderedList') ? 'is-active' : ''} bg-amber-100 px-2 py-3 cursor-pointer`}
        >
          Ordered list
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`${editor.isActive('codeBlock') ? 'is-active' : ''}  bg-amber-100 px-2 py-3 cursor-pointer`}
        >
          Code block
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`${editor.isActive('blockquote') ? 'is-active' : ''}  bg-amber-100 px-2 py-3 cursor-pointer`}
        >
          Blockquote
        </button>
        <button onClick={() => editor.chain().focus().setHorizontalRule().run()}  className={`  bg-amber-100 px-2 py-3 cursor-pointer`}>
          Horizontal rule
        </button>
        <button onClick={() => editor.chain().focus().setHardBreak().run()}  className={`  bg-amber-100 px-2 py-3 cursor-pointer`}>
          Hard break
        </button>
        <button
         className={`  bg-amber-100 px-2 py-3 cursor-pointer`}
          onClick={() => editor.chain().focus().undo().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .undo()
              .run()
          }
        >
          Undo
        </button>
        <button
         className={`  bg-amber-100 px-2 py-3 cursor-pointer`}
          onClick={() => editor.chain().focus().redo().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .redo()
              .run()
          }
        >
          Redo
        </button>
        <button

          onClick={() => editor.chain().focus().setColor('#958DF1').run()}
          className={editor.isActive('textStyle', { color: '#958DF1' }) ? 'is-active' : ''}
        >
          Purple
        </button>
        <button onClick={()=>handleUpdateDocs(editor.getJSON())} className="absolute top-2 left-4 bg-black  text-white rounded-md text-md px-3 py-1 mb-2">Save </button>
        
      </div>
      <button className="absolute top-3 right-3 text-blue-300">{editor.storage.characterCount.words()} words</button>
    </div>
  )
}

const extensions = [
 
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] }),
  CharacterCount.configure({
// limit
  }),
  
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  
  }),
]

const content = ``

export default function EditorProviderComponent({initalContent}) {
    // console.log(initalContent,"initial content")
    const [propcontent,setContent]=useState(initalContent[0].content)
  return (<div className="min-h-[80vh] mt-10 ">

    <EditorProvider slotBefore={<MenuBar />} editorProps={{attributes:  {class:"bg-red-500 max-w-[1000px] mx-auto px-4 py-2"}}
    } autofocus={true} immediatelyRender={false} extensions={extensions} content={propcontent || content}></EditorProvider>


    {/* <Button onClick={()=>console.log(editor ? editor.getHTML(): "no editor")}>Give me HTML</Button> */}
  </div>
  )
}