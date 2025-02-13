import React, { useState } from 'react'
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { collection, addDoc } from "firebase/firestore"; 
import { firestore } from '../../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/loader'
import { toast } from 'react-toastify';


const CreateStudent = () => {

    const navigate = useNavigate()

    const [loading, isLoading] = useState(false)

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [classSchool, setClassSchool] = useState('');
    const [datePickerGetting, setDatePickerGetting] = useState(null)
    const [schoolName, setSchoolName] = useState('')
    const [address,setAddress] = useState('')

  

    const handleSubmitData = async () => {

        if(!firstname || !lastname || !email || !gender || !classSchool || !datePickerGetting || !schoolName || !address){
            toast.error('All Fields are required!', {
                            position: "top-center",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: false,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "dark",
                            });
                            return;
        }

        isLoading(true)

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

        const result = await addDoc(collection(firestore,"students"),studentInfo)

        isLoading(false)

        navigate('/')

        
        
        
       } catch (error) {
        console.log(error);
        isLoading(false)

        
       }

        
       
        
    }

    // console.log("core -->",datePickerGetting && datePickerGetting.format("YYYY-MM-DD"));
    

   

    return (
        <>
           {
            loading ? (<Loader />) : (
                <div className='w-full h-full flex justify-center items-center mt-10 '>

                <div className='grid grid-cols-4 gap-8'>

                    <TextField 
                    onChange={e => setFirstname(e.target.value)}
                    className='col-span-2' id="outlined-basic" label="First Name" variant="outlined" />
                    <TextField
                    onChange={e => setLastname(e.target.value)}
                    className='col-span-2' id="outlined-basic" label="Last Name" variant="outlined" />

                    <TextField
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
                    onChange={e=>setClassSchool(e.target.value)}
                     className='col-span-1' id="outlined-basic" label="Class" variant="outlined" />

                    <div className='col-span-1'>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                       
                       onChange={(newValue) => {
                        setDatePickerGetting(newValue); 
                        // console.log("Selected Date:", newValue ? newValue.format("YYYY-MM-DD") : "No date selected");
                      }}/>
                    </LocalizationProvider>
                    </div>

                    <TextField
                    onChange={e=>setSchoolName(e.target.value)}
                    className='col-span-1' id="outlined-basic" label="School Name" variant="outlined" />

                    <TextField
                    onChange={e=>setAddress(e.target.value)}
                    className='col-span-3' id="outlined-basic" label="Address" variant="outlined" />
                   

                    <Button onClick={handleSubmitData} className="col-span-4" variant="contained">Create Student</Button>

                </div>

            </div>
            ) 
           }
        </>
    )
}

export default CreateStudent