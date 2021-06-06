'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes) => {
    let Publicacao = sequelize.define('Publicacao',{	
		id: {
			field: 'id',
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},	
        descricao: {
            field: 'descricao',
            type: DataTypes.STRING,
            allowNull: false
        },
        fkClan: {
            field: 'fkClan',
            type: DataTypes.INTEGER,
            allowNull: false
        }
	}, 
	{
		tableName: 'publicacao', 
		freezeTableName: true, 
		underscored: true,
		timestamps: false,
	});

    return Publicacao;
};
