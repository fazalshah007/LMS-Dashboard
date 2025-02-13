import React, { useState } from 'react'
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { collection, addDoc } from "firebase/firestore"; 
import { firestore } from '../../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/loader'


const CreateSubject = () => {

    const navigate = useNavigate()

    const [loading, isLoading] = useState(false)

    const [subjectName, setSubjectName] = useState('');
    const [studentClassName, setStudentClassName] = useState('');
    const [group, setgroup] = useState('');


    const handleSubmitData = async () => {

        isLoading(true)

       try {

        const subjectInfo = {
            subjectName:subjectName,
            studentClassName: studentClassName,
            group: group,
        }

        const result = await addDoc(collection(firestore,"subjects"),subjectInfo)

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

                <div className='grid grid-cols-8 gap-8'>

                    <TextField 
                    onChange={e => setSubjectName(e.target.value)}
                    className='col-span-8' id="outlined-basic" label="Subject Name" variant="outlined" />
                    
                    <TextField
                    onChange={e => setStudentClassName(e.target.value)}
                     className='col-span-8' id="outlined-basic" label="Class Number" variant="outlined" />

                    <FormControl className='col-span-6' variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-standard-label">Group</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={group}
                            onChange={e => setgroup(e.target.value)}
                            label="Group"
                        >

                            <MenuItem value='Science'>Science</MenuItem>
                            <MenuItem value='Arts'>Arts</MenuItem>
                            <MenuItem value='Commmerce'>Commmerce</MenuItem>
                        </Select>
                    </FormControl>

         
                   

                    <Button onClick={handleSubmitData} className="col-span-4" variant="contained">Create Class</Button>

                </div>

            </div>
            ) 
           }
        </>
    )
}

export default CreateSubject

