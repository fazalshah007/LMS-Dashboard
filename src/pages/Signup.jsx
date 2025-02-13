import React, { useState } from 'react'
import { Button, Checkbox, FormControlLabel, TextField } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from '../firebaseConfig'

const Signup = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const signUpUserWithEmailAndPassword = () => {
    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    navigate('/login', {replace:true})
    
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    
    // ..
  });
  }

  const navigate = useNavigate()
  return (
    <>
    <div className='w-full h-screen grid place-items-center'>
      <div style={{ boxShadow: '1px 0px 20px -8px rgba(0,0,0,0.75)' }} className='w-96 p-4  rounded'>
       <div className='text-center'>
        <h1 className='text-2xl font-semibold  text-gray-700 uppercase'>Sign Up</h1>

       <div className='mt-8 '>
     
      <div className="mt-6">
      <TextField
       className='w-2xs inline-block'
          id="standard-password-input"
          label="username"
          type="email"
        //   autoComplete="current-password"
          variant="standard"
        />
      </div>

      <div className="mt-6">
      <TextField
      onChange={(e) => {
        setEmail(e.target.value)
      }}
       className='w-2xs inline-block '
          id="standard-password-input"
          label="email"
          type="email"
        //   autoComplete="current-password"
          variant="standard"
        />
      </div>
        
        <div className="mt-6">
        <TextField
         onChange={(e) => {
          setPassword(e.target.value)
        }}
       className='w-2xs inline-block'
          id="standard-password-input"
          label="password"
          type="password"
        //   autoComplete="current-password"
          variant="standard"
        />
        </div>

        {/* button  */}
        <div className='mt-2 ml-8 text-start'>

        <FormControlLabel control={<Checkbox />} label="Remember Me" />
        
        </div>
        <div className='mt-8 mb-8'>

        <Button 
        onClick={() => { signUpUserWithEmailAndPassword() }}
        className='w-2xs'
        variant="contained">Sign up</Button>
        </div>

        <div className='mt-4 mb-8'>

        <p className='text-xs'>Already have an Account? <Link to='/login' className='underline text-blue-600' >click here</Link> </p>
        </div>



       </div>

      

       </div>
      </div>

    </div>
    </>
  )
}

export default Signup