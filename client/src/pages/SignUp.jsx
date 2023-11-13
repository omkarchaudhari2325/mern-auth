import React from 'react'
// import Link from "react-router-dom"
import { Link } from 'react-router-dom'
const SignUp = () => {
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold'>
        Sign Up
      </h1>
      <form action="" className='flex flex-col gap-4 my-7'>
        <input type="text" placeholder='Username' id='username' className='bg-slate-100 p-3 rounded-lg '  />
        <input type="email" placeholder='Email' id='email' className='bg-slate-100 p-3 rounded-lg'  />
        <input type="password" placeholder='Password' id='password' className='bg-slate-100 p-3 rounded-lg '  />
        <button className='bg-slate-700 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 text-white p-3 '>Sign Up</button>
      </form>
      <div className='flex gap-2 mt-5'>
      <Link to= "/sign-in">
        <p>Have an account</p>

      </Link>

      </div>
    </div>
  )
}

export default SignUp
