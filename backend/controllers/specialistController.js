import {
  findAllSpecialists,
  findSpecialistById,
  updateSpecialistById,
  updateExperience,
  deleteExperienceList,
  updateSlot,
  deleteSlotList
} from "../database/repository/specialistDBInteract.js";

export const displayAllSpecialist = async (req, res) => {
  try {
    const { query } = req.query;
    const users = await findAllSpecialists(query);

    res
      .status(200)
      .json({ success: true, message: "Users found", data: users });
  } catch (error) {
    res.status(404).json({ success: false, message: "Not found" });
  }
};

export const getSpecialistProfile = async (req, res) => {
  const userId = req.userId;
  try {
    const specialist = await findSpecialistById(userId);
    if (!specialist) {
      return res
        .status(404)
        .json({ success: false, message: "Specialist not found" });
    }

    const { password, ...rest } = specialist._doc;

    res
      .status(200)
      .json({
        success: true,
        message: "Profile info getting",
        data: { ...rest },
      });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Something went wrong, cannot get" });
  }
};
export const getSpecialistProfileById = async (req, res) => {
  const id = req.params.id
  
  try {
    const specialist = await findSpecialistById(id);
    if (!specialist) {
      return res
        .status(404)
        .json({ success: false, message: "Specialist not found" });
    }

    const { password, ...rest } = specialist._doc;

    res
      .status(200)
      .json({
        success: true,
        message: "Profile info getting",
        data: { ...rest },
      });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Something went wrong, cannot get" });
  }
};

export const updateSpecialistData = async (req, res) => {
  const id = req.params.id;

  try {
    const updatedUser = await updateSpecialistById(id, req.body);

    res.status(200).json({
      success: true,
      message: "successfully updated",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "updation failed" });
  }
};

export const addExperience = async (req, res) => {
  const id = req.params.id;
  try {
    await updateExperience(id, req.body);
    const updatedUser = await findSpecialistById(id);
    res.status(200).json({
      success: true,
      message: "successfully added experience",
      data: updatedUser,
    });
  } catch (error) {
    console.error(error);
  }
};
export const deleteExperience = async (req, res) => {
  const id = req.params.id;
  const data = req.body.startDate;   
  await deleteExperienceList(id, data);
  res.status(200).json({
    success: true,
    message: "successfully deleted experience",
  });
  try {
  } catch (error) {
    console.error(error);
  }
};
export const addSlot = async (req, res) => {
  const id = req.params.id;
  try {
    await updateSlot(id, req.body);
    const updatedUser = await findSpecialistById(id);
    res.status(200).json({
      success: true,
      message: "successfully added slot",
      data: updatedUser,
    });
  } catch (error) {
    console.error(error);
  }
};
export const deleteSlot = async (req, res) => {
  const id = req.params.id;
  const data1 = req.body.slotDate;
  const data2 = req.body.slotTime
    
  await deleteSlotList(id, data1, data2);
  res.status(200).json({
    success: true,
    message: "successfully deleted slot",
  });
  try {
  } catch (error) {
    console.error(error);
  }
};
