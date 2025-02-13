import React, { useState } from 'react'
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { collection, addDoc } from "firebase/firestore";
import { firestore } from '../../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/loader'
import { toast } from 'react-toastify';


const CreateTeacher = () => {

    const navigate = useNavigate()

    const [loading, isLoading] = useState(false)

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

        if(!yourName || !fatherName || !email || !gender || !status || !qualification || !yourAge || !religion || !experience || !address){

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

            const result = await addDoc(collection(firestore, "teachers"), teacherInfo)

            isLoading(false)

            navigate('/')




        } catch (error) {
            console.log(error);
            isLoading(false)


        }

    }


    return (
        <>
            {
                loading ? (<Loader />) : (
                    <div className='w-full h-full flex justify-center items-center mt-10 '>

                        <div className='grid grid-cols-4 gap-8'>

                            <TextField
                                onChange={e => setYourName(e.target.value)}
                                className='col-span-2' id="outlined-basic" label="Your Name" variant="outlined" />
                            <TextField
                                onChange={e => setFatherName(e.target.value)}
                                className='col-span-2' id="outlined-basic" label="Father Name" variant="outlined" />

                            <TextField
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
                                onChange={e => setYourAge(e.target.value)}
                                className='col-span-1' id="outlined-basic" label="Your Age" variant="outlined" />

                            <TextField
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
                                onChange={e => setReligion(e.target.value)}
                                className='col-span-1' id="outlined-basic" label="Religion" variant="outlined" />
                            <TextField
                                onChange={e => setExperience(e.target.value)}
                                className='col-span-1' id="outlined-basic" label="Experience" variant="outlined" />
                            <TextField
                                onChange={e => setAddress(e.target.value)}
                                className='col-span-3' id="outlined-basic" label="Address" variant="outlined" />


                            <Button onClick={handleSubmitData} className="col-span-4" variant="contained">Create Teacher</Button>

                        </div>

                    </div>
                )
            }
        </>
    )
}


export default CreateTeacher;