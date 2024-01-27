import bcrypt from 'bcryptjs'

const passwordHash = async (password)=>{
    try {

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        return hashedPassword
        
    } catch (error) {
        console.log(error);
    }
}

const passwordMatch = async (password,userPassword)=>{
    try {
        const isPasswordMatch = await bcrypt.compare(password, userPassword)

        return isPasswordMatch

    } catch (error) {
        console.log(error);
    }
}

export{
    passwordHash,
    passwordMatch
    
}
