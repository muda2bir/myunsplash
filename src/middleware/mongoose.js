import mongoose from "mongoose";

mongoose.set("strictQuery", false);

const connectDB = async () => {
  if (mongoose.connections[0].readyState) {
    return;
  }
  const DB = process.env.DATABASE;
  await mongoose.connect(DB);
  console.log(`Connected to Database Successfully!!`);
};

export default connectDB;
