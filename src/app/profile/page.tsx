'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation';

import React, { useState } from 'react'

function userProfile() {
const [user,setUser]=useState({
    email:""
});
 
const route=useRouter()


     const profile=async()=>{
        try {
             axios.post('api/users/me',user)
route.push("/verifyemail")
        } catch (error) {
            console.log(error);
            
        }
     }
   

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
   
   
    <label htmlFor="email">email</label>
        <input 
        placeholder='email'
        id='email'
        type="text"
        value={user.email}
        onChange={(e) => setUser({...user, email: e.target.value})}
        />
        <button
        onClick={profile}
        >click</button>
    </div>
  )
}

export default userProfile