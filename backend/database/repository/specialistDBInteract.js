import Specialist from "../models/specialistSchema.js";
import Specialization from "../models/specializationSchema.js"
import { passwordHash } from "../../services/bcryptService.js";
import {ObjectId}  from "mongodb"

const findSpecialist = async (findData) => {
  try {
    const user = await Specialist.findOne(findData);

    return user;
  } catch (error) {
    console.log(error);
  }
};

const findSpecialistById = async (findData)=>{
  try {
    const user = await Specialist.findById(findData).select("-password").populate('specialization');;

    return user;
  } catch (error) {
    console.log(error);
  }
}

const updateSpecialist = async (findData, updateData) => {
  try {
    await Specialist.updateOne(findData, { $set: updateData });
  } catch (error) {
    console.error(error);
  }
};

const updateSpecialistById = async (findData,updateData)=>{  
  try {
    
    const updatedData = await Specialist.findByIdAndUpdate(findData, {$set: updateData}, {new:true}) 

    return updatedData
    
  } catch (error) {
    console.error(error)
  }
}

const createSpecialist = async (user) => {
  try {
    const {
      fname,
      lname,
      email,
      mobile,
      password,
      photo,
      role,
      gender,
      qualification,
      specialization,
      certificate,
    } = user;
    const hashedPassword = await passwordHash(password);
    user = new Specialist({
      fname,
      lname,
      email,
      mobile,
      password: hashedPassword,
      photo,
      role,
      gender,
      qualification,
      specialization,
      certificate,
    });

    await user.save();
  } catch (error) {
    console.log(error);
  }
};

const findAllSpecialists = async (query) => {
  try {

    
    const users = await Specialist.find({is_Approved:true}).select("-password").populate('specialization'); 
    
    return users;
  } catch (error) {
    console.log(error);
  }
};

const findAllSpecialistsAdmin = async (query) => {
  try {

    
    const users = await Specialist.find({}).select("-password").populate('specialization'); 
    
    return users;
  } catch (error) {
    console.log(error);
  }
};

const updateExperience = async (id,data)=>{
  try {
    
    await Specialist.findByIdAndUpdate({_id:id}, {$push:{experiences:data}})
    
  } catch (error) {
    console.error(error)
  }
}
const deleteExperienceList = async (id,data)=>{
  try {
    
    await Specialist.findByIdAndUpdate({_id:id},{
      $pull: { experiences :{startDate:data}   }
    },
    { new: true }
    )
    
  } catch (error) {
    console.error(error)
  }
}
const updateSlot = async (id,data)=>{
  try {
    
    await Specialist.findByIdAndUpdate({_id:id}, {$push:{slot:data}})
    
  } catch (error) {
    console.error(error)
  }
}
const deleteSlotList = async (id,data1,data2)=>{
  try {
    
    await Specialist.findByIdAndUpdate({_id:id},{
      $pull: { slot :{slotDate:data1, slotTime:data2 } }
    },
    { new: true }
    )
    
  } catch (error) {
    console.error(error)
  }
} 



export {
  findSpecialist,
  createSpecialist,
  findAllSpecialists,
  findAllSpecialistsAdmin,
  updateSpecialist,
  findSpecialistById,
  updateSpecialistById,
  updateExperience,
  deleteExperienceList,
  updateSlot,
  deleteSlotList
};
