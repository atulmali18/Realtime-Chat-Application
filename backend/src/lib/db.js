import mongoose from "mongoose";

// Connect to MongoDB

import dotenv from "dotenv";
dotenv.config();

console.log(process.env.MONGODB_URI);


export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}