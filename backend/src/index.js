import express from 'express';
import dbConnection from './db/connection.js';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

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

dbConnection().then(()=>{
    app.listen(port, ()=>{
        console.log(`Listening on port ${port}`)
    })
}).catch(()=>{
    console.log("Mongodb connection failed")
})