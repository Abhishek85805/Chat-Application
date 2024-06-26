import {Router} from 'express';
import { register, login, searchUser, currentUser, request, requestAccepted, requestRejected, unFriend } from "../controllers/user.controller.js";
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
router.route("/search-user").post(verifyJWT, searchUser);
router.route("/current-user").get(verifyJWT, currentUser);
router.post('/request', verifyJWT, request);
router.post('/request-accepted', verifyJWT, requestAccepted);
router.post('/request-rejected', verifyJWT, requestRejected);
router.post('/un-friend', verifyJWT, unFriend);

export default router;

