"use client"

import React, { use, useEffect, useState } from 'react'
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
function signupPage() {

  const router=useRouter()
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
router.push('/login')

  } catch (error:any) {
    console.log("signup failed");
    toast.error(error.message)
    
  }
}

useEffect(()=>{
  if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
    setButtondisabled(false)
  }
  else{
    setButtondisabled(true)
  }
})

  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
     <h1>{loading?"processing":"Signup"}</h1>
     <hr/>
     <label htmlFor='username'>username</label>
     <input
     id='username'
     value={user.username}
     onChange={(e)=>setUser({...user, username:e.target.value})}
     type='text'
     >
     </input>
    </div>
  )
}

export default signupPage