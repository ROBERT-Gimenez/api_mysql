const {check} = require("express-validator");
const userValidation = [
    check("name")
    .notEmpty().withMessage("Ingrese un nombre").bail()
    .not().isNumeric().withMessage("Nombre invalido , no debe incluir números o caracteres especiales")
    //not() Niega el resultado del siguiente validador (https://express-validator.github.io/docs/validation-chain-api.html)
]

module.exports= userValidation;