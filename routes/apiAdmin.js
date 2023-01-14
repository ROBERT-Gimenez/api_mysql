const router = require('express').Router();

const apiUser = require('./api/userAdmin');
const apiProduct = require('./api/productApi');
const apiDirection = require('./api/directionAdmin');

router.use('/user' , apiUser);
router.use('/products' , apiProduct);
router.use('/direction' , apiDirection);

module.exports = router ;