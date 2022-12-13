const {Carrito ,products , categori } = require("../../db");


module.exports = {
    comprasList:(res , req) => {
        Carrito.findAll()
        .then((compras) => {
        return products.findAll()
        .then((prod) => {
            const compras = prod.filter((prod) => {
                if(prod.id == compras.id){
                    return prod
                }
                })
            let respuesta = {
                meta: {
                    status : 200,
                    total: products.length,
                    url: 'https://localhost:3000/api/producto'
                },
                data: products
                }
            res.status(200).json(respuesta);
            })
           })
    }
}