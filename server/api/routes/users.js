const router = require("express").Router();
const { User } = require("../../db");

router.get("/", async (req, res, next) => {
   try {
      const user = await User.findAll();
      res.send(user);
   } catch (ex) {
      next(ex);
   }
});

router.get("/:id", async (req, res, next) => {
   try {
      const user = await User.findByPk(req.params.id);
      res.send(user);
   } catch (err) {
      next(err);
   }
});

router.post("/", async (req, res, next) => {
   try {
      const user = await User.create(req.body);
      res.send(user);
   } catch (err) {
      next(err);
   }
});

router.delete("/:id", async (req, res, next) => {
   try {
      const user = await User.findByPk(req.params.id);
      user.destroy();
      res.send(user);
   } catch (err) {
      next();
   }
});

router.put("/:id", async (req, res, next) => {
   try {
      const user = await User.findByPk(req.params.id);
      user.update(req.body);
      res.send(user);
   } catch (err) {
      next(err);
   }
});

module.exports = router;
