const {products} = require("../../db");

module.exports = {
    list: (req, res) => {
        products.findAll()
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
        })

        
    }, 
    detalle:async (req , res) => {
        try{
            let producto = await products.findOne({where:{id:+req.params.id}},{include: ['category']} );

            return res.status(200).json(producto);

        }catch(error){res.send(error)}
    },

}