const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint
// Async and await used to handle routes asynchronously
// Sequelize is used to fetch all tags from DB
router.get("/", async (req, res) => {
  // Find all tags include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [
        {
          model: Product,
          through: ProductTag,
          as: "products",
        },
      ],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
    throw err;
  }
});

router.get("/:id", async (req, res) => {
  // Find a single tag by its `id'
  // Include its associated Product data completed
  // Sequelize uses tag.findBYPK to get the tag from db based on req.params.id
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [
        {
          model: Product,
          through: ProductTag,
        },
      ],
    });
    res.status(200).json(tagData);
  } catch (err) {
    return res.status(500).json({ message: "No tag with this id" });
  }
});

// The endpoint `/api/tags`
// Create a new tag
// Sequelize used to create a new tag w/ data found in req.body
router.post("/", async (req, res) => {
  try {
    const tagData = await Tag.create({
      tag_name: req.body.tag_name,
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update a tag's name by its `id` value
// Sequelize used to get a singular tag by it's `id`
router.put("/:id", async (req, res) => {
  try {
    const tagData = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!tagDate[0]) {
      res.status(404).json({ message: "No tag with this id" });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete on tag by its `id` value
// Sequelize uses destroy to delete based on the JSON response
router.delete("/:id", async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!tagData) {
      res.status(404).json({ message: "No tag with this id" });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
