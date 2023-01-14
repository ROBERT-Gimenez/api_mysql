const bcrypt = require('bcryptjs')
const {direccion} = require('../../db');


   
  
module.exports= {
    list:async (req,res)=> {
       await direccion.findAll()
        .then((user) => {
            let resp = {
                meta:{
                    status:200,
                    total:user.length,
                    url:'http://localhost:4000/api/direction'
                },
                data:user
            }
            res.json(resp);
        }).catch((err) =>{ console.log(err)})
    },
}