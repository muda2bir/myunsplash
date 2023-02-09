import connectDB from "@/middleware/mongoose";
import User from "@/models/user";
import { setCookie } from "cookies-next";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res
      .status(400)
      .json({ message: "Something went wrong! Please try again later." });
  }
  try {
    connectDB(); // Connecting to the Database
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(422)
        .json({ message: "Please fill all the required fields!" });
    }

    const userExits = await User.findOne({ email: email });
    if (userExits) {
      return res
        .status(422)
        .json({ message: "User Already Exists! Please Login!" });
    }

    const user = new User({ name, email, password });
    await user.save();

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

    res.json({ message: "success", theUser: user });
  } catch (err) {
    res.status(400).json({
      message: "Something went wrong! Please try again later.",
      error: err,
    });
  }
}
