
import axios from "axios";
import { supabase } from "./meon";
import { toast } from "react-toastify";
import { ownerDocument } from "@mui/material";

async function checkUser(email) {
  const { data: profiles, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("email", email);

  if (error) {
    console.error("Error fetching user:", error);
    return { profiles: [], error }; // Always return an object
  }

  // console.log("Found profiles:", profiles);
  return { profiles };
}

export async function signup(email, password) {
  const result = await checkUser(email);

  if (!result || !("profiles" in result)) {
    toast("An error occurred. Please try again.");
    return;
  }

  const { profiles } = result;

  if (profiles.length > 0) {
    toast("Please login, you have already created your account.");
    return;
  }

  const { data, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (signUpError) {
    toast("Signup failed. Please try again.");
    console.error(signUpError);
    return {data:"",error:"failed to signup"}
  }

  toast("Signup successful. Welcome!");
  
  return { data, error: signUpError };
}


export async function getCurrentUser() {


  try {

    const { data: { user } } = await supabase.auth.getUser()
    return user
  } catch (err) {
    return (err.message)
  }


}

export async function login(email, password) {

  let { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password
  })

  return { data, error }

}

export async function logout() {

  let { error } = await supabase.auth.signOut()
  return { error }
}

export async function insertTodo({name, description, status, due_date, priority, category, userId}) {
console.log(name, description, status, due_date, priority, category, userId, "from insert Todo")
  const { data, error } = await supabase
    .from('todo')
    .insert([
      { name, description, status, due_date, priority, category, userId },
    ])
    .select()


    if(error){
      throw new Error("Error while creating your todo")
    }


  return data

}


export async function getTodo(userId) {


  const { data: todo, error } = await supabase
    .from('todo')
    .select("*")

    // Filters
    .eq("userId", userId)

  if (error) {
    return error
  }
  return { todo }

}


export async function updateTodo({priority, status, name, description, due_date, category, id}) {
// console.log(id)
  const { data, error } = await supabase
    .from('todo')
    .update({"priority": priority, "status":status,"name": name,"description": description, "due_date":due_date, "category":category })
    .eq("id",id)
    .select()
    // .order("created_at", { ascending: false }); 


  if (error) {
    throw new Error(error.message);
  }
  return { data }


}

export async function deleteTodo(id){
// console.log(id)
  
const { error } = await supabase
.from('todo')
.delete()
.eq('id', id)
if(error){
  throw new Error(err)
  
}
return "success"
        
}



export async function insertDocs(title,owner_id){
  
const { data, error } = await supabase
.from('docs')
.insert([
  {  "owner_id": owner_id, "title":title },
])
.select()
        

if(error){
  throw new Error("error while creating your docs")
  return error
}
return data
}


// update Todo
export async function updateDocs(id,content){
  const { data, error } = await supabase
  .from('docs')
  .update([
    {  "content": content},
  ])
  .select()
  .eq("id",id)

  if(error){
    throw new Error("Error while updateing DAta")
  }
     
  return data
}


export async function getDocs(id){
  
let { data: docs, error } = await supabase
.from('docs')
.select('*')
.eq("id",id)
if(error){
  return error
}
return docs

}
export async function getDocsByOwnerId(id){
  
  let { data: docs, error } = await supabase
  .from('docs')
  .select('*')
  .eq("owner_id",id)
  if(error){
    return error
  }
  return docs
}

export async function checkDocsOwner(docsId,ownerId){
  console.log(docsId,ownerId,"from checkdocsOwner")
  const { data, error } = await supabase
  .from('docs')
  
  .select("*")
  .eq("id",docsId)
  .eq("owner_id",ownerId)



  if(error){
    throw new Error("Error while checking userDocsOwner")
  }
  return data



}


export async function fetchFriends(userId){

  const  { data: friends, error } = await supabase
  .from('friends')
  .select("*")

  // Filters
  .eq('user_id', userId)
console.log(friends)
return friends
          
}

export   async function sendMessage(msg,userId,friend_id){
  
const { data, error } = await supabase
.from('messsages')
.insert([
  { receiver_id: friend_id, sender_id: userId ,message:msg},
])
.select()

if(!error){
  toast("sucess data sended")
}
return 
        

}

export async function getMessages(userId,friendId){
    
  // let { data: messsages1, error1 } = await supabase
  // .from('messsages')
  // .select("*")

  // // Filters
  // .eq("sender_id", userId)
  // .eq("receiver_id",friendId)
    
  // let { data: messsages2, error2 } = await supabase
  // .from('messsages')
  // .select("*")

  // // Filters
  // .eq("sender_id", friendId)
  // .eq("receiver_id",userId)

  // if(!error1 && !error2){
  //   return {messsages1 , messsages2}
  // }






    const { data, error } = await supabase
      .from("messsages") // your table name
      .select("*")
      .or(`and(sender_id.eq.${userId},receiver_id.eq.${friendId}),and(sender_id.eq.${friendId},receiver_id.eq.${userId})`)
      .order("created_at", { ascending: true });
  
    if (error) {
      console.error("Error fetching messages:", error);
      return [];
    }
  
    return data;
  }
  
 export const changes = supabase
  .channel('schema-db-changes')
  .on(
    'postgres_changes',
    {
      schema: 'public', // Subscribes to the "public" schema in Postgres
      event: '*',       // Listen to all changes
    },
    (payload) => console.log(payload)
  )
  .subscribe()
  

  export async function signOut() {
    const { error } = await supabase.auth.signOut()
    if(!error){
      throw new Error("Error while sign out")
    }
  }