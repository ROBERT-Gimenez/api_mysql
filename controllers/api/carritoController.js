const {carrito ,products } = require("../../db");

module.exports = {
    CarroList:(req, res) => {
        carrito.findAll()
        .then((products) => {
            let respuesta = {
                meta: {
                    status : 200,
                    total: products.length,
                    url: 'https://localhost:4000/api/Carrito'
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
                    url:'https://localhost:4000/api/Carrito/addedToShopping/:id'
                },
                data: products
            }
                res.status(200).json(respuesta);
        }).catch((err)=> console.log(err))

        
    }, 
    CarroAdded:(req, res) => {
            const prod = req.body.product_id
            const user = req.body.usuario_id
            carrito.findOne({ where: { product_id: prod, usuario_id: user } })
            .then((product) => {

              if (!product) {
                carrito.create({
                  usuario_id: req.body.usuario_id,
                  product_id: req.body.product_id
                }).then((user) => {

                  res.json(user);

                }).catch((err) => {
                  console.log("error = " + err );
                });
              } else {
                console.log("Product already exists");
                res.status(400).send({ message: "Product already exists" });
              }
            }).catch((err) => {

              console.log("error = "+ err );

            });
        }
}
