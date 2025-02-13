import '@fontsource/roboto/400.css';
import DashboardLayout from "./components/DashboardLayout"
import { Navigate, Route, Routes, useNavigate, } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import Students from './pages/students/Students';
import { useEffect, useState } from 'react';
import CreateStudent from './pages/students/CreateStudent';
import StudentView from './pages/students/StudentView';
import UpdateStudent from './pages/students/UpdateStudent';
import Teachers from './pages/teachers/Teachers';
import CreateTeacher from './pages/teachers/CreateTeacher';
import { ToastContainer } from 'react-toastify';
import TeacherView from './pages/teachers/TeacherView';
import UpdateTeacher from './pages/teachers/UpdateTeacher';
import Subjects from "./pages/subjects/Subjects"
import CreateSubject from './pages/subjects/CreateSubject'
import ViewSubject from './pages/subjects/ViewSubject'
import UpdateSubject from './pages/subjects/UpdateSubject'

function App() {


  const [loading, setLoading] = useState(true)
  let [isLoggedIn, setIsLoggedIn] = useState(false)
  const navigate = useNavigate()


  useEffect(() => {

    let userData = localStorage.getItem("userID")

    if (userData) {
      setIsLoggedIn(true)
      setLoading(false)
    } else {
      navigate('/login')
    }


  }, [])

  return (
    <>

      <Routes>
        <Route path='/' element={isLoggedIn ? (<DashboardLayout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />) : (<Navigate to="/login" replace />)}>
          <Route index element={<Home />} />
          <Route path='students' element={<Students />} >
            <Route path='create' element={<CreateStudent />} />
            <Route path='view/:id' element={<StudentView />} />
            <Route path='update/:id' element={<UpdateStudent />} />
          </Route>
          <Route path='teachers' element={<Teachers />} >
            <Route path='create' element={<CreateTeacher />} />
            <Route path='view/:id' element={<TeacherView />} />
            <Route path='update/:id' element={<UpdateTeacher />} />
          </Route>
          <Route path='subjects' element={<Subjects />} >
            <Route path='create' element={<CreateSubject />} />
            <Route path='view/:id' element={<ViewSubject />} />
            <Route path='update/:id' element={<UpdateSubject />} />
          </Route>
        </Route>
        <Route path='/signup' element={isLoggedIn ? (<Navigate to="/" replace />) : (<Signup />)} />
        <Route path='/login' element={isLoggedIn ? (<Navigate to="/" replace />) : (<Login setIsLoggedIn={setIsLoggedIn} />)} />
      </Routes>






      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  )

}

export default App
