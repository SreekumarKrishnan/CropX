import mongoose from 'mongoose'




mongoose.set('strictQuery', false)

const connectDB = async ()=>{
    try {

        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser : true,
            useUnifiedTopology : true
        })

        console.log('MongoDB database is connected');
        
    } catch (error) {
        console.log('MongoDB database connection failed');
    }
}

export default connectDB