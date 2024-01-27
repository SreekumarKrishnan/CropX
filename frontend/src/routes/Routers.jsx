import React from 'react'
import{Routes, Route} from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import Services from '../pages/Services'
import Contact from '../pages/Contact'
import Specialists from '../pages/Specialists/Specialists'
import SpecialistCard from '../pages/Specialists/SpecialistCard'
import SpecialistSignup from '../pages/SpecialistSignup'
import AdminLogin from '../pages/Admin/AdminLogin'
import AdminDashboard from '../pages/Admin/AdminDashboard'
import Otp from '../pages/Otp'
import MyAccount from '../Dashboard/User-account/MyAccount'
import SpecialistDashboard from '../Dashboard/Specialist-account/SpecialistDashboard'
import ProtectedRoute from './ProtectedRoute'
import SpecialistDetails from '../pages/Specialists/SpecialistDetails'


const Routers = () => {
  return (
  
    <Routes> 
      <Route path='/' element={<Home/>} />
      <Route path='/home' element={<Home/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/otp' element={<Otp/>} />
      <Route path='/signup' element={<Signup/>} />
      <Route path='/specialist/signup' element={<SpecialistSignup/>} />
      <Route path='/services' element={<Services/>} />
      <Route path='/contact' element={<Contact/>} />
      <Route path='/specialists' element={<Specialists/>} />
      <Route path='/admin/login' element={<AdminLogin/>} />
      <Route path='/admin/dashboard' element={<AdminDashboard/>} />
      <Route path='/user/profile' element={<ProtectedRoute allowedRoles={["farmer"]}><MyAccount/></ProtectedRoute>} />
      <Route path='/specialist/profile' element={<ProtectedRoute allowedRoles={["specialist"]}><SpecialistDashboard/></ProtectedRoute>} />
      <Route path='/specialist/:id' element={<ProtectedRoute allowedRoles={["farmer"]}><SpecialistDetails/></ProtectedRoute>} />
      
    </Routes>
  
  )
}

export default Routers