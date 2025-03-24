const url="ws://localhost:3000"
let socket=null
export function getSocket(){


    if(!socket){

        let mySocket=new WebSocket(url)

        mySocket.onopen=(ws)=>{
            mySocket.send(JSON.parse({type:"register",userId:"1"}))
            
        }

        mySocket.onclose=()=>{
            mySocket=null
        }
        mySocket.onerror=()=>{
            mySocket=null
        }

        return mySocket

    }

   
}