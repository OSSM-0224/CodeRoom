import mongoose from "mongoose";
import env from "../config/env.config.js";

const connectMongoDB = async () => {
  try {
    await mongoose.connect(env.MONGODB_URI);

    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed");

    console.error(error.message);

    process.exit(1);
  }
};

export default connectMongoDB;