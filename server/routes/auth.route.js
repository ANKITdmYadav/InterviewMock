import express from "express"
import { googleAuth, logOut, UserLogin, userRegister } from "../controllers/auth.controller.js"

const authRouter = express.Router()


authRouter.post("/google",googleAuth)
authRouter.post("/register",userRegister)
authRouter.post("/login",UserLogin)
authRouter.get("/logout",logOut)

export default authRouter