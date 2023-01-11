const router = require('express').Router();
const user = require('../../controllers/api/userController');
const loginValidation = require("../../validations/loginValidation");
const registerValidation = require("../../validations/registerValidation");
const adminSession = require("../../middlewares/adminCheck");
const imgProfile = require("../../middlewares/imgProfile");
const verifyToken = require("../../authJwt")

router.get('/' , user.list);

router.get('/detail/:id' , verifyToken , user.userDetail);

router.get('/avatar/:id'  , user.userAvatar);

router.post('/login', loginValidation  , user.processLogin);
/* router.get('/:id' , loginValidation ,  user.userDetail);
 */
router.post('/create' , registerValidation ,  imgProfile.single('avatar'), user.create );

router.put('/:id' , user.userUpdate );

router.delete('/:id' , user.userUpdate );

module.exports = router;
