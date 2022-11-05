module.exports = ( sequelize , type) => {
    return sequelize.define('userRol' , {
        id: {
            type: type.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        name: {
            type: type.STRING(60),
            allowNull: false,
        }

    })
}