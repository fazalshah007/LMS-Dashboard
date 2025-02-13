import React, { useEffect, useState } from 'react'
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { firestore } from '../../firebaseConfig'
import Loader from '../../components/loader'
import { Link, Outlet, useLocation } from 'react-router-dom';

const Subjects = () => {

  const location = useLocation()

  const [subjectData, setSubjectData] = useState([])
  const [loading, setLoading] = useState(true);
  const [reMount, setReMount] = useState(false)

  const fetchData = async () => {

    try {

      const querySnapshot = await getDocs(collection(firestore, "subjects"));


      const studentsArray = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      

      setSubjectData(studentsArray);
      setLoading(false);


    } catch (error) {
      console.log(error);
      setLoading(false);

    }

  }


// delete user details 

    const handleDelete = async (id) => {
      setLoading(true)

        try {

          await deleteDoc(doc(firestore, "subjects", id));
          setReMount(!reMount)
          setLoading(false)

        } catch (error) {
          setLoading(false)

          console.log(error);
          
          
        }
        

    }


  useEffect(() => {
    fetchData()
  }, [reMount])

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        location.pathname === "/subjects" && (


        <div>
        <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
          <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
            <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
              <tr>
                <th className='px-6 py-3'>Subject</th>
                <th className='px-6 py-3'>Class</th>
                <th className='px-6 py-3'>Group</th>
                <th className='px-6 py-3'>update</th>
                <th className='px-6 py-3'>delete</th>
              </tr>
            </thead>
            <tbody>
              {
                subjectData.length > 0 ? (subjectData.map((doc, i) => {

                  return (
                    <tr key={i} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 '>
                      <th className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>{doc.subjectName}</th>
                      <th className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>{doc.studentClassName}</th>
                      <th className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>{doc.group}</th>
                   
                      <th className='px-3 py-2 text-right'><Link to={`update/${doc.id}`}><button className=' hover:bg-gray-900 hover:text-white px-5 py-2 rounded text-[12px] font-medium text-blue-600 dark:text-blue-500 '>update</button></Link></th>
                      <th className='px-3 py-2 text-right'><button onClick={() => { handleDelete(doc.id) }} className=' hover:bg-gray-900 hover:text-white px-5 py-2 rounded text-[12px] font-medium text-blue-600 dark:text-blue-500 '>delete</button></th>
                    </tr>
                  )
                })) : (
                  <tr>
                    <td colSpan="6" className="text-center p-4">No Subjects found.</td>
                  </tr>
                )
              }
              {/* <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 '>
      <th className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>fazal</th>
      <th className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>shah</th>
      <th className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>fazal@gmail.com</th>
      <th className='px-3 py-2 text-right'><button className=' hover:bg-gray-900 hover:text-white px-5 py-2 rounded text-[12px] font-medium text-blue-600 dark:text-blue-500 '>view</button></th>
      <th className='px-3 py-2 text-right'><button className=' hover:bg-gray-900 hover:text-white px-5 py-2 rounded text-[12px] font-medium text-blue-600 dark:text-blue-500 '>update</button></th>
      <th className='px-3 py-2 text-right'><button className=' hover:bg-gray-900 hover:text-white px-5 py-2 rounded text-[12px] font-medium text-blue-600 dark:text-blue-500 '>delete</button></th>
    </tr> */}
            </tbody>
          </table>
        </div>
        {/* <Outlet /> */}
      </div>
    
        )
        
      )
    }
    <Outlet />
    </>
  )
}

export default Subjects