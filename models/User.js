const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ["admin", "developer"],
      default: "developer",
    },
    loginCode: String, // code temporaire pour login
    codeExpires: Date, // expiration du code
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
