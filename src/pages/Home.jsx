import React, { useEffect, useState } from 'react'
import { collection, getCountFromServer } from "firebase/firestore";
import { firestore } from "../firebaseConfig";
import Loader from "../components/loader"




const Home = () => {

  const [isLoading, setIsLoading] = useState(true)
  const [studentData, setstudentData] = useState(null)
  const [teacherData, setteacherData] = useState(null)
  const [subjectData, setsubjectData] = useState(null)

  const getCollectionCount = async () => {

    try {
      
    const collRefStudents = collection(firestore, "students"); 
    const collRefTeachers = collection(firestore, "teachers"); 
    const collRefSubjects = collection(firestore, "subjects"); 

    const snapShotStudents = await getCountFromServer(collRefStudents);
    const snapShotTeachers = await getCountFromServer(collRefTeachers);
    const snapShotSubjects = await getCountFromServer(collRefSubjects);

    setstudentData(snapShotStudents.data().count)
    setteacherData(snapShotTeachers.data().count)
    setsubjectData(snapShotSubjects.data().count)



    setIsLoading(false)
    } catch (error) {
      console.log(error);
      setIsLoading(false)
      
    }

  };
  
  useEffect(() => {

    getCollectionCount();
  },[])

  return(
    <>  

    {
      isLoading ? (<Loader />) : (
        <div className='w-full h-full'>
      
      <div className='w-full h-full grid grid-cols-1 md:grid-cols-2 place-items-center gap-8'>
        <div className='w-60 h-60 rounded-xl bg-purple-300 flex justify-center items-center flex-col shadow-gray-400 shadow-xl'>
          <h1 className='text-9xl'>{studentData ? (studentData) : (0)}</h1>
          <h1 className='text-2xl font-medium'>Students</h1>
        </div>
        <div className='w-60 h-60 rounded-xl bg-green-300 flex justify-center items-center flex-col shadow-gray-400 shadow-xl'>
          <h1 className='text-9xl'>{teacherData ? (teacherData) : (0)}</h1>
          <h1 className='text-2xl font-medium'>Teachers</h1>
        </div>
        <div className='w-60 h-60 rounded-xl bg-yellow-300 flex justify-center items-center flex-col shadow-gray-400 shadow-xl'>
          <h1 className='text-9xl'>{subjectData ? (subjectData) : (0)}</h1>
          <h1 className='text-2xl font-medium'>Subjects</h1>
        </div>
        <div className='w-60 h-60 rounded-xl bg-sky-300 flex justify-center items-center flex-col shadow-gray-400 shadow-xl'>
          <h1 className='text-9xl'>10</h1>
          <h1 className='text-2xl font-medium'>Classes</h1>
        </div>
   
      </div>

    </div>
      )
    }
    
    </>
  )
}

export default Home