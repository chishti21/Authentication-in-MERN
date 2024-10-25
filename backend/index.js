const express = require('express')
const app = express()
const port = 3001
const cors=require('cors')
require('./connection/connection')
const {UserRegister,LoginUser}=require('./Controller/Controller')
const {Authentication,authorizeRole}=require('./Controller/Authentication')
app.use(express.json())
app.use(cors({ origin: 'http://localhost:3000', credentials: true }))
const cookieParser = require('cookie-parser');

app.use('/register',UserRegister)
app.use('/login',LoginUser)
app.use(cookieParser());


app.get('/admin',Authentication,authorizeRole,(req,res)=>{
  res.send(`Hello ${req.user.role}, you have access to this admin route.`);
})
// for normal user
app.get('/protected',Authentication,(req,res)=>{
  res.send(`Hello ${req.user.role}, you have access to this protected route.`);
})



app.post('/logout',(req,res)=>{
  res.clearCookie('token',{httpOnly:true,secure:false,sameSite:'strict'})
  res.send('sucessfull')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
