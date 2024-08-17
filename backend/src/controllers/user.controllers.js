import asyncHandler from 'express-async-handler';
import User from '../models/user.model.js';
import jwt from 'jsonwebtoken'
import uploadOnCloudinary from '../utils/cloudinary.js';

const generateJwtToken  = (user_id) => {
    return jwt.sign(
        {
            _id: user_id
        },
        process.env.TOKEN_SECRET,
        {
            expiresIn: process.env.TOKEN_EXPIRY
        }
    )
}

const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body;

    if([name, email, password].some(field => field.trim()==="")){
        res.status(400);
        throw new Error("Please enter all the fields");
    }

    const userExist = await User.findOne({email});
    if(userExist){
        res.status(401);
        throw new Error("User already exists");
    }

    let avatarImagePath;
    if(req.files && Array.isArray(req.files.avatar) && req.files.avatar.length > 0){
        avatarImagePath = req.files.avatar[0].path;
    }
    const avatar = await uploadOnCloudinary(avatarImagePath);

    const user = await User.create({
        name, 
        email, 
        password, 
        avatar: avatar?.url || ""
    });

    if(!user){
        res.status(500)
        throw new Error("Something went wrong");
    }

    res.status(201).json({
        name,
        email,
        password,
        avatar: user.avatar,
        token: generateJwtToken(user._id)
    })
})

const loginUser = asyncHandler(async(req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({email});

    if(!user){
        res.status(404);
        throw new Error("User doesn't exist")
    }

    const isPasswordCorrect = await user.matchPassword(password);
    if(!isPasswordCorrect){
        res.status(401);
        throw new Error("Invalid email or password");
    }

    const token = generateJwtToken(user._id);

    res.status(200)
    .cookie('token', token)
    .json({
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        token: token
    })
})

const allUsers = asyncHandler(async (req, res) => {
    const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
    res.send(users);
});

const currentUser = asyncHandler(async(req, res) => {
    const userId = req.user._id;
    const user = await User.findOne(userId);

    return res.status(200).json(user);
})


export {
    registerUser,
    loginUser,
    allUsers,
    currentUser
}