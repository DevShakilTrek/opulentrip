import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false); // Fixed: Disable strictQuery for wider query support
    await mongoose.connect(`${process.env.MONGODB_URI}/hotel-booking`);
    console.log("✅ MongoDB Connected to hotel-booking database"); // Fixed: Cleaner success log
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message); // Fixed: Cleaner error log
  }
};

export default connectDB;
