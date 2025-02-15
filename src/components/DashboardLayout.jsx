import React, { useEffect, useState } from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, Outlet, } from 'react-router-dom';



const DashboardLayout = ({ isLoggedIn, setIsLoggedIn }) => {


  const [hamburgerMenuBar, setHamburgerMenuBar] = useState(true)
  const [isStudentDrawerOpen, setIsStudentDrawerOpen] = useState(false)
  const [isTeacherDrawerOpen, setIsTeacherDrawerOpen] = useState(false)
  const [isSubjectDrawerOpen, setIsSubjectDrawerOpen] = useState(false)
  const [isSchoolDrawerOpen, setIsSchoolDrawerOpen] = useState(false)
  const [isSyllabusDrawerOpen, setIsSyllabusDrawerOpen] = useState(false)
  const [isClassDrawerOpen, setIsClassDrawerOpen] = useState(false)
  const [isFeesDrawerOpen, setIsFeesDrawerOpen] = useState(false)
  const [isAddmissionDrawerOpen, setIsAddmissionDrawerOpen] = useState(false)
  const [isExamDrawerOpen, setIsExamDrawerOpen] = useState(false)


  const logout = () => {
    localStorage.removeItem("userID");
    setIsLoggedIn(false)
  };

  return (
    <>
   
   <div className='w-full h-full antialiased bg-gray-900'>
      <nav className='border-b px-8 py-2.5 bg-gray-800 border-gray-700 fixed left-0
       right-0 top-0 z-50 flex justify-between'>
       <div className='flex items-center'>
       <span  className='mr-4 text-white block md:hidden'><button onClick={() => { setHamburgerMenuBar(!hamburgerMenuBar) }}><MenuIcon /></button></span>
       <h1 className='text-white text-xl md:text-2xl font-bold '>LMS Dashboard</h1>
       </div>
    <button 
    onClick={logout}
    className='text-gray-50 font-bold bg-gray-600 px-4 py-2'>logout</button>
      </nav>

      {/* sidebar */}
      
      <aside
      style={{ scrollbarWidth:"none" }}
       className={`fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform ${hamburgerMenuBar ? '-translate-x-full' : ''}  border-r md:translate-x-0 bg-gray-800 border-gray-700 overflow-y-auto`}>
        <div className='text-white min-h-full '>
        {/* start drop down    */}
          <Link to='/students'>
          <button onClick={(e)=>{
            setIsStudentDrawerOpen(!isStudentDrawerOpen)
            
          }} className='w-full mt-8 hover:bg-gray-600 py-2 px-4 flex justify-between items-center transition-all ease-in-out' >Students<span>{isStudentDrawerOpen ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}</span>
          </button>
          </Link>
          {/* dropdown */}
         {isStudentDrawerOpen ? ( <div className='flex flex-col p-4 items-start ml-8 transition-all ease-in-out'>
            <Link  to='students/create'  className='w-full mt-2 hover:bg-gray-600 py-2 px-4 flex justify-between items-center transition-all'><button>Create</button></Link>
      
          </div>) : ('')}
            {/* end drop down    */}

                  {/* start drop down    */}
          <Link to='/teachers'><button onClick={(e)=>{
            setIsTeacherDrawerOpen(!isTeacherDrawerOpen)
            
          }} className='w-full mt-8 hover:bg-gray-600 py-2 px-4 flex justify-between items-center transition-all ease-in-out' >Teacher
            <span>{isTeacherDrawerOpen ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}</span>
          </button></Link>
          {/* dropdown */}
         {isTeacherDrawerOpen ? ( <div className='flex flex-col p-4 items-start ml-8 transition-all ease-in-out'>
            <Link to='teachers/create' className='w-full mt-2 hover:bg-gray-600 py-2 px-4 flex justify-between items-center transition-all'><button>Create</button></Link>

      
          </div>) : ('')}
            {/* end drop down    */}
         

                  {/* start drop down    */}
          <Link to='subjects'><button onClick={(e)=>{
            setIsSubjectDrawerOpen(!isSubjectDrawerOpen)
            
          }} className='w-full mt-8 hover:bg-gray-600 py-2 px-4 flex justify-between items-center transition-all ease-in-out' >Subjects
            <span>{isSubjectDrawerOpen ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}</span>
          </button></Link>
          {/* dropdown */}
         {isSubjectDrawerOpen ? ( <div className='flex flex-col p-4 items-start ml-8 transition-all ease-in-out'>
            <Link to='subjects/create' className='w-full mt-2 hover:bg-gray-600 py-2 px-4 flex justify-between items-center transition-all'><button>Create</button></Link>
        
      
          </div>) : ('')}
            {/* end drop down    */}
         

                  {/* start drop down    */}
          <button onClick={(e)=>{
            setIsSchoolDrawerOpen(!isSchoolDrawerOpen)
            
          }} className='w-full mt-8 hover:bg-gray-600 py-2 px-4 flex justify-between items-center transition-all ease-in-out' >School
            <span>{isSchoolDrawerOpen ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}</span>
          </button>
          {/* dropdown */}
         {isSchoolDrawerOpen ? ( <div className='flex flex-col p-4 items-start ml-8 transition-all ease-in-out'>
            <button className='w-full mt-2 hover:bg-gray-600 py-2 px-4 flex justify-between items-center transition-all'>Add</button>
            <button className='w-full mt-2 hover:bg-gray-600 py-2 px-4 flex justify-between items-center transition-all'>List</button>
      
          </div>) : ('')}
            {/* end drop down    */}
         

                  {/* start drop down    */}
          <button onClick={(e)=>{
            setIsSyllabusDrawerOpen(!isSyllabusDrawerOpen)
            
          }} className='w-full mt-8 hover:bg-gray-600 py-2 px-4 flex justify-between items-center transition-all ease-in-out' >Syllabus
            <span>{isSyllabusDrawerOpen ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}</span>
          </button>
          {/* dropdown */}
         {isSyllabusDrawerOpen ? ( <div className='flex flex-col p-4 items-start ml-8 transition-all ease-in-out'>
            <button className='w-full mt-2 hover:bg-gray-600 py-2 px-4 flex justify-between items-center transition-all'>Add</button>
            <button className='w-full mt-2 hover:bg-gray-600 py-2 px-4 flex justify-between items-center transition-all'>List</button>
      
          </div>) : ('')}
            {/* end drop down    */}
         

                  {/* start drop down    */}
          <button onClick={(e)=>{
            setIsClassDrawerOpen(!isClassDrawerOpen)
            
          }} className='w-full mt-8 hover:bg-gray-600 py-2 px-4 flex justify-between items-center transition-all ease-in-out' >Class
            <span>{isClassDrawerOpen ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}</span>
          </button>
          {/* dropdown */}
         {isClassDrawerOpen ? ( <div className='flex flex-col p-4 items-start ml-8 transition-all ease-in-out'>
            <button className='w-full mt-2 hover:bg-gray-600 py-2 px-4 flex justify-between items-center transition-all'>Add</button>
            <button className='w-full mt-2 hover:bg-gray-600 py-2 px-4 flex justify-between items-center transition-all'>List</button>
      
          </div>) : ('')}
            {/* end drop down    */}
         

                  {/* start drop down    */}
          <button onClick={(e)=>{
            setIsFeesDrawerOpen(!isFeesDrawerOpen)
            
          }} className='w-full mt-8 hover:bg-gray-600 py-2 px-4 flex justify-between items-center transition-all ease-in-out' >Fees
            <span>{isFeesDrawerOpen ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}</span>
          </button>
          {/* dropdown */}
         {isFeesDrawerOpen ? ( <div className='flex flex-col p-4 items-start ml-8 transition-all ease-in-out'>
            <button className='w-full mt-2 hover:bg-gray-600 py-2 px-4 flex justify-between items-center transition-all'>Add</button>
            <button className='w-full mt-2 hover:bg-gray-600 py-2 px-4 flex justify-between items-center transition-all'>List</button>
      
          </div>) : ('')}
            {/* end drop down    */}
         

                  {/* start drop down    */}
          <button onClick={(e)=>{
            setIsAddmissionDrawerOpen(!isAddmissionDrawerOpen)
            
          }} className='w-full mt-8 hover:bg-gray-600 py-2 px-4 flex justify-between items-center transition-all ease-in-out' >Admission
            <span>{isAddmissionDrawerOpen ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}</span>
          </button>
          {/* dropdown */}
         {isAddmissionDrawerOpen ? ( <div className='flex flex-col p-4 items-start ml-8 transition-all ease-in-out'>
            <button className='w-full mt-2 hover:bg-gray-600 py-2 px-4 flex justify-between items-center transition-all'>Add</button>
            <button className='w-full mt-2 hover:bg-gray-600 py-2 px-4 flex justify-between items-center transition-all'>List</button>
      
          </div>) : ('')}
            {/* end drop down    */}
         

                  {/* start drop down    */}
          <button onClick={(e)=>{
            setIsExamDrawerOpen(!isExamDrawerOpen)
            
          }} className='w-full mt-8 hover:bg-gray-600 py-2 px-4 flex justify-between items-center transition-all ease-in-out' >Exam
            <span>{isExamDrawerOpen ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}</span>
          </button>
          {/* dropdown */}
         {isExamDrawerOpen ? ( <div className='flex flex-col p-4 items-start ml-8 transition-all ease-in-out'>
            <button className='w-full mt-2 hover:bg-gray-600 py-2 px-4 flex justify-between items-center transition-all'>Add</button>
            <button className='w-full mt-2 hover:bg-gray-600 py-2 px-4 flex justify-between items-center transition-all'>List</button>
      
          </div>) : ('')}
            {/* end drop down    */}
         

         
         
        </div>
        
     </aside>
   
    </div>
    
    <main
     className='fixed top-16 md:left-64 z-30'>
          <div
        style={{ scrollbarWidth:"none" }}
          className='h-screen w-screen sm:min-w-2xl md:max-w-3xl lg:w-6xl xl:w-7xl 2xl:min-w-screen  overflow-y-auto'>

         <div className='p-4'>
         <Outlet />
         {/* all screens are here to render in dashboard layout  */}
         
         </div>
          </div>
     </main>
    </>
  )
}

export default DashboardLayout