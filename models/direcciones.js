module.exports = ( sequelize , type) => {
    return sequelize.define('Direcciones' , {
        id: {
            type: type.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        direccion: {
            type: type.STRING(100),
            allowNull: true
        },
        altura: {
            type: type.STRING(20),
            allowNull: true
        },
        codigo_postal: {
            type: type.STRING(10),
            allowNull: true
        },
        localidad: {
            type: type.STRING(50),
            allowNull: true
        },
        pais: {
            type: type.STRING(40),
            allowNull: true
        },
        provincia: {
            type: type.STRING(40),
            allowNull: true
        }
    })
}