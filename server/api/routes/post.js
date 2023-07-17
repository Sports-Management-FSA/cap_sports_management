const { User, Post } = require("../../db");
const router = require("express").Router();


router.get("/", async (req, res, next) => {
      const posts = await Post.findAll();
      res.send(posts)
})

router.post("/", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    if (user) {
      const post = await Post.create(req.body);
      res.send(post);
    }
    res.status(401).send("Unauthorized Access");
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    if (user) {
      const post = Post.findByPk(req.params);
      post.destory();
      res.sendStatus(204);
    }
    res.status(401).send("Unauthorized Access");
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    if (user) {
      const post = await Post.findByPk(req.params);
      await post.update(req.body);
      res.send(post);
    }
    res.status(401).send("Unauthorized Access");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
