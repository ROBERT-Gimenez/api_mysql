module.exports = ( sequelize , type) => {
    const Producto = sequelize.define('Producto' , {
        id: {
            type: type.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        name: {
            type: type.STRING(60),
            allowNull: false,
        },
        categoryid: {
            type: type.INTEGER(11),
            allowNull: false
        },
        description: {
            type: type.TEXT,
            allowNull: false,
        },
        marca: {
            type: type.STRING(60),
            allowNull: true
        },
        discount: {
            type: type.INTEGER(5),
            allowNull: true
        },
        stock: {
            type: type.INTEGER(11),
            allowNull: false,
        },
        image:{
            type:type.STRING(100),
        },
        price: {
            type: type.DECIMAL(10.0),
            allowNull: false,
        },
        user_id: {
            type: type.INTEGER(11),
            
        }
    }
    )
     /* Creating a relationship between the Producto and Categoria and Usuarios tables. */
     Producto.associate = (models) => {
        Producto.belongsTo(models.Categoria, {
            as:"category" ,
            foreignKey:"categoryid",
        })
        Producto.belongsTo(models.Usuarios , {
            as:"Usuario",
            foreignKey:"user_id",
        })
    }
    return Producto

}