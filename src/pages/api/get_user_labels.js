import connectDB from "@/middleware/mongoose";
import User from "../../models/user";

export default async function handler(req, res) {
  try {
    connectDB(); // connecting to the database if not connected
    const { id } = req.body;
    const labelList = await User.findById(id, {
      images: 1,
      _id: 0,
    }).populate({
      path: "images",
    });

    return res.status(200).json({ message: "success", labelList: labelList });
  } catch (err) {
    return res.status(400).json({ message: "Something went wrong!" });
  }
}
