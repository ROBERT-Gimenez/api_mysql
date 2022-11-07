const router = require('express').Router();
const user = require('../../controllers/api/userController');
const loginValidation = require("../../validations/loginValidation");
const registerValidation = require("../../validations/registerValidation");
const adminSession = require("../../middlewares/adminCheck");
const checkin = require("../../middlewares/checkin");
const imgProfile = require("../../middlewares/imgProfile");


router.get('/' , adminSession, user.list);

router.get('/:id' , loginValidation ,  user.userDetail);

router.post('/' , checkin, registerValidation ,  imgProfile.single('avatar'), user.create );

router.put('/:id' , user.userUpdate );

router.delete('/:id' , user.userUpdate );

module.exports = router;
