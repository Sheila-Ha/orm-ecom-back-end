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
      ],
    });
    res.status(200).json(productData);
  } catch (err) {
    console.err(err);
    res.status(500).json({ message: "server error" });
  }
});

// Get one product
// Example: http://localhost:3001/api/products/2
router.get("/:id", async (req, res) => {
  // Find a single product by its `id`
  // Be sure to include its associated Category and Tag data
  try {
    console.log(req.params.id);
    const productData = await Product.findByPk({
      where: {
        id: req.params.id,
      },
      include: [{ model: Category }],
    });
    if (!productData) {
      res.status(404).json({ message: "No product found with that id" });
      return;
    }
    res.status(200).json(productData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "No product found with this id" });
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
      } else {
        // If no product tags, just respond
        res.status(200).json(product);
      }
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// Update product
router.put("/:id", async (req, res) => {
  // Example: http://localhost:3001/api/products/5 with product_name <something> in body
  // console.log(req.params.id);
  // console.log(req.body);
  // Update product data
  /* req.body should look like this...
    {
      product_name: "Soccer",
      price: 100.00,
      stock: 2,
      tagIds: [1, 4]
    }
    I used:
    {
      product_name: "Soccer",
      price: 100.00,
      stock: 2,
      tagIds: [1, 4],
      category_id: 3
    }
  */
  try {
    Product.update(
      {
        product_name: req.body.product_name,
        price: req.body.price,
        stock: req.body.stock,
        category_id: req.body.category_id,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
      .then((product) => {
        if (req.body.tagIds && req.body.tagIds.length) {
          console.log(product.id);
          const productTagIdArr = req.body.tagIds.map((tag_id) => {
            return {
              product_id: req.params.id,
              tag_id,
            };
          });
          Promise.all([
            // Delete all tags for this product
            ProductTag.destroy({ where: { product_id: req.params.id } }),
            // Insert all the new tags for this product
            ProductTag.bulkCreate(productTagIdArr),
          ]).then((productTagIds) => res.status(200).json(productTagIds));
        } else {
          // If no product tags, just respond
          res.status(200).json(product);
        }
      })
      .catch((err) => {
        // console.log(err);
        res.status(400).json(err);
      });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  // Example: http://localhost:3001/api/products/6
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
