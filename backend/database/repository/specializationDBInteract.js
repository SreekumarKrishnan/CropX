import Specialization from "../models/specializationSchema.js";

export const findAllSpecialization = async ()=>{
    try {
        const specializations = Specialization.find()
        return specializations
    } catch (error) {
        console.error(error)
    }
    
}

export const findSpecialization = async (findData) => {
  try {
    const data = await Specialization.findOne(findData);
    return data;
  } catch (error) {
    console.error(error)
  }
};

export const createSpecialization = async (userData) => {
  const { name, description } = userData;
  try {
    const specialization = new Specialization({
      name,
      description,
    });
    await specialization.save();
  } catch (error) {
    console.error(error);
  }
};
