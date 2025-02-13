import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'

import { doc, getDoc, updateDoc } from "firebase/firestore";
import { firestore } from '../../firebaseConfig';

const UpdateTeacher = () => {

    

    const { id } = useParams() 
        const navigate = useNavigate()

            const [mount, setMount] = useState(true)
    

       const [yourName, setYourName] = useState('');
        const [fatherName, setFatherName] = useState('');
        const [email, setEmail] = useState('');
        const [gender, setGender] = useState('');
        const [status, setStatus] = useState('');
        const [qualification, setqualification] = useState('');
        const [yourAge, setYourAge] = useState('');
        const [religion, setReligion] = useState('')
        const [experience, setExperience] = useState('')
        const [address, setAddress] = useState('')

          const handleSubmitData = async () => {
        
                    try {
        
                        const teacherInfo = {
                            yourName: yourName,
                            fatherName: fatherName,
                            email: email,
                            status: status,
                            gender: gender,
                            qualification: qualification,
                            yourAge: yourAge,
                            religion: religion,
                            experience: experience,
                            address: address
                        }
        
                        const docRef = doc(firestore, "teachers",id)
                        await updateDoc(docRef,teacherInfo)
                        
        
                        navigate("/teachers")
                    } catch (error) {
                        console.log(error);
                        
                    }
                }



                   useEffect(() => {
                        
                                const docRef = doc(firestore, "teachers", id);
                                getDoc(docRef).then((res) => {
                                    if (res.exists()) {
                                        setYourName(res.data().yourName)
                                        setFatherName(res.data().fatherName)
                                        setEmail(res.data().email)
                                        setGender(res.data().gender)
                                        setYourAge(res.data().yourAge)
                                        setqualification(res.data().qualification)
                                        setStatus(res.data().status)
                                        setReligion(res.data().religion)
                                        setExperience(res.data().experience)
                                        setAddress(res.data().address)
                                        
                                        
                
                                        setMount(false)
                                      } else {
                                        console.log("No such document!");
                                      }
                                }).catch((err) => {
                                    setMount(false)
                
                                    console.log(err);
                                    
                                })
                        
                            },[mount])
                

  return (
   <>
    <div className='w-full h-full flex justify-center items-center mt-10 '>

<div className='grid grid-cols-4 gap-8'>

    <TextField
    value={yourName}
        onChange={e => setYourName(e.target.value)}
        className='col-span-2' id="outlined-basic" label="Your Name" variant="outlined" />
    <TextField
    value={fatherName}
        onChange={e => setFatherName(e.target.value)}
        className='col-span-2' id="outlined-basic" label="Father Name" variant="outlined" />

    <TextField
    value={email}
        onChange={e => setEmail(e.target.value)}
        className='col-span-3' id="outlined-basic" label="Email" variant="outlined" />

    <FormControl className='col-span-1' variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Gender</InputLabel>
        <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={gender}
            onChange={e => setGender(e.target.value)}
            label="Gender"
        >

            <MenuItem value='male'>male</MenuItem>
            <MenuItem value='female'>female</MenuItem>
            <MenuItem value='other'>other</MenuItem>
        </Select>
    </FormControl>

    <TextField
    value={yourAge}
        onChange={e => setYourAge(e.target.value)}
        className='col-span-1' id="outlined-basic" label="Your Age" variant="outlined" />

    <TextField
    value={qualification}
        onChange={e => setqualification(e.target.value)}
        className='col-span-1' id="outlined-basic" label="Qualifications" variant="outlined" />


    <FormControl className='col-span-1' variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Status</InputLabel>
        <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={status}
            onChange={e => setStatus(e.target.value)}
            label="Gender"
        >

            <MenuItem value='single'>single</MenuItem>
            <MenuItem value='merried'>merried</MenuItem>
            <MenuItem value='divorced'>divorced</MenuItem>
        </Select>
    </FormControl>

    <TextField
    value={religion}
        onChange={e => setReligion(e.target.value)}
        className='col-span-1' id="outlined-basic" label="Religion" variant="outlined" />
    <TextField
    value={experience}
        onChange={e => setExperience(e.target.value)}
        className='col-span-1' id="outlined-basic" label="Experience" variant="outlined" />
    <TextField
    value={address}
        onChange={e => setAddress(e.target.value)}
        className='col-span-3' id="outlined-basic" label="Address" variant="outlined" />


    <Button onClick={handleSubmitData} className="col-span-4" variant="contained">Update Student</Button>

</div>

</div>
   </>
  )
}

export default UpdateTeacher