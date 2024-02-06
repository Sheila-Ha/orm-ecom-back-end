// Express router class, used to define routes for dealing with different HTTP methods
const router = require("express").Router();
// Extracting multiple values to extract specific objects. (productTag, product, tag)
const { Product, Category, Tag, ProductTag } = require("../../models");

// The `/api/products` endpoint
router.get("/", async (req, res) => {
// Async and await used to handle routes asynchronously
// Sequelize is used to fetch all products from DB
// Get all products
// Be sure to include its associated Category and Tag data
  try {
    const productData = await Product.findAll({
      include: [
        {
          model: Category,
        },
        {
          model: Tag,
          attributes: ["tag_name"],
          through: ProductTag,
          as: "tags",
        },
      ],
    });
    res.status(200).json(productData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
});

// Get one product
router.get("/:id", async (req, res) => {
// Find a single product by its `id`
// Be sure to include its associated Category and Tag data
  try {
    const productData = await Product.findByPk(req.params.id, {
      include: [
        {
          model: Category,
        },
        {
          model: Tag,
        },
      ],
    });
    if (!productData) {
      res.status(404).json({ message: "No product with that id" });
      return;
    }
    res.status(200).json(productData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Create new product
router.post("/", async (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
  Product.create(req.body)
    .then((product) => {
      // If there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // If no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// Update product
router.put("/:id", async (req, res) => {
  // Update product data
  /* req.body should look like this...
    {
      product_name: "Soccer",
      price: 100.00,
      stock: 2,
      tagIds: [1, 4]
    }
  */

  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      if (req.body.tagIds && req.body.tagIds.length) {
        ProductTag.findAll({
          where: { product_id: req.params.id },
        }).then((productTags) => {
          // Create filtered list of new tag_ids
          const productTagIds = productTags.map(({ tag_id }) => tag_id);
          const newProductTags = req.body.tagIds
            .filter((tag_id) => !productTagIds.includes(tag_id))
            .map((tag_id) => {
              return {
                product_id: req.params.id,
                tag_id,
              };
            });

          // Figure out which ones to remove
          const productTagsToRemove = productTags
            .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
            .map(({ id }) => id);
          // Run both actions
          return Promise.all([
            ProductTag.destroy({ where: { id: productTagsToRemove } }),
            ProductTag.bulkCreate(newProductTags),
          ]);
        });
      }

      return res.json(product);
    })
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

router.delete("/:id", async (req, res) => {
  // Delete one product by its `id` value
  try {
    const productData = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!productData) {
      res.status(404).json({ message: "No Products found with that ID" });
      return;
    }
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
