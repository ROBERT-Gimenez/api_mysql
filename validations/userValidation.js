const {check} = require("express-validator");
const userValidation = [
    check("name")
    .notEmpty().withMessage("Ingrese un nombre").bail()
    .not().isNumeric().withMessage("Nombre invalido , no debe incluir números o caracteres especiales")
]

module.exports= userValidation;