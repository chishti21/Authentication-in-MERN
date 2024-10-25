const mongoose=require('mongoose')

const User=mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        ennm:['user','admin'],
        required:true,
    }
})

const user=mongoose.model('User',User)
module.exports=user