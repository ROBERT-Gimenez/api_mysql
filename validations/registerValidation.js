const {check , body} = require("express-validator");
const {users} = require("../db");

let registerValidation = [
    check("name")
    .notEmpty().withMessage("ingrese un nombre").bail()
    .isLength({min:3 , max:50}).withMessage("El máximo de caracteres tiene que ser de 50"),
    check("email")
    .notEmpty().withMessage("El email es requerido").bail()
    .isEmail().withMessage("Ingrese un email valido"),
    body("email").custom((value) => {
        return users.findOne({where:{email:value}})
        .then((user) => {
            if(user){
                return Promise.reject("Email ya Registrado")
            }
        })
    }),
    check("password")
    .notEmpty().withMessage("Ingrese una Contraseña")
    .isLength({min:8,max:12}).withMessage("La contraseña contener entre 8/12 caracteres"),
    check("password2")
    .notEmpty().withMessage("Ingrese nuevamente la contraseña"),
    body("password2").custom((value , {req}) => {
        if(value !== req.body.password){
            return false
        }else{
            return true
        }
    }).withMessage("Las Contraseñas no coinsiden"),
    check("terms")
    .isString("on").withMessage("Debes aceptar los Terminos y condiciones")
]

module.exports = registerValidation;