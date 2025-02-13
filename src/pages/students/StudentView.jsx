import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { doc, getDoc } from "firebase/firestore";
import { firestore } from '../../firebaseConfig';
import { Button } from '@mui/material';
import Loader from '../../components/loader'


const StudentView = () => {

  const navigate = useNavigate()

    const [loading, setLoading] = useState(true)

    const { id } = useParams() 
    const [userdetails, setUserDetails] = useState(null)

    useEffect(() => {

        const docRef = doc(firestore, "students", id);
        getDoc(docRef).then((res) => {
            if (res.exists()) {
                setUserDetails(res.data())
                setLoading(false)
              } else {
                setLoading(false)
                console.log("No such document!");
              }
        }).catch((err) => {
            console.log(err);
            
        })

    },[])

    

  return (
    <>

   {
    loading ? (
        <Loader />
    ) : (
        <div className='w-full h-screen mt-8'>
        <div className='w-full h-96 bg-neutral-300 grid grid-cols-6 gap-4 p-8 rounded-2xl'>
        <h1 className='col-span-2 font-bold'>First Name</h1><h1 className='col-span-4 '>{userdetails ? (userdetails.firstname) : ("No Frist Name")}</h1>
        <h1 className='col-span-2 font-bold'>Last Name</h1><h1 className='col-span-4 '>{userdetails ? (userdetails.lastname) : ("No Last Name")}</h1>
        <h1 className='col-span-2 font-bold'>Email</h1><h1 className='col-span-4 '>{userdetails ? (userdetails.email) : ("No Email")}</h1>
        <h1 className='col-span-2 font-bold'>Gender</h1><h1 className='col-span-4 '>{userdetails ? (userdetails.gender) : ("No Gender")}</h1>
        <h1 className='col-span-2 font-bold'>Date Of Birth</h1><h1 className='col-span-4 '>{userdetails ? (userdetails.dateofbirth) : ("No Date Of Birth")}</h1>
        <h1 className='col-span-2 font-bold'>Class</h1><h1 className='col-span-4 '>{userdetails ? (userdetails.class) : ("No Class")}</h1>
        <h1 className='col-span-2 font-bold'>School</h1><h1 className='col-span-4 '>{userdetails ? (userdetails.schoolname) : ("No School Name")}</h1>
        <h1 className='col-span-2 font-bold'>Address</h1><h1 className='col-span-4 '>{userdetails ? (userdetails.address) : ("No Address")}</h1>
        </div>
        <Button onClick={() => { navigate(`/students/update/${id}`) }} variant='contained' sx={{ padding:"0.5rem 2.5rem", marginTop:"1rem" }} >Edit</Button>

    </div>
    )
   }
    
    </>
  )
}

export default StudentView