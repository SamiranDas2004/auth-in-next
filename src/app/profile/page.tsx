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
   
   
   <h1 className='text-bold text-3xl'>Success</h1>
    </div>
  )
}

export default userProfile