const router = require("express").Router();
const { Actions, User } = require("../../db");

router.post("/", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);

    if (!user) {
      return res.status(401).send("Unauthorized to create category");
    } else {
      const action = await Actions.create(req.body);
      res.send(action);
    }
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    if (!user) {
      return res.status(401).send("Unauthorized to delete category");
    } else {
      const action = await Actions.findByPk(req.params.id);
      await action.destroy();
      res.send("Action deleted successfully");
    }
  } catch (ex) {
    next(ex);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    if (!user) {
      return res.status(401).send("Unauthorized to update category");
    } else {
      const action = await Actions.findByPk(req.params.id);
      await action.update(req.body);
      res.send(action);
    }
  } catch (ex) {
    next(ex);
  }
});

module.exports = router;
