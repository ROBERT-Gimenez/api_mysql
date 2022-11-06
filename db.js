const Sequelize = require('sequelize');

const userModel = require('./models/usuarios');
const rolModel = require('./models/userRol');
const productModel = require('./models/producto');
const direccionModel = require('./models/direcciones');
const categoriModel = require('./models/categoria');
const carritoModel = require('./models/carrito');
const process = require('process');
require('dotenv').config();
const {DATABASE , USER , PASSWORD , HOST} = process.env

const sequelize = new Sequelize(
  DATABASE,
  USER,
  PASSWORD,
    {
      host: HOST,
      dialect: "mysql",
      dialectOptions: {
        ssl: {
          rejectUnauthorized: true,
        },
      },
      define: {
        timestamps: false,
      },
    }
  );


const users = userModel(sequelize , Sequelize);
const userRol = rolModel(sequelize , Sequelize);
const products = productModel(sequelize , Sequelize);
const direccion = direccionModel(sequelize , Sequelize);
const categori = categoriModel(sequelize , Sequelize);
const carrito = carritoModel(sequelize , Sequelize);

sequelize.sync({force : false})
.then(() => {
    console.log('tabla sincronizada')
})

module.exports = {users ,userRol,products,direccion,categori,carrito};