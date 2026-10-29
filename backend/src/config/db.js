import mongoose from "mongoose";
const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log(" DataBase Successfully Connected");
  } catch {
    console.log("DataBase cannot connected properly");
  }
};
export default dbConnection;
