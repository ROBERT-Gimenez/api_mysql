const {products , categori } = require("../../db");
const {validationResult} = require("express-validator");
const fs = require("fs");
const path = require("path");
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
    detalle: (req, res) => {
        products.findByPk(+req.params.id)
        .then((product) => {
            let respuesta = {
                meta: {
                    status : 200,
                    total: products.length,
                    url: `https://localhost:4000/api/producto/${product.id}`
                },
                data: product
            }
                res.status(200).json(respuesta);
        })
    },
    imgs:(req, res) => {
        products.findByPk(+req.params.id)
        .then((product) => {
          const filePath = path.resolve(__dirname, '../../public/images/products', product.image);
          fs.readFile(filePath, (err, data) => {
            if (err) {
              // maneja el error aquí
              console.error(err);
              res.status(500).send('Error al leer el archivo de imagen');
              return;
            }
            res.set('Content-Type', 'image/jpeg');
            res.send(data);
          });
        })},
    create:async(req , res) => {
        try{
            await products.create(req.body)
            .then((product) => { res.status(200).json(product)})
        }catch(err){res.send(err)}
    },
    productUpdate:async(req,res) =>{
        try{
            if(req.file != undefined){
                await products.findByPk(+req.params.id)
                    .then((Producto)=>{
                    let image = Producto.image;
                    try{ 
                        if(fs.existsSync(path.join(__dirname ,'../../public/images/products/'+ image))){
                            fs.unlinkSync(path.join(__dirname ,'../../public/images/products/'+ image))
                        }}catch(err){ res.send(err)           
                        }                              
                }).catch((error)=>{ res.send(error)})
                    
        }
            let errors = validationResult(req);
            console.log(errors)
            if(errors.isEmpty()){
                try{
                    let product =  await products.update({//el metodo update retorna la cantidad de elementos modificados ("1") 
                        name: req.body.name,
                        price: req.body.price,
                        categoryid: req.body.categoryid,
                        description: req.body.description,
                        marca: req.body.marca,
                        discount: req.body.discount,
                        stock: req.body.stock,
                        image: req.file? req.file.filename : this.image,
                },{ where: { id: req.params.id}     });
                let productUpdate = await products.findByPk(req.params.id);//por ello solicitamos el elementos modificado para enviarlo
                   return res.status(200).json(productUpdate)
                }catch(err){console.log(err)}
            }
    }catch(err){console.log(err)}
},
    delete:async(req,res) => {
        try {
            let productId = +req.params.id;
            let product = await products.findByPk(productId);
            if(fs.existsSync(path.join(__dirname, '../../public/img/products/' + product.image)) 
            && product.image !== "product-default-4.png") {
                fs.unlinkSync(path.join(__dirname, '../../public/img/products/' + product.image))
                let productDelete = await products.destroy({ where: { id: productId } });
            
            }else {

                let productDelete = await products.destroy({ where: { id: productId } });
            }

            res.send("eliminado")

        } catch (error) {
            res.send(error)
        }
    },
}

