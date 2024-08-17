import {Router} from 'express';
import {
    accessChat,
    fetchChats,
    createGroupChat,
    renameGroup,
    addToGroup,
    removeFromGroup
} from '../controllers/chat.controllers.js'
import verifyJWT from '../middlewares/auth.middleware.js';


const router = Router();

router.route('/').post(verifyJWT, accessChat);
router.route('/').get(verifyJWT, fetchChats);
router.route('/group').post(verifyJWT, createGroupChat);
router.route('/rename').post(verifyJWT, renameGroup);
router.route('/groupremove').post(verifyJWT, removeFromGroup);
router.route('/groupadd').post(verifyJWT, addToGroup);

export default router;