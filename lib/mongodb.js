import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please add your Mongo URI to .env.local");
}

let isConnected = false;

export default async function connectDB() {
  if (isConnected) return;

  try {
    await mongoose.connect(MONGODB_URI);
    isConnected = true;
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("DB Connection Failed:", error);
  }
}
