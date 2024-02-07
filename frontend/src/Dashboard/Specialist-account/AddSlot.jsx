import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { toast } from "react-toastify";
import axiosInstance from "../../axiosConfig"

const AddSlot = ({ user, userRefetch }) => {
  let count = 1
  const currentDate = new Date();
  const [color,setColor]=useState(true)
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [isTimeSlotSelectionOpen, setIsTimeSlotSelectionOpen] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [slotData, setSlotData] = useState([{
    slotDate : "",
    slotTime1 : ""
  },
  {
    slotDate : "",
    slotTime2 : ""
  },{
    slotDate : "",
    slotTime3 : ""
  }
]
  )

  useEffect(() => { 
    
  }, [slotData]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleAddTime = () => {
    selectedDate.setHours(18);
    selectedDate.setMinutes(30);
    selectedDate.setSeconds(0);
    
    setSlotData([{
        slotDate:selectedDate.toISOString(),
        slotTime:selectedTimeSlot.timeSlot1
    },
    {
      slotDate:selectedDate.toISOString(),
      slotTime:selectedTimeSlot.timeSlot2
  },{
    slotDate:selectedDate.toISOString(),
    slotTime:selectedTimeSlot.timeSlot3
}]
  )
    
    
    setSelectedTimeSlot(null);
    setIsTimeSlotSelectionOpen(false);
  };

  const handleAddSlot = async()=>{
    try {
      
      if(slotData.slotTime===""){
        return toast.error("Please select a time slot before adding the slot.")
      }
      
      const res = await axiosInstance.put(
        `/specialist/addSlot/${user._id}`,
        slotData
      );

      const result = res.data;

      setSlotData([{
        slotDate : "",
        slotTime1 : ""
      },
      {
        slotDate : "",
        slotTime2 : ""
      },
      {
        slotDate : "",
        slotTime3 : ""
      }])

      setColor(true)

      userRefetch()
      toast.success(result.message);
      navigate("/specialist/profile");
      
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  

  const handleTimeSlotSelection = (timeSlot1,timeSlot2,timeSlot3) => {
    setSelectedTimeSlot({
      timeSlot1:timeSlot1,
      timeSlot2:timeSlot2,
      timeSlot3:timeSlot3,
    });
    setColor(false)
  };

  const handleDelete = async(index,index1)=>{
    const data = user.slot[index][index1]
    
    try {
       
      const res = await axiosInstance.put(
        `/specialist/deleteSlot/${user._id}`,
        {data,index}
      );

      const result = res.data;
      userRefetch()
      toast.success(result.message);
      navigate("/specialist/profile");
    } catch (error) {
      toast.error(error.response.data.message);
    }
    
  }

  

  return (
    <div className='mb-5 mt-5'>
      <div className="mb-3">
        <Calendar className="rounded-md"
          onChange={handleDateChange}
          value={selectedDate}
          onClickDay={() => setIsTimeSlotSelectionOpen(true)}
          minDate={currentDate}
          maxDate={new Date(currentDate.getTime() + 4 * 24 * 60 * 60 * 1000)}  
        />
      </div>

      {isTimeSlotSelectionOpen && (
        <div className="time-slot-selection">
          <h2>Select Time Slot</h2>
          
          <button className={`px-4 py-2 ${color?"bg-[#ffac4d]":"bg-[#c4c2c2]"} text-black rounded-md mr-5`} >9am-11am</button>
          <button className={`px-4 py-2 ${color?"bg-[#ffac4d]":"bg-[#c4c2c2]"} text-black rounded-md mr-5`} >2pm-4pm</button>
          <button className={`px-4 py-2 ${color?"bg-[#ffac4d]":"bg-[#c4c2c2]"} text-black rounded-md mr-10`} >4pm-6pm</button>
          <button className="px-4 py-2 bg-yellow-500 text-white rounded-md mr-10" onClick={() => handleTimeSlotSelection('9am-11am','2pm-4pm','4pm-6pm')}>Add time</button>
          <button className="px-4 py-2 bg-green-500 text-white rounded-md mr-10" onClick={handleAddTime}>Confirm</button>
          <button className="px-4 py-2 bg-red-500 text-white rounded-md mt-5" onClick={() => setIsTimeSlotSelectionOpen(false)}>Close</button>
        </div>
      )}
      <button
        onClick={handleAddSlot}
        className="px-4 py-2 bg-primaryColor text-white rounded-md mt-5"
        
      >
        Add slot
      </button>

      <div className="flex flex-col items-center">
        {/* Navbar Component */}
        {/* Assuming there's a component named Navbar */}

        <div className="col-span-3 ">
          <section className="container">
            <div className="relative mx-5 overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-slate-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Sl.No
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Slot Date
                    </th>

                    <th scope="col" className="px-6 py-3">
                      Slot Time
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {user && user.slot.length ? (
                    user.slot.map((slot, index) => (
                      slot.map((slot,index1)=>(
                      <tr
                        key={index}
                        className="bg-white border-b hover:bg-[#e8e8ff]"
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                        >
                          {count++}
                        </th>
                        <td className="px-6 py-4">{slot.slotDate.split('T')[0]}</td>
                       
                        <td className="px-6 py-4">{slot.slotTime+""}</td>
                       
                        
                        <td className="px-6 py-4">
                          <button
                            onClick={()=>handleDelete(index,index1)} 
                            className="px-4 py-2 font-semibold text-white bg-red-500 border border-yellow-500 rounded hover:bg-yellow-500 hover:text-white hover:border-transparent"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                      ))
                    ))
                  ) : (
                    <tr className="bg-white border-b hover:bg-gray-100">
                      <td
                        colSpan={6} // Fix the colspan value to match the number of columns
                        className="px-6 py-4 font-medium text-center text-gray-900"
                      >
                        No slots found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>

    </div>
  );
}

export default AddSlot;