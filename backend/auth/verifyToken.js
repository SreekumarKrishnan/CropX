import { findSpecialistById } from "../database/repository/specialistDBInteract.js"
import { findUser } from "../database/repository/userDBInteact.js"
import { verifyToken } from "../services/jwtService.js"


export const authenticate = async(req, res, next)=>{
   
    const authToken = req.headers.authorization
   

    try {
        const token = authToken.split(" ")[1]
        const decoded = await verifyToken(token)
        req.userId = decoded.id
        req.role = decoded.role
        
        next()
    } catch (error) {

        return res.status(401).json({success:false, message:"No token, authorization denied... Please register!!!"})
    }
}

export const restrict = roles=> async(req,res,next)=>{

    

    const userId = req.userId
    let user
    try {
        const farmer = await findUser(userId)
        const specialist = await findSpecialistById(userId)
        if(farmer){
            user = farmer
        }
        if(specialist){
            user = specialist
        }
         
        if(!roles.includes(user.role)){
            return res.status(401).json({success:false,message:"You are not authorised"})
        }
       
        next()
    } catch (error) {
        
    }
}