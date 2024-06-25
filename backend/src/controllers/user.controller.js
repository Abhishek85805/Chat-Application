import asyncHandler from '../utils/asyncHandler.js';
import User from '../models/user.model.js';
import uploadOnCloudinary from '../utils/cloudinary.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const register = asyncHandler(async(req, res) => {
    const {username, email, password} = req.body;

    if([username, email, password].some(field => field === undefined || field.trim()==="")){
        return res.status(400).json({
            message: "All the fields are required"
        })
    }

    const existedUser = await User.findOne({
        $or: [{username}, {email}]
    });

    if(existedUser){
        return res.status(409).json({
            message: "User with same email or username already exist"
        })
    }

    let avatarImagePath;
    if(req.files && Array.isArray(req.files.avatar) && req.files.avatar.length > 0){
        avatarImagePath = req.files.avatar[0].path;
    }
    const avatar = await uploadOnCloudinary(avatarImagePath);
    console.log(avatar);

    const user = await User.create({
        username,
        email,
        password,
        avatar: avatar?.url || ""
    })

    const createdUser = await User.findById(user._id).select("-passowrd");

    if(!createdUser){
        return res.status(500).json({
            message: "Something went wrong while regestering user"
        })
    }

    return res.status(201).json({
        data: createdUser,
        message: "User registered successfully"
    })
})

const login = asyncHandler(async(req, res) => {
    const {email, password} = req.body;

    if([email, password].some(field => field === undefined || field.trim() === "")){
        return res.status(400).json({
            message: "All the fields are required"
        })
    }

    const user = await User.findOne({email});
    if(!user){
        return res.status(404).json({
            message: "User doesn't exist"
        })
    }

    //Checking password
    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if(!isPasswordCorrect){
        return res.status(401).json({
            message: "Invalid user credentials"
        })
    }

    //Creating token
    const token = jwt.sign(
        {
            _id: user._id
        },
        process.env.SECRET_TOKEN
    )

    //returning final response
    return res.status(200)
    .cookie('token', token)
    .json({
        data: user,
        token,
        message: "User logged in successfully"
    })
})

const searchUser = asyncHandler(async(req, res) => {
    const {username} = req.body;

    //if username is empty 
    if(username === undefined || username.trim() === ""){
        return res.status(400).json({
            message: "Username is required"
        })
    }

    //if username doesn't exist
    const user = await User.findOne({username});
    if(!user){
        return res.status(404).json({
            message: "User with given username doesn't exist"
        })
    }

    return res.status(200).json({
        data: user,
        message: "User searched successfully"
    })
})

const currentUser = asyncHandler(async(req, res) => {
    const user = req.user;

    res.status(200).json({
        data: user,
        message: "User fetched successfully"
    })
})

export {
    register,
    login,
    searchUser,
    currentUser
}