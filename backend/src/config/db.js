import mongoose from "mongoose";
const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log(" DataBase Successfully Connected");
  } catch {
    console("Database connection failed:");
  }
};
export default dbConnection;
