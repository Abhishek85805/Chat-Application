import express from 'express';
import dbConnection from './db/connection.js';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import {Server as SocketIo} from 'socket.io';
import http from 'http';

const app = express();

const port = process.env.PORT || 3000;
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true, limit: "16kb"}));
app.use(express.static("public"));
app.use(cookieParser());

import userRouter from './routes/user.routes.js';
app.use('/api/user', userRouter);

import chatRouter from './routes/chat.routes.js';
app.use('/api/chat', chatRouter);

import messageRouter from './routes/message.routes.js';
app.use('/api/message', messageRouter);


const server = http.createServer(app);
const io = new SocketIo(server, {
    pingTimeout: 60000,
    cors: {
      origin: "http://localhost:5173",
    },
});

io.on("connection", (socket) => {
    console.log("Connected to socket.io")

    socket.on('setup', (userData) => {
        socket.join(userData?._id);
        console.log(userData?._id);
        socket.emit("connected");
    });

    socket.on('join chat', (room) => {
        socket.join(room);
        console.log("User joined room: " + room);
    });

    socket.on('new message', (newMessageRecieved) => {
        let chat = newMessageRecieved.chat;

        if(!chat.users) return console.log("chat.users not defined");

        chat.users.forEach(user => {
            if(user._id == newMessageRecieved.sender._id) return;
            socket.in(user._id).emit("message recieved", newMessageRecieved);
        });
    })
})

dbConnection().then(()=>{
    server.listen(port, ()=>{
        console.log(`Listening on port ${port}`)
    })
}).catch(()=>{
    console.log("Mongodb connection failed")
})