import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dbConnection from './db/index.js';
import {Server} from 'socket.io';
import {createServer} from 'http'

const app = express();
const server = createServer(app);

dotenv.config();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true, limit: "16kb"}));
app.use(express.static("public"));

const port = process.env.PORT;

import userRouter from './routes/user.routes.js';
app.use("/api/user", userRouter);

import messageRouter from './routes/message.routes.js';
app.use("/api/message", messageRouter);

dbConnection()
.then(()=>{
    server.listen(port, ()=>{
        console.log(`Listen to the port ${port}`);
    });    
})
.catch((err)=>{
    console.log('MongoDB connection failed', err);
})

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        credentials: true
    }
});

global.onlineUsers = new Map();
io.on('connection', (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId)=>{
        onlineUsers.set(userId, socket.id);
    })

    socket.on("send-msg", (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if(sendUserSocket){
            socket.to(sendUserSocket).emit('msg-receive', data.msg);
        }
    })
})
