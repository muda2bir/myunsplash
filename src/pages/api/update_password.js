import connectDB from "@/middleware/mongoose";
import bcrypt from "bcrypt";
import User from "../../models/user";

export default async function handler(req, res) {
  try {
    connectDB();
    const { userEmail, newPassword } = req.body;
    if (!userEmail || !newPassword) {
      return res
        .status(400)
        .json({ message: "Please enter password and email" });
    }
    const encryptedPassword = await bcrypt.hash(newPassword, 10);

    const user = await User.findOneAndUpdate(
      { email: userEmail },
      { password: encryptedPassword }
    );

    if (!user) {
      return res.status(400).json({ message: "User does not exits!" });
    }

    return res.status(201).json({ message: "success" });
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong!" });
  }
}
