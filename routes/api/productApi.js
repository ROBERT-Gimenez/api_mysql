const router =require("express").Router();
const productController = require("../../controllers/api/productController")

router.get('/', productController.list);

router.get('/:id', productController.detalle);

router.post('/create', productController.create);

router.put('/:id', productController.productUpdate);

router.delete('/:id', productController.delete);


module.exports = router;
