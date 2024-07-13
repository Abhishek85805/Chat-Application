import asyncHandler from '../utils/asyncHandler.js';
import User from '../models/user.model.js';
import uploadOnCloudinary from '../utils/cloudinary.js';
import bcrypt from 'bcryptjs'
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
});

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
});

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

    //Check if user with given username is friend with current user
    const currentUser = await User.findById(req.user?._id);
    const isFriend = currentUser.friends.includes(user._id);

    return res.status(200).json({
        data: user,
        isFriend,
        message: "User searched successfully"
    })
});

const currentUser = asyncHandler(async(req, res) => {
    const user = req.user;

    res.status(200).json({
        data: user,
        message: "User fetched successfully"
    })
});

const request = asyncHandler(async(req, res) => {
    const user = req.user;

    const requesterId = user._id;
    const {recipientId} = req.body

    //If recipient Id is not there
    if(!recipientId){
        return res.status(400).json({
            message: "Recipient Id is required"
        })
    }

    //If requesterId is already present in friendRequests of recipient
    const recipient = await User.findById(recipientId);
    if(recipient.friendRequests.includes(requesterId)){
        return res.status(409).json({
            message: "Request sent already"
        })
    }

    //Add request in friendRequest List of recipient
    recipient.friendRequests.push(requesterId);
    recipient.save({validationBeforeSave: true});

    return res.status(201).json({
        message: "Friend Request has been sent successfully"
    })
});

const requestAccepted = asyncHandler(async(req, res) => {
    const currentUserId = req.user._id;
    const {requesterId} = req.body;

    if(!requesterId){
        return res.status(400).json({
            message: "Requester Id is required"
        })
    }

    //remove from the friendRequests array and add in friend array
    const user = await User.findById(currentUserId);
    const index = user.friendRequests.indexOf(requesterId);
    user.friendRequests.splice(index, 1);
    user.friends.push(requesterId);
    user.save({validationBeforeSave: true});

    //add friend in the requester's friends list and remove current user for requester's friendRequests list if present
    const requester = await User.findById(requesterId);
    if(requester.friendRequests.includes(currentUserId)){
        const indi = requester.friendRequests.indexOf(currentUserId);
        requester.friendRequests.splice(indi, 1);
    }
    requester.friends.push(currentUserId);
    requester.save({validateBeforeSave: true});


    return res.status(200).json({
        message: "Request accepted successfully"
    })
});

const requestRejected = asyncHandler(async(req, res) =>{
    const currentUserId = req.user._id;
    const {requesterId} = req.body;

    if(!requesterId){
        return res.status(400).json({
            message: "Requester Id is required"
        })
    }

    //remove from the friendRequests array
    const user = await User.findById(currentUserId);
    const index = user.friendRequests.indexOf(requesterId);
    user.friendRequests.splice(index, 1);
    user.save({validationBeforeSave: true});

    return res.status(200).json({
        message: "Request rejected successfully"
    })
});

const friendRequests = asyncHandler(async(req, res) => {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    // Find the details of users who sent friend requests
    const friendRequestDetails = await User.find({
        _id: { $in: user.friendRequests }
    });

    res.status(200).json({
        data: friendRequestDetails,
        message: "Friend requests fetched successfully"
    });
});

const unFriend = asyncHandler(async(req, res) => {
    const userId = req.user._id;
    const {friendId} = req.body;

    const user = await User.findById(userId);
    let index = user.friends.indexOf(friendId);
    user.friends.splice(index, 1);
    user.save({validateBeforeSave: true});

    const friend = await User.findById(friendId);
    index = friend.friends.indexOf(userId);
    friend.friends.splice(index, 1);
    friend.save({validateBeforeSave: true});

    return res.status(200).json({
        message: "User removed from your friend list successfully"
    })
});

const allFriends = asyncHandler(async(req, res) => {
    const userId = req.user._id;
    const result = await User.aggregate([
        {$match: {_id: userId}},
        {
            $lookup: {
                from: 'users',
                localField: 'friends',
                foreignField: '_id',
                as: 'friendsInfo'
            }
        }
    ])

    res.status(200).json({
        data: result,
        message: 'Friends fetched successfully'
    })
})

export {
    register,
    login,
    searchUser,
    currentUser,
    request,
    requestAccepted,
    requestRejected,
    unFriend,
    allFriends,
    friendRequests
}