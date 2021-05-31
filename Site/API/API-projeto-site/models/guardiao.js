	'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes) => {
    let guardiao = sequelize.define('guardiao',{
		id: {
			field: 'idClan',
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},	
		idGuardian: {
			field: 'idGuardian',
			type: DataTypes.STRING,
			allowNull: false
		},	
		plataforma: {
			field: 'plataforma',
			type: DataTypes.STRING,
			allowNull: false
		},
		senha: {
			field: 'senha',
			type: DataTypes.STRING,
			allowNull: false
		},
		hunter: {
			field: 'hunter',
			type: DataTypes.INTEGER,
			allowNull: true
		},
		titan: {
			field: 'titan',
			type: DataTypes.INTEGER,
			allowNull: true
		},
		warlock: {
			field: 'warlock',
			type: DataTypes.INTEGER,
			allowNull: true
		}
	}, 
	{
		tableName: 'guardiao', 
		freezeTableName: true, 
		underscored: true,
		timestamps: false,
	});

    return guardiao;
};
