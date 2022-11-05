const {userRol} = require('../../db');

module.exports= {
    list:(req,res)=> {
        userRol.findAll()
        .then((rols) => {
            let resp = {
                meta:{
                    status:200,
                    total:rols.length,
                    url:'http://localhost:3000/api/user'
                },
                data:rols
            }
            res.json(resp);
        })
    },
    create:(req,res) => {
        userRol.create(req.body)
        .then((rol) => {
            res.json(rol);
        })
    }
}