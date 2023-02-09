import connectDB from "@/middleware/mongoose";
import bcrypt from "bcrypt";
import { setCookie } from "cookies-next";
import User from "../../models/user";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res
      .status(400)
      .json({ message: "Something went wrong! Please try again later." });
  }
  try {
    connectDB(); // Connecting to Database;
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(422)
        .json({ message: "Please enter Email & Password!" });
    }
    const user = await User.findOne({ email: email });
    if (!user)
      return res
        .status(400)
        .json({ message: "User doesn't not exists. Please create account!" });

    //   Verifying the Password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid Credentials" });

    //   generating the token
    const token = await user.generateAuthToken();

    setCookie("jwt", token, {
      req,
      res,
      httpOnly: true,
      maxAge: new Date(Date.now() + 2589200000),
      secure: process.env.NODE_ENV === "production" ? true : false,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "Lax",
      path: "/",
    });

    res.json({ message: "success" });
  } catch (err) {
    res.status(400).json({
      message: "Something went wrong! Please try again later.",
      error: err,
    });
  }
}
