const router = require("express").Router();
const { User, Team, League, Category, Actions } = require("../../db");

// Get All Team
router.get("/", async (req, res, next) => {
   try {
      const categories = await Category.findAll({include:[{model: League, include:[Team]}, Actions]});
      res.send(categories);
   } catch (ex) {
      next(ex);
   }
});

// Create A Category
router.post("/", async (req, res, next) => {
   try {
      const user = await User.findByToken(req.headers.authorization);
      
      if (!user){
            return res.status(401).send('Unauthorized to create category');
      } 

      const category = await Category.create(req.body);
      res.send(category);
   } catch (ex) {
      next(ex);
   }
});

// Delete A Category --> should user be able to delete category??
router.delete("/:id", async (req, res, next) => {
   try {
      const user = await User.findByToken(req.headers.authorization);
      if (!user){
         return res.status(401).send('Unauthorized to delete category');
      }
      
      const category = await Category.findByPk(req.params.id);
      await category.destroy();
      res.send("Category deleted successfully");
   } catch (ex) {
      next(ex);
   }
});

// Update Category based on ID --> should user be able to update category??
router.put("/:id", async (req, res, next) => {
   try {
      const user = await User.findByToken(req.headers.authorization); 
      if (!user){
          return res.status(401).send('Unauthorized to update category');
      } 
      const category = await Category.findByPk(req.params.id);
      await category.update(req.body);
      return(category);
   } catch (ex) {
      next(ex);
   }
});

module.exports = router;
