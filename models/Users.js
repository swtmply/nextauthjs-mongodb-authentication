import { Schema, models, model } from "mongoose";

const userSchema = new Schema(
  {
    name: String,
    username: String,
    password: String,
  },
  { timestamps: true }
);

export default models.User || model("User", userSchema);
