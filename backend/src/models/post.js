const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");

const PostSchema = new mongoose.Schema({
  name: String,
  size: Number,
  key: String,
  url: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

PostSchema.pre("save", function () {
  if (!this.url) {
    this.url = `http://localhost:3000/files/${this.key}`;
  }
});

PostSchema.pre("remove", function () {
  return promisify(fs.unlink)(
    path.resolve(__dirname, "..", "..", "tmp", "uploads", this.key)
  );
});

PostSchema.pre("deleteMany", function () {
  promisify(fs.rmdirSync)(
    path.resolve(__dirname, "..", "..", "tmp", "uploads"),
    { recursive: true }
  ).then(
    promisify(fs.mkdirSync)(
      path.resolve(__dirname, "..", "..", "tmp", "uploads"),
      { recursive: true }
    )
  );
  return null;
});

module.exports = mongoose.model("Post", PostSchema);
