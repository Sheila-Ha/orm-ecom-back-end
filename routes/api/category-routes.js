// Express router class, used to define routes for dealing with different HTTP methods
const router = require("express").Router();
// Extracting multiple values to extract specific objects. (productTag, product, tag)
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint
router.get("/", async (req, res) => {
  //console.log("I AM IN GET '/'");
// Sequelize is used to fetch all catagories from DB
// Find all categories
// Be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
      include: [
        {
          model: Product,
        },
      ],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Ex: http://localhost:3001/api/categories/4
router.get("/:id", async (req, res) => {
  //console.log(req.params.id);
  // Find one category by its `id` value
  // Be sure to include its associated Products
  try {
    const categoryData = await Category.findOne({
      where: {
        id: req.params.id,
      },
      include: [{ model: Product }],
    });
    if (!categoryData) {
      res.status(400).json({ message: "No category found with that ID" });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  // Create a new category
  try {
    const categoryData = await Category.create({
      category_name: req.body.category_name,
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  // Update a category by its `id` value
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!categoryData) {
      res.status(404).json({ message: "No category found with this ID" });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  // Delete a category by its `id` value
  // Example: http://localhost:3001/api/categories/7
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!categoryData) {
      res.status(404).json({ message: "No Category found with that ID" });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
