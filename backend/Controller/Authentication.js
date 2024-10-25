const jwt = require('jsonwebtoken');
const Scret_Key = 's0m3$uP3r#S3cr3tK3y'; // Your secret key
const cookieParser = require('cookie-parser');
const express = require('express')
const app = express()
app.use(express.json())
app.use(cookieParser()); 

const Authentication=(req,res,next)=>{
    const token=req.cookies.token

    if(!token)
    {
        return res.send("token is missing")
    }

    jwt.verify(token,Scret_Key,(err,user)=>{
        if (err) {
            return res.status(403).send("Invalid or expired token");
        }
        req.user = user; // Save the token data to req.user for use in other routes
        next();
    })
}


// Middleware to check user role
const authorizeRole = (role) => {
    return (req, res, next) => {
        if (req.user.role !== role) {
            return res.status(403).send("Access denied: You do not have the required privileges.");
        }
        next();
    };
};


module.exports={Authentication,authorizeRole}