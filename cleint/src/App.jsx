
import React, { useEffect, useMemo, useState } from 'react';
import { io } from 'socket.io-client';
import "./App.css";

function App() {
  const [message,setMessage]=useState([])
  const [socketId,setSocketId] = useState('')

  // Connect client to the server
  // socket = cleint

  const socket = useMemo(()=> io("http://localhost:3000"),[]);
  
  const handleSubmit=(e)=>{
    e.preventDefault()
    const message = e.target[0].value
    const reciever = e.target[1].value
    socket.emit("message",{
      message,
      reciever
    })
  }
  useEffect(() => {

    socket.on("connect", () => {
      console.log("Connected to the server");
      setSocketId(socket.id)
    });

    socket.on("forward",(data)=>{
       console.log(data)
       setMessage((prev)=>[...prev , data.message])
    })

  }, []);

  return (
    <>
      <h1>Socket App</h1>
      <p>{socketId}</p>

      <form className="message" onSubmit={handleSubmit}>
        <input type="text" placeholder='please enter your message '/>
        <input type="text" placeholder='enter reciever ID '/>
         <button type='submit'>send message </button>
      </form>


      <div className='messages'>
        {
          message.map((message,index)=>{
             return <div key={index} className='app-message'>
              {message}
             </div>
          })
        }
      </div>
    </>
  );
}

export default App;
