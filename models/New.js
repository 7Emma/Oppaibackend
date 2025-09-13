const mongoose = require("mongoose");

const NewsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    excerpt: String,
    content: { type: String, required: true },
    author: { type: String, required: true },
    date: { type: Date, required: true },
    category: { type: String, required: true },
    image: String,
    readTime: String,
    featured: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("News", NewsSchema);
