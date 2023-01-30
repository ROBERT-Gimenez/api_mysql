const {carrito ,products } = require("../../db");

module.exports = {
    CarroList:(req, res) => {
        carrito.findAll()
        .then((products) => {
            let respuesta = {
                meta: {
                    status : 200,
                    total: products.length,
                    url: 'https://localhost:3000/api/producto'
                },
                data: products
            }
                res.status(200).json(respuesta);
        }).catch((err)=> console.log(err))

        
    }, 
    CarritoUser:(req, res) => {
        carrito.findAll({ where: { id: req.params.id }})
        .then((products) => {
            let respuesta = {
                meta: {
                    status : 200,
                    total: products.length,
                    url: 'https://localhost:3000/api/producto'
                },
                data: products
            }
                res.status(200).json(respuesta);
        }).catch((err)=> console.log(err))

        
    }, 
    CarroAdded:async(req, res) => {
            const Product = await carrito.create(req.body)
            .then((user) => {
                res.json(user);
            }).catch((err)=>{console.log(err)})
        }
}
