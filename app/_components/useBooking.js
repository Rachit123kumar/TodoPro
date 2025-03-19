import { QueryCache, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCurrentUser, getTodo, insertTodo } from "../_utils/actions";



// user ka data fetch nahi ho raha hai


export  function useGetUser(){




    const {isLoading,data,error}=useQuery({
        queryKey:["userInfo"],
        queryFn:async()=>{
          const res=await  getCurrentUser()    ;
          

       return res
        },
        retry:false,
      
    })

    return {isLoading,data,error}
}


// adhura hai
export function useaddTodo(){

    // useMutation({
    //     mutationFn:
    // })

    // const queryClient=useQueryClient();
    const  {isLoading:isDeleting,mutate:addTodo}=  useMutation({
        mutationFn:insertTodo,

    })

    return {isDeleting,addTodo}
}

export function useGetTodo(id) {
    return useQuery({
      queryKey: ["todo", id], // Include `id` in queryKey
      queryFn: async () => {
        if (!id) return null; // Prevents API call if `id` is undefined
        return getTodo(id);
      },
      enabled: !!id, // Ensures the query runs only when `id` is available
    });
  }