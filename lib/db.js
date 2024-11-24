import mongoose from "mongoose";

const connectDb = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log(`mongoDb connect successfully`);
    }catch(err){
        console.log(err)
    }
} 

export default connectDb;