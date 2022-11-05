module.exports = ( sequelize , type) => {
    return sequelize.define('Categorias' , {
        id: {
            type: type.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        nombre: {
            type: type.STRING(45),
            allowNull: false,
        }
    })
}