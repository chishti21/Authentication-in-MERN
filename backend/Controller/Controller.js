const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const app = express()
const User = require('../models/User'); // Ensure this model is named 'User' if that's your schema name
const jwt=require('jsonwebtoken')
const cookieParser=require('cookie-parser')
const Scret_Key='s0m3$uP3r#S3cr3tK3y'

app.use(cookieParser())

// Define the route
const UserRegister=async(req,res)=>{
    try {
        const { name, email, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role
        });
        await newUser.save();
        res.send("register successful");
    } catch (err) {
        console.log(err);
        res.status(500).send("An error occurred");
    }
}

// login
const LoginUser=async(req,res)=>{
    try{
        const {email,password}=req.body
        const user=await User.findOne({email:email})
        if(!user)
        {
            return res.send("user not found1")
        }
        const isMatch=await bcrypt.compare(password,user.password)
        if (!isMatch)
        {
            return res.send("invalid credentials")
        }

        // generate token
        const token=jwt.sign({ userId: user._id, role: user.role }, Scret_Key, { expiresIn: '1h' })

        //setting cookie
        res.cookie('token',token,{
            httpOnly:true,
            secure:process.env.NODE_ENV==='production',
            maxAge:3600000
        })
        res.json({message:"login sucessfull",token:token})
    }catch(err)
    {
        console.log(err)
        res.status(500).send("An error Occured")
    }

}

module.exports={UserRegister,LoginUser};
