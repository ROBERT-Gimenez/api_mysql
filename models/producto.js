module.exports = ( sequelize , type) => {
    return sequelize.define('Producto' , {
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
    })
}