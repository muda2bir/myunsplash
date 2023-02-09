import connectDB from "@/middleware/mongoose";
import User from "../../models/user";

export default async function handler(req, res) {
  try {
    connectDB(); // Connecting to database if not connected
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Invalid Email Address!" });
    }

    const user = (await User.find({ email: email }).count()) > 0;
    return res.status(200).json({ message: "success", userExists: user });
  } catch (err) {
    return res
      .status(400)
      .json({ message: "Something went wrong!", error: err });
  }
}
