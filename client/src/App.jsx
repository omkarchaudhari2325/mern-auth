import React from 'react'
import { BrowserRouter , Routes ,Route } from 'react-router-dom'
import Home from "./pages/Home"
import About from './pages/About'
import SignIn from './pages/Signin'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'
import Header from './components/Header'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  return (
  <BrowserRouter>

  <Header/>
    <Routes>
      <Route path='/' element = {<Home/>} />
      <Route path='/about' element = {<About/>} />
      <Route path='/sign-in' element = {<SignIn/>} />
      <Route path='/sign-up' element = {<SignUp/>} />
      <Route path='/profile' element = {<Profile/>} />
    </Routes>
  <ToastContainer />
  </BrowserRouter>
  )
}

export default App
