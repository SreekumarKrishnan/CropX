import User from "../models/userSchema.js";
import { passwordHash } from "../../services/bcryptService.js";

const findUser = async (findData) => {
  try {
    const user = await User.findById(findData);

    return user;
  } catch (error) {
    console.log(error);
  }
};

const findUserByEmail = async(findData)=>{
  try {
    const user = await User.findOne(findData);

    return user;
  } catch (error) {
    console.log(error);
  }
}


const createUser = async (user) => {
  try {
    const { fname, lname, email, mobile, password, photo, role, gender } = user;
    const hashedPassword = await passwordHash(password);
    user = new User({
      fname,
      lname,
      email,
      mobile,
      password: hashedPassword,
      photo,
      role,
      gender,
    });

    await user.save();

  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (findData,updateData)=>{  
  try {
    
    const updatedData = await User.findByIdAndUpdate(findData, {$set: updateData}, {new:true}) 

    return updatedData
    
  } catch (error) {
    console.error(error)
  }
}

const findAllUsers = async()=>{
  try {
    const users = await User.find().select('-password')
    return users
  } catch (error) {
    console.log(error);
  }
}

const getUsersCount = async()=>{
  try {
    const data = await User.find().count()
    return data
  } catch (error) {
    console.log(error);
  }
}





export { findUser, createUser, findAllUsers, updateUser, findUserByEmail, getUsersCount };
