import mongoose, {Schema} from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        password: {
            type: String,
            required: true
        },

        avatar: {
            type: String
        },

        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],

        friendRequests: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],

        isAdmin: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
)

userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
});

const User = mongoose.model('User', userSchema);

export default User
