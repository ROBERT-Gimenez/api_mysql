module.exports = ( sequelize , type) => {
    return sequelize.define('carrito' , {
        id: {
            type: type.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        product_id: {
            type: type.INTEGER(11),
            allowNull: false,
        },
        usuario_id: {
            type: type.INTEGER(11),
            allowNull: false,
        }
    })
}