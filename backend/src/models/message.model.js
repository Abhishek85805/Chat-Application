import mongoose, {Schema} from 'mongoose';

const messageSchema = Schema(
    {
        message: {
            type: String,
            required: true
        },

        users: [{
            type: Schema.Types.ObjectId,
            ref: "User"
        }],

        sender: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {
        timestamps: true
    }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;