import connectDB from "@/middleware/mongoose";
import User from "../../models/user";

export default async function handler(req, res) {
  connectDB(); // connecting to the database if not connected
  try {
    const { id } = req.body;
    const userImages = await User.findById(id, { images: 1 }).populate({
      path: "images",
    });
    return res.status(200).json({ message: "success", userImages: userImages });
  } catch (err) {
    return res
      .status(400)
      .json({ message: "Something went wrong! Please try again later." });
  }
}
