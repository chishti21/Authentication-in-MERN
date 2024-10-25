import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [email,setemail]=useState()
  const [password,setpassword]=useState()
  const navigate=useNavigate()

  const SubmitHandler=(e)=>{
    e.preventDefault()
    axios.post('http://localhost:3001/login',{email,password},{withCredentials:true})
    .then((response)=>{
      navigate('/home')
    }).catch((err)=>{
      alert(err)
    })
  }
  return (
    <div>
      login page
      <form onSubmit={SubmitHandler}>
        <label>Email:</label>
        <input type='email' placeholder='enter your email'></input><br></br>
        <label>Paasword:</label>
        <input type='password' placeholder='enter your password'></input><br></br>
        <button type='submit'>submit</button>
      </form>
    </div>
  )
}
