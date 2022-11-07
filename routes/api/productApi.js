const router =require("express").Router();
const productController = require("../../controllers/api/productController")

router.get('/', productController.list);
router.get('/:id', productController.detalle);


module.exports = router;
