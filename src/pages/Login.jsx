import React, { useState } from 'react'
import { Button, Checkbox, FormControlLabel, TextField } from '@mui/material'
import { Link } from 'react-router-dom'
import { signInWithEmailAndPassword } from "firebase/auth";
import auth from '../firebaseConfig'

const Login = ({setIsLoggedIn}) => {


   const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const logInUserWithEmailAndPassword = () => {
      signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      localStorage.setItem("userID",`${user.uid}`)
      console.log(user);
      
      setIsLoggedIn(true)

      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      setIsLoggedIn(false)
      
      // ..
    });
    }

  return (
    <>
    <div className='w-full h-screen grid place-items-center'>
      <div style={{ boxShadow: '1px 0px 20px -8px rgba(0,0,0,0.75)' }} className='w-96 p-4  rounded'>
       <div className='text-center'>
        <h1 className='text-2xl font-semibold  text-gray-700 uppercase'>Login</h1>

       <div className='mt-8 '>
     
    

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
        <div className='mt-8'>

        <Button 
        onClick={() => { 
          logInUserWithEmailAndPassword() 
        }}
        className='w-2xs'
        variant="contained">Login</Button>
        </div>
        <div className='mt-4 mb-8'>

        <p className='text-xs'>Create an account? <Link to='/signup' className='underline text-blue-600' >click here</Link> </p>
        </div>



       </div>

      

       </div>
      </div>

    </div>
    </>
  )
}

export default Login