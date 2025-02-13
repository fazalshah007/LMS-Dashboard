import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { firestore } from '../../firebaseConfig';

const UpdateSubject = () => {

    const { id } = useParams() 
    const navigate = useNavigate()

        const [userdetails, setUserDetails] = useState(null)
        const [mount, setMount] = useState(true)
    


        const [subjectName, setSubjectName] = useState('');
         const [studentClassName, setStudentClassName] = useState('');
         const [group, setgroup] = useState('');


        const handleSubmitData = async () => {

            try {

              const subjectInfo = {
                subjectName:subjectName,
                studentClassName: studentClassName,
                group: group,
            }

                const docRef = doc(firestore, "subjects",id)
                await updateDoc(docRef,subjectInfo)
                

                navigate("/subjects")
            } catch (error) {
                console.log(error);
                
            }
        }

           useEffect(() => {
        
                const docRef = doc(firestore, "subjects", id);
                getDoc(docRef).then((res) => {
                    if (res.exists()) {
                        setSubjectName(res.data().subjectName)
                        setStudentClassName(res.data().studentClassName)
                        setgroup(res.data().group)
                        

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
    
                    <div className='grid grid-cols-8 gap-8'>
    
                        <TextField 
                        value={subjectName}
                        onChange={e => setSubjectName(e.target.value)}
                        className='col-span-8' id="outlined-basic" label="Subject Name" variant="outlined" />
                        
                        <TextField
                        value={studentClassName}
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
    
             
                       
    
                        <Button onClick={handleSubmitData} className="col-span-4" variant="contained">Update Class</Button>
    
                    </div>
    
                </div>
    </>
  )
}

export default UpdateSubject


