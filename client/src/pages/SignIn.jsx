import React, { useState } from 'react'
// import { useState } from 'react';
// import Link from "react-router-dom"
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { Link,useNavigate } from 'react-router-dom'
import { signInStart,signInSuccess,signInFaliure } from '../redux/user/userSlice';
import {useDispatch, useSelector} from "react-redux"
const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData,setFormData] = useState({});
  // const [error,setError] = useState(false);
  // const [loading,setLoading] = useState(false)
  const {loading,error} = useSelector((state) => state.user)
  const handleChange = (e) =>{
    setFormData({
      ...formData,
      [e.target.id] : e.target.value
    })
  }
  const handleSubmit = async (e) =>{
    await e.preventDefault();
    try{
      dispatch(signInStart());

      const response = await fetch("api/auth/signin",{
        method : "POST",
        headers : {
          "Content-Type" : "application/json",
        },
        body : JSON.stringify(formData)
      });
      const data = await response.json();
      // console.log(data);
      dispatch(signInSuccess(data))
      // setError(false);
      if(data.success === false){
        dispatch(signInFaliure())
        toast.error(data.message,{
          origin : "center"
        })
        return;
      }
      navigate("/")
      toast.success(`Welcome back ${data.user.username}`)

    }
    catch(err){
      dispatch(signInFaliure(err))
    }

  }
  // console.log(formData)
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold'>
        Sign In
      </h1>
      <form action="" className='flex flex-col gap-4 my-7' onSubmit={handleSubmit}>
        <input type="email" placeholder='Email' id='email' className='bg-slate-100 p-3 rounded-lg' autoComplete='on'  onChange={handleChange}/>
        <input type="password" placeholder='Password' id='password' className='bg-slate-100 p-3 rounded-lg '  autoComplete='on' onChange={handleChange}/>
        <button disabled = {loading} className='bg-slate-700 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 text-white p-3 '>
          {loading ? `Loading...` : `Sign In`}
        </button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Don't have an account ?</p>
      <Link to= "/sign-up">
        <span className='text-blue-500 underline'>Sign up</span>
      </Link>

      </div>
      <p className='text-red-700 mt-5'>{error ? error.message || `Something went wrong !!!` : ''}</p>
    </div>
  )
}

export default SignIn
