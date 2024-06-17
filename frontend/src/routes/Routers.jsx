import React, { useEffect } from 'react'
import{Routes, Route} from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import Services from '../pages/Services'
import Specialists from '../pages/Specialists/Specialists'
import SpecialistSignup from '../pages/SpecialistSignup'
import AdminLogin from '../pages/Admin/AdminLogin'
import AdminDashboard from '../pages/Admin/AdminDashboard'
import Otp from '../pages/Otp'
import MyAccount from '../Dashboard/User-account/MyAccount'
import SpecialistDashboard from '../Dashboard/Specialist-account/SpecialistDashboard'
import ProtectedRoute from './ProtectedRoute'
import SpecialistDetails from '../pages/Specialists/SpecialistDetails'
import PaymentSuccess from '../pages/User/PaymentSuccess'
import PaymentFailed from '../pages/User/PaymentFailed'
import Chat from '../pages/ChatComponents/Chat/Chat'
import Unauthorized from '../ErrorPages/Unauthorized'
import PageNotFound from '../ErrorPages/PageNotFound'


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
      <Route path='/specialists' element={<Specialists/>} />
      <Route path='/admin/login' element={<AdminLogin/>} />
      <Route path='/admin/dashboard' element={<ProtectedRoute allowedRoles={["admin"]}><AdminDashboard/></ProtectedRoute>} />
      <Route path='/user/profile' element={<ProtectedRoute allowedRoles={["farmer"]}><MyAccount/></ProtectedRoute>} />
      <Route path='/specialist/profile' element={<ProtectedRoute allowedRoles={["specialist"]}><SpecialistDashboard/></ProtectedRoute>} />
      <Route path='/specialist/:id' element={<ProtectedRoute allowedRoles={["farmer"]}><SpecialistDetails/></ProtectedRoute>} />
      <Route path='/user/paymentSuccess' element={<ProtectedRoute allowedRoles={["farmer"]}><PaymentSuccess/></ProtectedRoute>} />
      <Route path='/user/paymentFailed' element={<PaymentFailed/>} />
      <Route path='/chat' element={<ProtectedRoute allowedRoles={["farmer","specialist"]}><Chat/></ProtectedRoute>} />
      <Route path='/unauthorized' element={<Unauthorized />} />
      <Route path='*' element={<PageNotFound />} />
      
    </Routes>
  
  )
}

export default Routers