import connectDB from "@/middleware/mongoose";
import { getCookie } from "cookies-next";
import jwt from "jsonwebtoken";
import User from "../../models/user";

export default async function handler(req, res) {
  connectDB(); // Connecting to Database
  const token = getCookie("jwt", { req, res });
  if (token === undefined) {
    return res.json({ authenticated: false });
  }
  let verifyToken = jwt.verify(token, process.env.JWT_SECRET);
  const theUser = await User.findOne({
    _id: verifyToken.id,
    "tokens.token": token,
  });

  if (!theUser) {
    throw new Error("User not found!");
  }

  return res.json({
    authenticated: true,
    user: {
      id: theUser._id,
      name: theUser.name,
      email: theUser.email,
    },
  });
}
