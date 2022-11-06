const router = require('express').Router();
const user = require('../../controllers/api/userController');
const loginValidation = require("../../validations/loginValidation");
const registerValidation = require("../../validations/registerValidation");


router.get('/' , user.list);

router.get('/:id' , user.userDetail);

router.post('/' , user.create );

router.put('/:id' , user.userUpdate );

router.delete('/:id' , user.userUpdate );

module.exports = router;
