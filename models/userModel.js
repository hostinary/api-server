import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    github_id: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
      unique: true,
    },
    avatar_url: {
      type: String,
      required: true,
    },
    access_token: {
      type: String,
      required: true,
    },
    profile_url: {
      type: String,
      required: true,
    },
    scopes: {
      type: [String],
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

export default User;
