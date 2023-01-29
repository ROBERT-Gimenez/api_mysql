const router = require('express').Router();

const apiUser = require('./api/userAdmin');
const apiProduct = require('./api/productApi');
const apiDirection = require('./api/directionAdmin');
const apiCarrito = require('./api/CarritoAdmin');

router.use('/user' , apiUser);
router.use('/products' , apiProduct);
router.use('/direction' , apiDirection);
router.use('/Carrito' , apiCarrito);

module.exports = router ;