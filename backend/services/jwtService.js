import jwt from 'jsonwebtoken'


export const generateToken = async (user)=>{
    return jwt.sign({id:user._id, role:user.role}, process.env.JWT_SECRET_KEY, { expiresIn:'30d' })
}

export const verifyToken = async (token)=>{
    return jwt.verify(token, process.env.JWT_SECRET_KEY)
}

export const generateAdminToken = async (user)=>{
    return jwt.sign({id:user._id, role:user.role}, process.env.ADMIN_JWT_SECRET_KEY, { expiresIn:'30d' })
}

export const verifyAdminToken = async (token)=>{
    return jwt.verify(token, process.env.ADMIN_JWT_SECRET_KEY)
}