// Express router class, used to define routes for dealing with different HTTP methods
const router = require("express").Router();
// Extracting multiple values to extract specific objects. (productTag, product, tag)
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint
// Async and await used to handle routes asynchronously
// Sequelize is used to fetch all tags from DB
router.get("/", async (req, res) => {
  // Find all tags include its associated Product data
  // Be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [
        {
          model: Product,
        },
      ],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
    throw err;
  }
});

// Example: http://localhost:3001/api/tags/8
router.get("/:id", async (req, res) => {
  // Find a single tag by its `id'
  // Include its associated Product data completed
  try {
    console.log(req.params.id);
    const tagData = await Tag.findByPk({
      where: {
        id: req.params.id,
      },
      include: [{ model: Product }],
    });
    if (!tagData) {
      res.status(400).json({ message: "No tag found with that ID" });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// The endpoint `/api/tags`
router.post("/", async (req, res) => {
  //console.log(req.body.tag_name);
  // Create a new tag
  // Sequelize used to create a new tag w/ data found in req.body
  try {
    const tagData = await Tag.create({
      tag_name: req.body.tag_name,
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  //console.log(req.params.id);
  //console.log(req.body.tag_name);
  // Example: http://localhost:3001/api/tags/8 with tag_name <something> in body
  // Update a tag's name by its `id` value
  // Sequelize used to get a singular tag by it's `id`
  try {
    const tagData = await Tag.update(
      {
        tag_name: req.body.tag_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if (!tagData[0]) {
      res.status(404).json({ message: "No tag found with this id" });
      return;
    }
    // if (!tagDate[0]) {
    //   res.status(404).json({ message: "No tag with this id" });
    //   return;
    // }
    res.status(200).json(tagData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  // Delete on tag by its `id` value
  // Example: http://localhost:3001/api/tags/10
  // Sequelize uses destroy to delete based on the JSON response
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
