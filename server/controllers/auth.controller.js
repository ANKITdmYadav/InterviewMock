import User from "../models/user.model.js"
import genToken from "../config/token.js"
import bcrypt from 'bcrypt'



export const googleAuth = async (req,res)=>{
    try {
        const {name,email}=req.body
        let user=await User.findOne({email})
        if(!user){
            user=await User.create({
                name,
                email
            })
        }

        let token=await genToken(user._id)
        console.log(token)
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000 
        })

        return res.status(200).json(user)

    } catch (error) {
        return res.status(500).json({message:`Google auth error ${error}`})
    }
}

export const userRegister = async (req,res)=>{
    try {
        const {name,email,password}=req.body
        let user=await User.findOne({email})
        if(user) return res.status(400).json({message:"User alredy exists"})
        const hashed = await bcrypt.hash(req.body.password,12);
        const doc=await User.create({...req.body, password:hashed})
        const token=await genToken(doc._id)
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000 
        })

        res.status(200).json({message:"User Registered"})
    } catch (error) {
        return res.status(500).json({message:`User Register error ${error}`})
    }
}

export const UserLogin = async(req,res)=>{
    try {
        const user = await User.findOne({email: req.body.email})
        if (!user || !user.password) return res.status(404).json({message:"Invalid credentials"})
        const match=await bcrypt.compare(req.body.password,user.password)
        if(!match) return res.status(404).json({message:"Invalid credentials"})
        const token = await genToken(user._id,'User')
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        res.status(200).json(user,"User Registered")

    } catch (error) {
        return res.status(500).json({message:`Login error ${error}`})
    }
}

export const logOut = async(req,res)=>{
    try {
        await res.clearCookie("token")
        return res.status(200).json({message:"LogOut successfully"})
    } catch (error) {
        return res.status(500).json({message:`Logout error   ${error}`})
    }
}