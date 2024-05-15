"use client"

import React, { useState } from 'react'
import axios from 'axios';
import { toast } from 'react-hot-toast';
function signupPage() {
const [user,setUser]=useState({
  email:"",
  password:"",
  username:""
})

const [buttonDisabled,setButtondisabled]=useState(false);
const [loading,setLoading]=useState(false)

const onSignup=async()=>{
  try {
    setLoading(true);
   const response:any= await axios.post("/api/users/signup",user)
console.log("signup success",response.data);

  } catch (error:any) {
    console.log("signup failed");
    toast.error(error.message)
    
  }
}

  return (
    <div>page</div>
  )
}

export default signupPage