const router = require('express').Router();
const {Tag, Product, ProductTag, id} = require('../../models');

router.get('/', async (req, res) => {
    try {
        const tagData = await Tag.findAll({
            include: [
                { 
                model: Product, 
                through: ProductTag, 
                attributes: [
                    "product_name",
                    "price",
                    "stock",
                    "category_id"
                ]
            }
        ]});
            res.status(200).json(tagData);
        } catch (error) {
            res.status(500).json(error);
        }
        });

router.put('/:id', async (req, res) =>{
    try {
        const tagData = await Tag.update({
           tag_name: req.body.tag_name,
        },
        {where:{ id: req.params.id }},
        );
        if (!tagData) {
            res.status(404).json({ message: 'Cannot find a tag with this id.' });
            return;
        }
        res.status(200).json(userData);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const tagData = await Tag.findByPk(req.params.id, {
            include: [
                { 
                model: Product,
                through: productTag,
                attributes: [
                    "product_name",
                    "price",
                    "stock",
                    'category_id'
                    ],
            }
        ]
        });
        if (!tagData) {
            res.status(404).json({ message: 'Could not find a tag with this id.'});
            return;
        }
        res.status(200).json(tagData);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const tagData = await Tag.destroy({
            where: {
                id: req.params.id
            }
        });
        if (!tagData) {
            res.status(404).json({ message: 'Could not find a tag with this id.'});
            return;
        }
        res.status(200).json(tagData);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.post('/', async (req, res) => {
    try{
        const tagData = await Tag.create(req.body);
        res.status(200).json(tagData);
    } catch (error) {
        res.status(400).json(error);
    }
});

module.exports = router;