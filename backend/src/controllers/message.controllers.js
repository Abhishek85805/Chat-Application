import Message from "../models/message.model.js";
import asyncHandler from "../utils/asyncHandler.js";

const addMessage = asyncHandler(async(req, res) => {
    const {to, message} = req.body;
    const from = req.user._id;

    if([to, message].some(field => field === undefined || field.trim() === "")){
        return res.status(400).json({
            message: "All the fields are required"
        })
    }

    const data = await Message.create({
        message,
        users: [from, to],
        sender: from
    });

    if(!data){
        return res.status(500).json({
            message: "Something went wrong while adding message to database"
        })
    }

    return res.status(201).json({
        message: "Message added successfully"
    })
});

const getMessages = asyncHandler(async(req, res) => {
    const {to} = req.body;
    const from = req.user._id;

    const allMessages = await Message.find({
        users: {$all: [from, to]}
    }).sort({updatedAt: 1});

    const myMessages = allMessages.map(msg => {
        return {
            fromSelf: msg.sender.toString() === from.toString(),
            sender: msg.sender,
            from: from,
            message: msg.message
        }
    })

    return res.status(200).json({
        data: myMessages,
        message: "Messages fetched successfully"
    })
})

export {
    addMessage,
    getMessages
}