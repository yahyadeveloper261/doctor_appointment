import mongoose from "mongoose";
const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log(" DataBase Successfully Connected");
  } catch {
   console.error("Database connection error:", error.message);
  }
};
export default dbConnection;
