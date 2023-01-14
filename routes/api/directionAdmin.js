const router = require('express').Router();
const direction = require('../../controllers/api/direccionController');
const loginValidation = require("../../validations/loginValidation");
const registerValidation = require("../../validations/registerValidation");
const adminSession = require("../../middlewares/adminCheck");
const imgProfile = require("../../middlewares/imgProfile");
const verifyToken = require("../../authJwt")

router.get('/' , direction.list);

module.exports = router;