import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { firestore } from '../../firebaseConfig';
import Swal from 'sweetalert2';

const UpdateStudent = () => {

    const { id } = useParams() 
    const navigate = useNavigate()

        const [userdetails, setUserDetails] = useState(null)
        const [mount, setMount] = useState(true)
    


         const [firstname, setFirstname] = useState('');
        const [lastname, setLastname] = useState('');
        const [email, setEmail] = useState('');
        const [gender, setGender] = useState('');
        const [classSchool, setClassSchool] = useState('');
        const [datePickerGetting, setDatePickerGetting] = useState(null)
        const [schoolName, setSchoolName] = useState('')
        const [address,setAddress] = useState('')


        const handleSubmitData = async () => {

            try {

                const studentInfo = {
                    firstname:firstname,
                    lastname: lastname,
                    email: email,
                    gender: gender,
                    class: classSchool,
                    dateofbirth: (datePickerGetting && datePickerGetting.format("YYYY-MM-DD")),
                    schoolname: schoolName,
                    address: address
                }

                const docRef = doc(firestore, "students",id)
                await updateDoc(docRef,studentInfo)
                

                navigate("/students")
            } catch (error) {
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: "Update Failed!",
                        text: "All fields are required. & select the date",
                        showConfirmButton: false,
                        timer: 3000
                    });
                console.log(error);
                
            }
        }

           useEffect(() => {
        
                const docRef = doc(firestore, "students", id);
                getDoc(docRef).then((res) => {
                    if (res.exists()) {
                        // setUserDetails(res.data())
                        setFirstname(res.data().firstname)
                        setLastname(res.data().lastname)
                        setEmail(res.data().email)
                        setGender(res.data().gender)
                        setClassSchool(res.data().class)
                        setDatePickerGetting(res.data().dateofbirth)
                        setSchoolName(res.data().schoolname)
                        setAddress(res.data().address)
                        

                        setMount(false)
                      } else {
                        console.log("No such document!");
                      }
                }).catch((err) => {
                    setMount(false)

                  
                  console.log("Catch Error ===> ",err);
                    
                })
        
            },[mount])

            


  return (
    <>
     <div className='w-full h-full flex justify-center items-center mt-10 '>

<div className='grid grid-cols-4 gap-8'>

    <TextField 
    value={firstname}
    onChange={e => setFirstname(e.target.value)}
    className='col-span-2' id="outlined-basic" label="First Name" variant="outlined" />
    <TextField
    value={lastname}
    onChange={e => setLastname(e.target.value)}
    className='col-span-2' id="outlined-basic" label="Last Name" variant="outlined" />

    <TextField
    value={email}
    onChange={e => setEmail(e.target.value)}
     className='col-span-4' id="outlined-basic" label="Email" variant="outlined" />

    <FormControl className='col-span-2' variant="standard" sx={{ m: 1, minWidth: 120 }}>
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
    value={classSchool}
    onChange={e=>setClassSchool(e.target.value)}
     className='col-span-1' id="outlined-basic" label="Class" variant="outlined" />

    <div className='col-span-1'>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
        defaultValue={dayjs(new Date())} 
       onChange={(newValue) => {
        setDatePickerGetting(newValue); 
        // console.log("Selected Date:", newValue ? newValue.format("YYYY-MM-DD") : "No date selected");
      }}/>
    </LocalizationProvider>
    </div>

    <TextField
    value={schoolName}
    onChange={e=>setSchoolName(e.target.value)}
    className='col-span-1' id="outlined-basic" label="School Name" variant="outlined" />

    <TextField
    value={address}
    onChange={e=>setAddress(e.target.value)}
    className='col-span-3' id="outlined-basic" label="Address" variant="outlined" />
   

    <Button onClick={handleSubmitData} className="col-span-4" variant="contained">Update Student</Button>

</div>

</div>
    </>
  )
}

export default UpdateStudent