const routes = require("express").Router();
const multer = require("multer");
const multerConfig = require("./config/multer");

const Post = require("./models/post");

routes.get("/files", async (req, res) => {
  const posts = await Post.find();

  return res.json(posts);
});

routes.post(
  "/upload",
  multer(multerConfig).single("file"),
  async (req, res) => {
    const { originalname: name, size, filename: key, location: url } = req.file;

    const post = await Post.create({
      name,
      size,
      key,
      url,
    });

    return res.json({
      post,
    });
  }
);

routes.delete("/delete/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);

  await post.remove();

  return res.send("Success!");
});

routes.delete("/deleteAll", async (req, res) => {
  const post = Post.deleteMany({});

  await post.deleteMany();

  return res.send("Success!");
});

module.exports = routes;
