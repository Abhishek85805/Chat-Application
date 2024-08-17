import express from 'express';
import { registerUser, loginUser, allUsers, currentUser } from '../controllers/user.controllers.js';
import { upload } from '../middlewares/multer.middleware.js';
import verifyJWT from '../middlewares/auth.middleware.js';

const router = express.Router();

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        }
    ]),
    registerUser
);
router.route('/login').post(loginUser);
router.route('/current-user').get(verifyJWT, currentUser);
router.route('/').get(verifyJWT, allUsers);


export default router

