import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  images: [{ type: mongoose.Schema.Types.ObjectId, ref: "Image" }],
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
  isVerified: {
    type: Boolean,
    default: false,
    required: true,
  },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign({ id: this._id }, process.env.JWT_SECRET);
    this.tokens = this.tokens.concat({ token: token });

    await this.save();
    return token;
  } catch (err) {
    console.log(err);
  }
};

userSchema.methods.addImage = async function (imageId) {
  try {
    this.images.push(imageId);
    await this.save();
    return { message: "success" };
  } catch (err) {
    console.log(err);
  }
};

const User = mongoose.models.User || mongoose.model("User", userSchema);
module.exports = User;
