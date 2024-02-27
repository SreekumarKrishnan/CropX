import {
  findBookingDataByBookingId,
  findBookingIdAndUpdate,
} from "../database/repository/bookingDBInteract.js";
import {
  findAllSpecialists,
  findSpecialistById,
  updateSpecialistById,
  updateExperience,
  deleteExperienceList,
  updateSlot,
  deleteSlotList,
  getSpecialistsCount
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

    res.status(200).json({
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
  const id = req.params.id;

  try {
    const specialist = await findSpecialistById(id);
    if (!specialist) {
      return res
        .status(404)
        .json({ success: false, message: "Specialist not found" });
    }

    const { password, ...rest } = specialist._doc;

    res.status(200).json({
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
  const data1 = req.body.data.slotDate;
  const data2 = req.body.data.slotTime;
  const index = req.body.index;

  try {
    if (req.body.data.is_Booked === true) {
      return res
        .status(404)
        .json({ success: false, message: "Booked slot can not be delete" });
    }

    await deleteSlotList(id, data1, data2, index);
    res.status(200).json({
      success: true,
      message: "successfully deleted slot",
    });
  } catch (error) {
    console.error(error);
  }
};

export const completeBooking = async (req, res) => {
  const id = req.params.id;
  try {
    const updateData = { status: "Completed" };
    await findBookingIdAndUpdate(id, updateData);
    res.status(200).json({
      success: true,
      message: "successfully completed session",
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "session completion failed" });
  }
};

export const getAllSpecialistCount = async (req,res)=>{
  try {
    const data = await getSpecialistsCount()
    res.status(200).json({
      success: true,
      message: "got all users count",
      data: data,
  });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "fetch all users count failed" });
  }
}
