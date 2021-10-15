const router = require('express').Router();
const categoryRoutes = require('./category-routes');
const tagRoutes = require('./tag-routes');
const productRoutes = require('./product-routes');

router.use('/tags', tagRoutes);
router.use('/category', categoryRoutes);
router.use('/product', productRoutes);

// router.use((req, res) => {
//   res.send("<h1>Wrong Route!</h1>")
// });

module.exports = router;