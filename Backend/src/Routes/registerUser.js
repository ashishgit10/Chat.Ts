import { Router } from "express";
import { Signup, Login } from "../controllers/User.controller.js";
import getAllUsers from "../controllers/getAllUsers.js";
import verifyToken from "../Middleware/AuthCheck.js";
import { accessChat, addMember, createGroupChat, deleteMember, fetchChat, RenameGroup } from "../controllers/ChatController.js";

const router = Router();

router.post('/signup', Signup)
router.post('/login', Login)
router.get('/', verifyToken, getAllUsers)


//Chat Routes
router.post('/accesschat', verifyToken, accessChat)
router.get('/fetchchat', verifyToken, fetchChat)
router.post('/createGroupChat', verifyToken, createGroupChat)
router.put('/renamegroup', verifyToken, RenameGroup)
router.put('/addmember', addMember)
router.put('/removemember', deleteMember)


export default router