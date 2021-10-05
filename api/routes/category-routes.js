const router = require('express').Router();
const {Category, Product, id} = require('../../models');

router.get('/', async (req, res) => {
    try {
        const category = await category.findAll({ include: [{ model: Product }] });
        res.status(200).json(categoryData);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get('/:id', async (req, res) => {
    try {
    const categoryData = await Category.findById(req.params.id, {
         include: [{ model: Product }]
     });
     if (!categoryData) {
         res.status(404).json({message: 'Cannot find data with current id.'});
         return;
     }

     res.status(200).json(categoryData);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.put('/:id', async (req, res) => {
    try{
        const categoryData = await Category.update({
            category_name: req.body.category_name
        },
        {
            where: {
                id:req.params.id,
            },
        });
        if(!categoryData[0]) {
            res.status(404).json({message: "Cannot find any product with this id."});
            return;
        }
        res.status(200).json(categoryData);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.delete('/:id', async (req, res) =>{
    try {
        const categoryData = await Category.destroy({
            where: {
                id: req.params.id
            }
        });
        if (!categoryData) {
            res.status(404).json({message: "Cannot delete product with that id."});
            return;
        }
        res.status(200).json(categoryData);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.post('/', async (req, res) => {
    if (req.body.category_name.length) {
        const newCategory = await Category.create(req.body).catch((error) => {
            res.status(400).json(error);
        })
        res.status(201).json(newCategory)
    } else {
        res.status(404).json('No new Category created.');
    }
});

module.exports = router;