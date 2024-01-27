import { findAllUsers, findUser, updateUser } from "../database/repository/userDBInteact.js";

export const updateUserData = async (req, res) => {
  const id = req.params.id;

  try {
    const updatedUser = await updateUser(id, req.body);

    res
      .status(200)
      .json({
        success: true,
        message: "successfully updated",
        data: updatedUser,
      });
  } catch (error) {
    res.status(500).json({ success: false, message: "updation failed" });
  }
};

export const getSingleUser = async (req, res) => {
    const id = req.params.id;
  
    try {
      const user = await findUser(id);
  
      res
        .status(200)
        .json({
          success: true,
          message: "User found",
          data: user,
        });
    } catch (error) {
      res.status(500).json({ success: false, message: "No user" });
    }
};

export const getAllUsers = async (req, res) => {
    
    try {
      const user = await findAllUsers();
  
      res
        .status(200)
        .json({
          success: true,
          message: "User found",
          data: user,
        });
    } catch (error) {
      res.status(500).json({ success: false, message: "No user" });
    }
};

export const getUserProfile = async(req,res)=>{
  const userId = req.userId
  try {
    const user = await findUser(userId)
    if(!user){
      return res.status(404).json({success:false, message:"User not found"})
    }
    
    const {password, ...rest} = user._doc
    
    res.status(200).json({success:true, message:"Profile info getting", data:{...rest}})

  } catch (error) {
    res.status(500).json({success:false, message:"Something went wrong, cannot get"})
  }
}
