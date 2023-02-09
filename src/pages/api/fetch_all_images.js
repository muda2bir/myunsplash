import connectDB from "@/middleware/mongoose";
import Image from "../../models/image";

export default async function handler(req, res) {
  connectDB(); // Connecting to database if not connected;
  try {
    const allImages = await Image.find();
    return res.status(200).json(allImages);
  } catch (error) {
    return res.status(400).json({ message: "error", error: error });
  }
}
