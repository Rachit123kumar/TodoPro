"use client";
import { getDocs } from "@/app/_utils/actions";
import React, { useEffect, useState } from "react";

import { useParams } from "next/navigation";
import { EditorProvider } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export default function VieWDocs() {
    // const [loading, setLoading] = useState(true);
    const [data, setData] = useState("");
    const params = useParams();
    const id = params.id;

    useEffect(() => {
        async function fetchDocs() {

            const res = await getDocs(id)
            setData(res[0].content)
        }

        fetchDocs();

    }, [id]);



    return (
        <div>
            <h2>Rendered Content:</h2>
            {!data ? (
                <p>Loading...</p>
            ) : 
           (<section>
                    
                        <EditorProvider  editorProps={{attributes:  {class:"bg-red-500 max-w-[1000px] mx-auto px-4 py-2"}}
                        } autofocus={true} immediatelyRender={false} extensions={[StarterKit]} editable={false} content={ data}></EditorProvider>
                </section>
            )}
        </div>
    );
}



