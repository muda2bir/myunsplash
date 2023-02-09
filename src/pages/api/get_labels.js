import connectDB from "@/middleware/mongoose";
import Image from "../../models/image";

export default async function handler(req, res) {
  try {
    connectDB(); // connecting to the database if not connected
    const labelList = await Image.find({}, { label: 1 });
    if (!labelList) {
      return res.status(400).json({ message: "Something went wrong!" });
    }

    return res.status(200).json({ message: "success", labelList: labelList });
  } catch (err) {
    return res.status(400).json({ message: "Something went wrong!" });
  }
}
