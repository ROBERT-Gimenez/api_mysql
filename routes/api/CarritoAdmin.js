const router = require('express').Router();
const Carrito = require('../../controllers/api/carritoController');

router.get('/' , Carrito.CarroList);

router.get('/userShopping/:id' , Carrito.CarroList);

router.post('/addedToShopping/:id' , Carrito.CarroAdded);


module.exports = router;