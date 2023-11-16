import React, { useState } from 'react'
// import { useState } from 'react';
// import Link from "react-router-dom"
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { Link,useNavigate } from 'react-router-dom'
const SignUp = () => {
  const navigate = useNavigate();
  const [formData,setFormData] = useState({});
  const [error,setError] = useState(false);
  const [loading,setLoading] = useState(false)
  const handleChange = (e) =>{
    setFormData({
      ...formData,
      [e.target.id] : e.target.value
    })
  }
  const handleSubmit = async (e) =>{
    await e.preventDefault();
    try{
      setLoading(true);
      setError(false);
      const response = await fetch("api/auth/signup",{
        method : "POST",
        headers : {
          "Content-Type" : "application/json",
        },
        body : JSON.stringify(formData)
      });
      const data = await response.json();
      console.log(data);
      setLoading(false);
      // setError(false);
      if(data.success == false){
        setError(true);
        toast.error(data.message,{
          origin : "center"
        })
        return;
      }
      toast.success("Signup successfull")
      navigate("/sign-in");

    }
    catch(err){
      setLoading(false);
      setError(true);


    }

  }
  // console.log(formData)
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold'>
        Sign Up
      </h1>
      <form action="" className='flex flex-col gap-4 my-7' onSubmit={handleSubmit}>
        <input type="text" placeholder='Username' id='username' className='bg-slate-100 p-3 rounded-lg ' autoComplete='on'  onChange={handleChange}/>
        <input type="email" placeholder='Email' id='email' className='bg-slate-100 p-3 rounded-lg' autoComplete='on'  onChange={handleChange}/>
        <input type="password" placeholder='Password' id='password' className='bg-slate-100 p-3 rounded-lg '  autoComplete='on' onChange={handleChange}/>
        <button disabled = {loading} className='bg-slate-700 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 text-white p-3 '>
          {loading ? `Loading...` : `Sign Up`}
        </button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Already have an account ?</p>
      <Link to= "/sign-in">
        <span className='text-blue-500 underline'>Sign in</span>
      </Link>

      </div>
      <p className='text-red-700 mt-5'>{error && `Something went wrong !!!`}</p>
    </div>
  )
}

export default SignUp
