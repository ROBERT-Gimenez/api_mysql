module.exports = ( sequelize , type) => {
    return sequelize.define('usuario' , {
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
        direccion_id:{
            type:type.INTEGER(11),
            allowNull: true
        },
        rol_id: {
            type: type.INTEGER(11),
            allowNull: false,
        },
        email: {
            type: type.STRING(60),
            allowNull: false,
        },
        password: {
            type: type.STRING(300),
        },
        avatar: {
            type: type.STRING(1000),
            allowNull: true
        },
        telefono: {
            type: type.INTEGER(20),
            allowNull: true
        },
        social_id: {
            type:type.STRING(100),
            defaultValue: null
        },
        social_provider: {
            type:type.STRING(100),
            defaultValue: null
        }

    })
}