import mongoose from "mongoose";
const { Schema } = mongoose;

const imageSchema = new Schema({
  label: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
});

const Image = mongoose.models.Image || mongoose.model("Image", imageSchema);
module.exports = Image;
