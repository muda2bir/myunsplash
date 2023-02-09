import connectDB from "@/middleware/mongoose";
import bcrypt from "bcrypt";
import Image from "../../models/image";
import User from "../../models/user";

export default async function handler(req, res) {
  if (req.method !== "DELETE") {
    return res
      .status(400)
      .json({ message: "Something went wrong! Please try again later." });
  }
  try {
    connectDB(); // Connecting to database if not connect
    const { imageId, userId, password } = req.body;
    if (!imageId || !password || !userId) {
      return res
        .status(422)
        .json({ message: "Something went wrong! Please try again later." });
    }

    const user = await User.findOne({ _id: userId });
    if (!user)
      return res
        .status(400)
        .json({ message: "User doesn't not exists. Please create account!" });

    //   Verifying the Password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Wrong Password Entered!" });

    const deleteImage = await Image.findByIdAndDelete(imageId);
    if (!deleteImage) {
      return res.status(400).json({ message: "Something went wrong!" });
    }

    const imagePullFromUser = await User.updateOne(
      { _id: userId },
      {
        $pull: {
          images: imageId,
        },
      }
    );

    res.status(200).json({ message: "success" });
  } catch (err) {
    res.status(404).json({ message: "Something went wrong!" });
  }
}
