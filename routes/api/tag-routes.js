const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
// Async and await used to handle routes asynchronously
// Sequelize is used to fetch all tags from DB
router.get('/', async (req, res) => {
  // find all tags include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [{ 
        model: Product, through: ProductTag, as: 'products' 
      }],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
    throw err;
  }
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id' to include its associated Product data
  try {
    const tag = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through:ProductTag }],
    });
    
    if (!tag) {
      return res.status(404).json({err});
    }
  }
});

router.post('/', (req, res) => {
  // create a new tag
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
