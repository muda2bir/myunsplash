import connectDB from "@/middleware/mongoose";
import User from "../../models/user";

export default async function handler(req, res) {
  connectDB(); // Connecting to database if not connected
  try {
    const { _id } = req.body;
    const verifiedUser = await User.findByIdAndUpdate(
      _id,
      {
        isVerified: true,
      },
      { new: true }
    );

    if (!verifiedUser.isVerified) {
      return res.status(400).json({
        message: "Something went wrong! You can verify your email later.",
      });
    }

    return res.status(200).json({ message: "success" });
  } catch (err) {
    return res.status(400).json({
      message: "Something went wrong! You can verify your email later.",
    });
  }
}
