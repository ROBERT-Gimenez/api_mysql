const router = require('express').Router();

const apiUser = require('./api/userAdmin');
const apiProduct = require('./api/productApi');

router.use('/user' , apiUser);
router.use('/products' , apiProduct);

module.exports = router ;