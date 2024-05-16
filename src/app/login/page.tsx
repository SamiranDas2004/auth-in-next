"use client"
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState,useEffect } from 'react'

function loginPage() {

const route=useRouter()
  const [buttonDisabled,setButtonDisabled]=useState(false)

const [loading,setLoading]=useState(false)

    const [user,setUser]=useState({
      email:'',
      password:''
    })
const login=async()=>{
try {
  setLoading(true)
   await axios.post("/api/users/login",user);
   console.log("success");
   route.push('/profile')
} catch (error) {
  console.log(error);
  
}
finally{
  setLoading(false)
}
}

useEffect(() => {
  if(user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
  } else {
      setButtonDisabled(true);
  }

}, [user]);

useEffect(()=>{
  user.email="",
  user.password=""

},[loading])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
    <h1>{loading ? "Processing" : "logedin"}</h1>
    <hr />
   
    <label htmlFor="email">email</label>
    <input 
    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="email"
        type="text"
        value={user.email}
        onChange={(e) => setUser({...user, email: e.target.value})}
        placeholder="email"
        />
    <label htmlFor="password">password</label>
    <input 
    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => setUser({...user, password: e.target.value})}
        placeholder="password"
        />
        <button
        onClick={login}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">{buttonDisabled ? "No login" : "Login"}</button>
        <Link href="/signup">Visit signup</Link>
    </div>
  )
}

export default loginPage