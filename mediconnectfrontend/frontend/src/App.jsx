import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import MyProfile from './pages/MyProfile'
import MyAppointments from './pages/MyAppointments'
import Appointment from './pages/Appointment'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Doctors from './pages/doctors'
import Articles from './pages/Articles'
import MedicalChatbot from './components/chatbox.jsx'
import Location from './pages/Location'
import Register from './pages/Register'

const App = () => {
  return (
    <div className='mx-2 sm:mx-[6%]'>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/doctors' element={<Doctors/>}/>
        <Route path='/doctors/:speciality' element={<Doctors/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/article' element={<Articles/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/my-profile' element={<MyProfile/>}/>
        <Route path='/my-appointments' element={<MyAppointments/>}/>
        <Route path='/appointment/:docId' element={<Appointment/>}/>
        <Route path='/appointment/:docId' element={<Appointment/>}/>
        <Route path='/chatbot' element={<MedicalChatbot />} />
        <Route path='/locations' element={<Location />} />
        <Route path='/register' element={<Register />} />
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
