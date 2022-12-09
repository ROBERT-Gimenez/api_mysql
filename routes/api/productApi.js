const router =require("express").Router();
const productController = require("../../controllers/api/productController")
const adminController = require("../../controllers/api/adminController")
const uploadFile = require('../../middlewares/imgProduct');


router.get('/', productController.list);

router.get('/:id', productController.detalle);

router.post('/create', uploadFile.single('image'), productController.create);

router.put('/edit/:id', productController.productUpdate);

router.delete('/delete/:id',uploadFile.single('image'), productController.delete);

//Compras 

router.get('/compras-realizadas', adminController.comprasList);

module.exports = router;
