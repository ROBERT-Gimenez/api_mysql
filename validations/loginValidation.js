const {check , body} = require('express-validator');
const bcrypt = require('bcryptjs');
const {users} = require('../db');

let validateLogin = [
    check("email")
        .notEmpty().withMessage("El Email es requerido").bail()
        .isEmail().withMessage("Ingrese un Email Valido"),
    check("password")
        .notEmpty().withMessage("Ingrese una Contraseña"),
    body("custom").custom((value, { req }) => {
        return users.findOne({where:{email:req.params.email}})
        then((user) => {
            let validation = bcrypt.compareSync(req.body.password , user.password);
            if(!bcrypt.compareSync(req.body.password))
        })
    })
]
