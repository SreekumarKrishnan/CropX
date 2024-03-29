import {
  findAllSpecialistsAdmin,
  findSpecialist,
  updateSpecialist,
} from "../database/repository/specialistDBInteract.js";
import {
  findAllUsers,
  findUser,
  updateUser,
} from "../database/repository/userDBInteact.js";
import {
  findSpecialization,
  createSpecialization,
  findAllSpecialization,
} from "../database/repository/specializationDBInteract.js";
import {
  sendApproveEmail,
  sendSuspendEmail
} from "../services/mailSender.js"
import {
  findAllBookingData, findBookingDataByUserId
} from "../database/repository/bookingDBInteract.js"

export const getAllUsers = async (req, res) => {
  try {
    const users = await findAllUsers();

    res
      .status(200)
      .json({ success: true, message: "Users found", data: users });
  } catch (error) {
    res.status(404).json({ success: false, message: "Not found" });
  }
};

export const getAllSpecialists = async (req, res) => {
  try {
    const users = await findAllSpecialistsAdmin();

    res
      .status(200)
      .json({ success: true, message: "Users found", data: users });
  } catch (error) {
    res.status(404).json({ success: false, message: "Not found" });
  }
};

export const blockUser = async (req, res) => {
  try {
    const id = req.params.id;
    const findData = { _id: id };

    const user = await findUser(findData);

    if (user.is_Blocked === false) {
      const updateData = { is_Blocked: true };
      await updateUser(findData, updateData);
    }
    if (user.is_Blocked === true) {
      const updateData = { is_Blocked: false };
      await updateUser(findData, updateData);
    }

    res
      .status(200)
      .json({ success: true, message: "User block action successful" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "User block action failed" });
  }
};

export const blockSpecialist = async (req, res) => {
  try {
    const id = req.params.id;
    const findData = { _id: id };

    const user = await findSpecialist(findData);

    if (user.is_Blocked === false) {
      const updateData = { is_Blocked: true };
      await updateSpecialist(findData, updateData);
    }
    if (user.is_Blocked === true) {
      const updateData = { is_Blocked: false };
      await updateSpecialist(findData, updateData);
    }

    res
      .status(200)
      .json({ success: true, message: "User block action successful" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "User block action failed" });
  }
};

export const approveSpecialist = async (req, res) => {
  try {
    const id = req.params.id;
    const findData = { _id: id };

    const user = await findSpecialist(findData);
    const {email} = user
    

    if (user.is_Approved === false) {
      const updateData = { is_Approved: true };
      await updateSpecialist(findData, updateData);
      sendApproveEmail(email)
    }

    if (user.is_Approved === true) {
      const updateData = { is_Approved: false };
      await updateSpecialist(findData, updateData);
      sendSuspendEmail(email)
    }

    res
      .status(200)
      .json({ success: true, message: "User approve action successful" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "User approve action failed" });
  }
};

export const addSpecialization = async (req, res) => {
  try {
    const name = req.body.name.toUpperCase();
    const description = req.body.description;
    const findData = { name: name };
    const userData = { name: name, description: description };

    const existingSpecialization = await findSpecialization(findData);

    if (existingSpecialization) {
      return res.status(400).json({ message: "Specialization already exist" });
    }

    await createSpecialization(userData);

    res
      .status(200)
      .json({ success: true, message: "Specialization successfully created" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal server error, Try again" });
  }
};

export const getAllSpecialization = async (req, res) => {
  try {
    const specializations = await findAllSpecialization();

    res
      .status(200)
      .json({ success: true, message: "Specializations found", data: specializations });
  } catch (error) {
    res
      .status(404)
      .json({ success: false, message: "Specialization Not found" });
  }
};

export const getAllBookingData = async (req, res) => {
  try {
    
    const bookingData = await findAllBookingData()

    res
      .status(200)
      .json({ success: true, message: "Bookinng data found", data: bookingData });
  } catch (error) {
    res
      .status(404)
      .json({ success: false, message: "Booking data Not found" });
  }
};

export const getBookingDataByUserId = async (req, res) => {
  const id = req.params.id
  try {
    const bookingData = await findBookingDataByUserId(id)
    res
      .status(200)
      .json({ success: true, message: "Bookinng data found", data: bookingData });
    
  } catch (error) {
    res
      .status(404)
      .json({ success: false, message: "Booking data Not found" });
  }
};
