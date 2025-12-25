import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MONGODB CONNECTED SUCCESSFULLY: ${conn.connection.host}`);
  } catch (error) {
    console.log(`MONGODB CONNECTION ERROR: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
