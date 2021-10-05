const router = require('express').Router();
const {Category, Product, ProductTag, Tag } = require('../../models');

router.get('/:id', async (req, res) => {
    try {
        const productData = await product.findAllById(req.params.id, {
            include: [{model: Category }]});
        if(!productData) {
            res.status(404).json({ message: 'Cannot find any products with that id.' });
            return;
        }
        res.status(200).json(productData);
    } catch (error) {
        res.status(500).json(error);
    }
})

router.get('/', async (req, res) => {
    try {
        const allProducts = await Product.findAll({
            include: [{model: Category }]
        }) 
        if(!allProducts) {
            res.status(404).json(error);
            return;
        }
        res.status(200).json(allProducts);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.post('/', async (req, res) => {
    Product.create(req.body).then((product) => {
        if (req.body.tagIds.length) {
            const productTagIdArray = req.body.tagIds.map((tag_id) => {
                return {
                    product_id: product.id,
                    tag_id,
                };
            });
            return ProductTag,bulkCreate(productTagIdArray);
        }
        res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200)
.json(productTagIds)).catch((error) => {
    console.log(error);
    res.status(400).json(error);
});
});

router.put('/:id', (req, res) => {
    Product.update(req.body, {
        where: {
            id: req.params.id,
        },
    })
    .then((product) => {
        return ProductTag.findAll({where: {product_id: req.params.id } });
    })
    .then((productTags) => {
        const productTagIds = productTags.map(({tag_id}) => tag_id);
        const newProductTagIds = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
            return {
                product_id: req.params.id,
                tag_id,
            };
        });
        const productTagsToRemove = productTags
        .filter(({tag_id}) => !req.body.tagIds.includes(tag_id))
        .map(({id}) => id);

        return Promise.all([
            ProductTag.destroy({where: {id: productTagsToRemove} }),
            ProductTag.bulkCreate(newProductTags),
        ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((error) => {
        res.status(400).json(error);
    });
});

router.delete('/:id', async (req, res) => {
    try {
        const productData = await Tag.destroy({
            where: {
                product: req.params.id
            }
        });

        if (!productData) {
            res.status(404).json({ message: 'Cannot find a tag with that id.'});
            return;
        }
        res.status(200).json(productData);
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;