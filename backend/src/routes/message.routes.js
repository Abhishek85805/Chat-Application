import { Router } from "express";
import { addMessage, getMessages } from "../controllers/message.controllers.js";
import verifyJWT from "../middlewares/auth.middleware.js";

const router = Router();

router.route('/add-message').post(verifyJWT, addMessage);
router.route('/get-messages').post(verifyJWT, getMessages);

export default router;