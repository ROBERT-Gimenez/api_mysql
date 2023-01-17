module.exports = ( sequelize , type) => {
    const usuario = sequelize.define('usuario' , {
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
            allowNull: true,
            references: {
                model: 'direcciones',
                key: 'id'
        }},
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
            type: type.STRING(20),
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

    });

    usuario.associate = (models) => {
        Usuario.belongsTo(models.direcciones, {
            foreignKey: 'direccion_id',
            as: 'direccion'
        })
};
return usuario

}