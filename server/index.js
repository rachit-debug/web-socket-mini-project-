import express from "express"
import {createServer} from "http"
import cors from "cors"
import { Server } from "socket.io"


const app = express()

const httpServer = createServer(app)

const corsOptions={
  origin:"*",
  methods : ["GET","POST","PUT","PATCH"]
}

app.use(cors(corsOptions));
app.use(express.json());


const io = new Server(
  httpServer,
  {
    cors: corsOptions
  }
)

io.on("connection",(socket)=>{
  console.log("new connection with id :", socket.id)

  socket.on("message",(data)=>{
    console.log(data.message)
    io.to(data.reciver).emit("forward",data)
  })
})

app.get("/",(req,res)=>{
  res.send("wellcome to chat app")
})

httpServer.listen(3000,()=>{
  console.log("app start at port 3000")
})
