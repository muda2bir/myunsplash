import Image from "../../models/image";
import User from "../../models/user";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(400).json({ message: "Request is not POST type." });
  }
  try {
    const { userId, label, link } = req.body;

    if (!label || !link || !userId) {
      return res.status(422).json({ message: "Link or Label is not provided" });
    }

    const image = new Image({ label: label, link: link });
    await image.save();

    const theUser = await User.findOne({ _id: userId });
    let imageAddition = await theUser.addImage(image._id);
    if (imageAddition.message !== "success") {
      return res.status(200).json({ message: "Something went wrong!" });
    }
    return res.status(201).json({ message: "success" });
  } catch (error) {
    res.json({ message: "Something went wrong!" });
  }
}
