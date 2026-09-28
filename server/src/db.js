import mongoose from "mongoose";

export async function connectDB() {
  const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/247labs";
  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected:", uri);
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    console.error("Is MongoDB running locally? Start it with `mongod` or adjust MONGODB_URI in .env");
    process.exit(1);
  }
}
