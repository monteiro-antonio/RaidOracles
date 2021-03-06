var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var Publicacao = require('../models').Publicacao;
var guardiao = require('../models').guardiao;

/* ROTA QUE RECUPERA CRIA UMA PUBLICAÇÃO */
router.post('/publicar/:idUsuario', function (req, res, next) {
    console.log("Iniciando Publicação...")

    let idUsuario = req.params.idUsuario;

    Publicacao.create({
        descricao: req.body.descricao,
        fkClan: idUsuario
    }).then(resultado => {
        console.log("Post realizado com sucesso!!");
        res.send(resultado);
    }).catch(erro => {
        console.log('DEU UM ERRINHO')
        console.error(erro);
        res.status(500).send(erro.message);
    })
})

/* ROTA QUE RECUPERA TODAS AS PUBLICAÇÕES */
router.get('/', function (req, res, next) {
    console.log('Recuperando todas as publicações');

    let instrucaoSql = `SELECT 
    guardiao.idGuardian,
    descricao
    FROM publicacao
    INNER JOIN guardiao
    ON Publicacao.fkClan = guardiao.idClan
    ORDER BY publicacao.id DESC`;

    sequelize.query(instrucaoSql, {
        model: Publicacao,
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


/* ROTA QUE RECUPERA AS PUBLICAÇÕES DE UM USUÁRIO PELO ID */
router.get('/:idUsuario', function (req, res, next) {
    console.log('Recuperando todas as publicações');

    var idUsuario = req.params.idUsuario;

    let instrucaoSql = `SELECT 
    usuario.nome,
    descricao
    FROM publicacao
    INNER JOIN usuario
    ON Publicacao.fkUsuario = Usuario.id
    WHERE fkUsuario = ${idUsuario}
    ORDER BY publicacao.id DESC`;

    sequelize.query(instrucaoSql, {
        model: Publicacao,
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

/* ESTATÍSTICAS GUARDIÕES */
router.get('/grafico', function (req, res, next) {
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
