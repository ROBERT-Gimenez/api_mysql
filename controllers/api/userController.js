const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator');
const {users} = require('../../db');
const path = require('path');
const fs = require('fs');
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


module.exports= {
    list:async (req,res)=> {
       await users.findAll()
        .then((user) => {
            let resp = {
                meta:{
                    status:200,
                    total:user.length,
                    url:'http://localhost:3000/api/user'
                },
                data:user
            }
            res.json(resp);
        }).catch((err) =>{ console.log(err)})
    },
    create:async (req,res) => {
        req.body.password = bcrypt.hashSync(req.body.password , 10);
        const user = await users.create(req.body)
        .then((user) => {
            res.json(user);
        }).catch((err)=>{console.log(err)})
    },
    processLogin: (req, res) => {
        let errors = validationResult(req);
        
        if(errors.isEmpty()){
            users.findOne({
                where:{ email: req.body.email}
            })
            .then((user)=>{
            
            if(req.body.recordar){
                const TIME_IN_MILISECONDS = 60000;
                res.cookie('Bikemastercookie', req.session.user, {
                    expires: new Date(Date.now() + TIME_IN_MILISECONDS),
                    httpOnly: true,
                    secure: true
                })
            }
            let resp = {
                meta:{
                    status:200,
                    total:user,
                    url:'http://localhost:4000/api/user/Login'
                },
                data:user
            }
            res.json(resp);
        }).catch((err) =>{ console.log(err)})
        }else{
            return res.json({ errors: errors.array() });
        }},
    userDetail: async (req,res) => {

       
            console.log(req.params.id)
            const user = await users.findOne({where: {id:req.params.id}})
            .then((user) => {
                res.json(user);
            }).catch((err)=>{console.log(err)})
          
       
    },
    userUpdate:async (req,res)=> {
        try{
            let userId = +req.session.user.id
            let errors = validationResult(req)
            await users.findByPk(userId) // Se obtiene los datos del usuario por el ID
            .then((user) => {
                if(errors.isEmpty()) {  // Se valida si hay errores
                    if(req.file !== undefined) {   // Se pregunta si viene algun archivo
                    // Acá nos aseguramos de que no se borre la imagen que se agrega por defecto cuando un nuevo usuario se registra
                    if(fs.existsSync(path.join(__dirname, '../../public/images/profile/' + user.avatar))
                        && user.avatar !== "user-default.png") { // Se pregunta que el archivo que viene por req.file sea diferente
                          //Si todo está bien se borra el archivo anterior y se lo reemplaza
                          fs.unlinkSync(path.join(__dirname, '../../public/images/profile/' + user.avatar))}}
                          users.update({
                              name: req.body.name,
                              telefono: req.body.telefono !== ""? +req.body.telefono : "",
                              avatar: req.file.filename !== undefined ? req.file.filename : avatar
                            }, {where: {id: userId}})
                            .then(() =>  res.json(user)) 
                            .catch((error) => res.send(error))
                } else {
                    // Si hay errores se vuelve a renderizar la imagen con los errores encontrados
                    let userId = req.session.user.id;
                    users.findByPk(userId)
                    .then((user) => {
                        res.send({errors: errors.mapped()})
                    }).catch((error) => res.send(error))
                }
            })
            }catch (err){ res.send(err)}
    } ,
    processRegister: (req, res) => {
        let errors = validationResult(req);
             
        if(errors.isEmpty()){
            users.create({
                name:req.body.name,
                email: req.body.email,
                rol_id: 1,
                password: bcrypt.hashSync(req.body.password , 10),
                avatar: req.file ? req.file.filename : "user-default.png",
                telefono: req.body.telefono
            })
            .then((user) => {
                let resp = {
                    meta:{
                        status:200,
                        total:user.length,
                        url:'http://localhost:4000/api/user/create'
                    },
                    data:user
                }
                res.json(resp);
            }).catch((err) =>{ console.log(err)})
            }
        }
    }

