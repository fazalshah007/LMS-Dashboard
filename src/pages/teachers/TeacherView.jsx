import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { doc, getDoc } from "firebase/firestore";
import { firestore } from '../../firebaseConfig';
import { Button } from '@mui/material';
import Loader from '../../components/loader'


const TeacherView = () => {

  const navigate = useNavigate()

    const [loading, setLoading] = useState(true)

    const { id } = useParams() 
    const [userdetails, setUserDetails] = useState(null)

    console.log(userdetails);
    

    useEffect(() => {

        const docRef = doc(firestore, "teachers", id);
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
        <div className='w-full bg-neutral-300 grid grid-cols-6 gap-4 p-8 rounded-2xl'>
        <h1 className='col-span-2 font-bold'>Your Name</h1><h1 className='col-span-4 '>{userdetails ? (userdetails.yourName) : ("No Frist Name")}</h1>
        <h1 className='col-span-2 font-bold'>Father Name</h1><h1 className='col-span-4 '>{userdetails ? (userdetails.fatherName) : ("No Last Name")}</h1>
        <h1 className='col-span-2 font-bold'>Email</h1><h1 className='col-span-4 '>{userdetails ? (userdetails.email) : ("No Email")}</h1>
        <h1 className='col-span-2 font-bold'>Gender</h1><h1 className='col-span-4 '>{userdetails ? (userdetails.gender) : ("No Gender")}</h1>
        <h1 className='col-span-2 font-bold'>Age</h1><h1 className='col-span-4 '>{userdetails ? (userdetails.yourAge) : ("No Age")}</h1>
        <h1 className='col-span-2 font-bold'>Qualification</h1><h1 className='col-span-4 '>{userdetails ? (userdetails.qualification) : ("No Class")}</h1>
        <h1 className='col-span-2 font-bold'>Status</h1><h1 className='col-span-4 '>{userdetails ? (userdetails.status) : ("No School Name")}</h1>
        <h1 className='col-span-2 font-bold'>Religion</h1><h1 className='col-span-4 '>{userdetails ? (userdetails.religion) : ("No School Name")}</h1>
        <h1 className='col-span-2 font-bold'>Experience</h1><h1 className='col-span-4 '>{userdetails ? (userdetails.experience) : ("No School Name")}</h1>
        <h1 className='col-span-2 font-bold'>Address</h1><h1 className='col-span-4 '>{userdetails ? (userdetails.address) : ("No Address")}</h1>
        </div>
        <Button onClick={() => { navigate(`/teachers/update/${id}`) }} variant='contained' sx={{ padding:"0.5rem 2.5rem", marginTop:"1rem" }} >Edit</Button>

    </div>
    )
   }
    
    </>
  )
}

export default TeacherView

