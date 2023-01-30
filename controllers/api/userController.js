const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator');
const {users,direccion} = require('../../db');
const path = require('path');
const fs = require('fs');
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const jwt = require("jsonwebtoken");
const config = require("../../config/auth.config.js");



   
  
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
        if (!req.body.avatar) {
            req.body.avatar = 'user-default.png';
          }
        req.body.password = bcrypt.hashSync(req.body.password , 10);
        const user = await users.create(req.body)
        .then((user) => {
            res.json(user);
        }).catch((err)=>{console.log(err)})
    },
    processLogin: (req, res) => {

        const secret = "BikeMaster22-secret-key";
        let errors = validationResult(req);

       
        if(errors.isEmpty()){
            users.findOne({
                where:{ email: req.body.email}
            })
            .then((user)=>{
            const payload = {
                    userId: user.id,
                    name: user.name
                  };
            const newToken  = jwt.sign(payload, secret);

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
                data:{user,token:newToken }
            }
            res.json(resp);
        }).catch((err) =>{ console.log(err)})
        }else{
            return res.status(401).send({
                errors: errors.errors[0].location,
                accessToken: null,
                message: errors.errors[0].msg
              });
        }},
    userDetail: async (req,res) => {
        try {
            const user = await users.findOne({
                where: { id: req.params.id },
            });            
            const direction = await direccion.findAll({
                where: { id:  user.direccion_id },
            });
            if (!direction) {
                return res.status(404).json({ message: "Direccion not found" });
            }          
            const response = {
                user,
                direction
            };
           return res.json(response);
   
               
               }catch (error) {
                console.log(error);
                return res.status(500).json({ message: "An error occured" })
          
       
    }},
    userAvatar:async (req, res) => {
        try {
          const user = await users.findOne({ where: { id: req.params.id } });
          const avatarPath = path.resolve(__dirname, '../../public/images/profile', user.avatar);
          fs.readFile(avatarPath, (err, data) => {
            if (err) {
              console.error(err);
              res.status(500).send('Error al leer la imagen del avatar');
              return;
            }
      
            res.set('Content-Type', 'image/jpeg');
            res.send(data);
          });
        } catch (err) {
          console.error(err);
          res.status(500).send('Error al obtener los datos del usuario');
        }
      },
    userUpdate:async (req,res)=> {
        try {
            let updateUser = {};
            let updateAddress = {};
            const user = await users.findByPk(req.params.id);


           
            if (req.body.name || req.body.telefono) {
                if (!user) throw new Error("user not found");
                
                if (req.body.name && req.body.name.trim().length === 0) throw new Error("name is empty")
                updateUser.name = req.body.name ? req.body.name : user.name;
                updateUser.telefono = req.body.telefono ? +req.body.telefono : user.telefono;
                }
                if ( req.file) {
                    updateUser.avatar = req.file ? req.file.filename :user.avatar;
                    
                if (req.file !== undefined) {
                    updateUser.avatar = req.file.filename;
                    if(fs.existsSync(path.join(__dirname, '../../public/images/profile/' + user.avatar))
                            && user.avatar !== "user-default.png") {
                        try {
                            fs.unlinkSync(path.join(__dirname, '../../public/images/profile/' + user.avatar))
                        } catch (err) {
                            console.log(`Error deleting old avatar for user ${user.id}: ${err}`)
                        }
                    }
                } else {
                    updateUser.avatar = user.avatar;
                }
            }
            if (req.body.direccion && req.body.provincia) {
              if(req.body.direccion.trim().length === 0) throw new Error("direccion is empty")
              updateAddress.direccion = req.body.direccion;
              updateAddress.altura = req.body.altura;
              updateAddress.localidad = req.body.localidad;
              updateAddress.provincia = req.body.provincia;
            }
           
           
                      
            let updatedAddress = await direccion.findOne({ where: { id: user.direccion_id } });
            if (!updatedAddress) {
              updatedAddress = await direccion.create(updateAddress);
            } else {
              updatedAddress = await updatedAddress.update(updateAddress);
            }
            
            const updatedUser = await users.update({name:updateUser.name ,
                                telefono:updateUser.telefono ,
                                avatar:updateUser.avatar  ,
                                direccion_id:updatedAddress.id ,
                                altura:updateAddress.altura },
                                { where: { id: req.params.id } });
            res.status(200).json({ message:'User and address updated' , user: updatedUser, address: updatedAddress });
          }catch (error) {
            console.log(error);
            res.status(404).json({
                message: 'Error updating user and address',
                name: error.name,
                code: error.code,
                stack: error.stack,
                message: error.message
              });  
            }
        }
       ,
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

