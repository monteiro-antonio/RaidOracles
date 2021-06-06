var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var guardiao = require('../models').guardiao;


/* ESTATÍSTICAS GUARDIÕES */
router.get('/graficos', function (req, res, next) {
    console.log('Estatísticas dos guardiões');

    let instrucaoSql = `select 
    (select count(hunter) from guardiao where hunter = 1) as hunter,
    (select count(titan) from guardiao where titan = 1) as titan,
    (select count(warlock) from guardiao where warlock = 1) as warlock;`;

    sequelize.query(instrucaoSql, {
        model: guardiao,
        mapToModel: true
    })
        .then(resultado => {
            console.log(`Encontrados: ${resultado.length}`);
            res.json(resultado);
        }).catch(erro => {
            console.error(erro);
            res.status(500).send(erro.message);
        });
});

module.exports = router;
