import { Router } from "express";
import { Signup, Login } from "../controllers/User.controller.js";

const router = Router();

router.post('/signup', Signup)
router.post('/login', Login)


export default router