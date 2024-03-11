import React, { useState } from 'react';
import UserManagment from '../Admin/UserManagement.jsx';
import SpecialistManagment from '../Admin/SpecialistManagement.jsx';
import SpecializationManagement from '../Admin/SpecializationManagement.jsx';
import Dashboard from './Dashboard.jsx';
import { BASE_URL } from '../../config.js';
import useGetAllUsers from '../../hooks/UseFetchAllUsersData.jsx';
import useGetAllSpecialists from '../../hooks/UseFetchAllSpecialistData.jsx';
import useGetAllSpecializations from '../../hooks/UseFetchAllSpecializationData.jsx'
import BookingStatus from './BookingStatus.jsx';
import useFetchData from '../../hooks/UseFetchData.jsx';


const AdminDashboard = () => {

  const [activeTab, setActiveTab] = useState('dashboard');
  const { userData: usersData,refetch:userRefetch } = useGetAllUsers("/admin/allUsers");
  const { specialistData: specialistsData,refetch:specialistRefetch } = useGetAllSpecialists('/admin/allSpecialists');
  const { specializationData: specializationData,refetch:specializationRefetch } = useGetAllSpecializations('/admin/allSpecialization')
  const { data : bookingData , refetch : bookingRefetch } = useFetchData("/admin/getAllBookingData")
  
  const handleLogout = ()=>{
    console.log("logout clicked");
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold">Admin Dashboard</h1>
        <div className="space-x-4 flex items-center">
        <button
            onClick={() => setActiveTab('dashboard')}
            className={`${
              activeTab === 'dashboard' ? 'bg-gray-500 text-white' : ''
            } px-4 py-2 rounded-md text-lg font-semibold border border-solid border-gray-500 focus:outline-none flex items-center`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`${
              activeTab === 'users' ? 'bg-gray-500 text-white' : ''
            } px-4 py-2 rounded-md text-lg font-semibold border border-solid border-gray-500 focus:outline-none flex items-center`}
          >
            <span role="img" aria-label="Users" className="mr-2">
              👥
            </span>
            Users
          </button>
          <button
            onClick={() => setActiveTab('specialists')}
            className={`${
              activeTab === 'doctors' ? 'bg-gray-500 text-white' : ''
            } px-4 py-2 rounded-md text-lg font-semibold border border-solid border-gray-500 focus:outline-none flex items-center`}
          >
            <span role="img" aria-label="Specialists" className="mr-2">
              👨‍⚕️
            </span>
            Specialists
          </button>

          <button
            onClick={() => setActiveTab('specializations')}
            className={`${
              activeTab === 'specializations' ? 'bg-gray-500 text-white' : ''
            } px-4 py-2 rounded-md text-lg font-semibold border border-solid border-gray-500 focus:outline-none flex items-center`}
          >
            Specializations
          </button>

          <button
            onClick={() => setActiveTab('booking')}
            className={`${
              activeTab === 'booking' ? 'bg-gray-500 text-white' : ''
            } px-4 py-2 rounded-md text-lg font-semibold border border-solid border-gray-500 focus:outline-none flex items-center`}
          >
            Booking Status
          </button>

          <button
            onClick={handleLogout}
            className={`bg-red-500 px-4 py-2 rounded-md text-lg font-semibold border border-solid border-gray-500 focus:outline-none flex items-center`}
          >
            Log out
          </button>

        </div>
      </div>

      <div className="border-t">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'users' && <UserManagment users={usersData} userRefetch={userRefetch} />}
        {activeTab === 'specialists' && <SpecialistManagment specialists={specialistsData} specialistRefetch={specialistRefetch}/>}
        {activeTab === 'specializations' && <SpecializationManagement specializations = {specializationData} specializationRefetch = {specializationRefetch} />}
        {activeTab === 'booking' && <BookingStatus bookings = {bookingData} bookingRefetch = {bookingRefetch} /> }
      </div>
    </div>
  )
}

export default AdminDashboard