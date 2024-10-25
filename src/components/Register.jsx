import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const [name,setname]=useState()
    const [email,setemail]=useState()
    const [password,setpassword]=useState()
    const [role,setrole]=useState()
    const navigate = useNavigate()
    const SubmitHandler=(e)=>{
        e.preventDefault()
        axios.post('http://localhost:3001/register',{name,email,password,role},{withCredentials:true})
        .then((response)=>
        {
            console.log(response.data)
            navigate('/login')
        }).catch((err)=>{
          alert('err')
            console.log(err)
        })
    }
  return (
    <div>
      <form onSubmit={SubmitHandler}>
        <label>Name:</label>
        <input type='text' placeholder='enter name' onChange={(e)=>setname(e.target.value)}></input><br></br>
        <label>Email:</label>
        <input type='email' placeholder='enter your email' onChange={(e)=>setemail(e.target.value)} ></input><br></br>
        <label>Password:</label>
        <input type='password' placeholder='enter password' onChange={(e)=>setpassword(e.target.value)}></input><br></br>
        <label>role:</label>
        <input type='text' placeholder='enter role' onChange={(e)=>setrole(e.target.value)}></input><br></br>
        <button type='submit'>submit</button>
      </form>
    </div>
  )
}
