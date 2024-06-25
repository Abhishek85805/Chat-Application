import express, { urlencoded } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dbConnection from './db/index.js';

const app = express();

dotenv.config();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true, limit: "16kb"}));
app.use(express.static("public"));

const port = process.env.PORT;

import userRouter from './routes/user.routes.js';
app.use("/api/user", userRouter);

dbConnection()
.then(()=>{
    app.listen(port, ()=>{
        console.log(`Listen to the port ${port}`);
    });    
})
.catch((err)=>{
    console.log('MongoDB connection failed', err);
})

