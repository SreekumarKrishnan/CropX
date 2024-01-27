import Admin from '../models/adminSchema.js'

const findAdmin = async (email) => {
    try {
        
      const user = await Admin.findOne({ email });
     
  
      return user;
    } catch (error) {
      console.log(error);
    }
  };

export {findAdmin}