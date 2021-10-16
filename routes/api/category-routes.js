const router = require("express").Router();
const { Category, Product, id } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const categoryData = await Category.findAll({ include: [
      {
        model: Product,
        attributes: [
          "product_name",
          "price",
          "stock"
        ], 
    }
  ] 
});
    res.status(200).json(categoryData);

  } catch (error) {

    res.status(500).json("Sorry, nothing found", error);
  }

});

router.get("/:id", async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [
        { 
        model: Product,
          attributes: [
            "product_name",
            "price",
            "stock"
          ],
        }
      ],
    });
    if (!categoryData) {
      res.status(404).json({ message: "Cannot find data with current id.", error });
      return;
    }

    res.status(200).json(categoryData);

  } catch (error) {

    res.status(500).json(error);
  }

});

router.put("/:id", async (req, res) => {
  try {
    const categoryData = await Category.update(
      {
        category_name: req.body.category_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if (!categoryData) {
      res
        .status(404)
        .json({ message: "Cannot find any product with this id.", error });
      return;
    }
    res.status(200).json(categoryData);

  } catch (error) {

    res.status(500).json(error);

  }
});

router.delete("/:id", async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!categoryData) {
      res.status(404).json({ message: "Cannot delete product with that id.", error });
      return;
    }
    res.status(200).json(categoryData);

  } catch (error) {

    res.status(500).json(error);

  }
});

router.post("/", async (req, res) => {
  // if (req.body.category_name.length) 
  try {
    const categoryData = await Category.create({ category_name: req.body.category_name,});
      res.status(200).json(categoryData);
    } catch (error) {
    // res.status(201).json(newCategory);

    res.status(400).json("No new Category created.", error);

  }
});

module.exports = router;
