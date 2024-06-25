import {Router} from 'express';
import { register, login, searchUser, currentUser } from "../controllers/user.controller.js";
import { upload } from '../middlewares/multer.middleware.js';
import verifyJWT from '../middlewares/auth.middleware.js';

const router = Router();

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        }
    ]),
    register
);
router.route("/login").post(login);
router.route("/search-user").post(searchUser);
router.route("/current-user").get(verifyJWT, currentUser);


export default router;

