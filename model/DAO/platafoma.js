/*****************************************************************************************
 * Objetivo --> Model responsavel pelo CRUD de dados referente a plataforma no BANCO DE DADOS
 * Data --> 03/04/2025
 * Autor --> Israel
 * Versão --> 1.0
 ****************************************************************************************/

// Import da biblioteca do PRISMA/CLIENT para executar scripts no Banco de Dados
const { PrismaClient } = require('@prisma/client')


//Instancia da classe do prisma client, para gerar um objeto
const prisma = new PrismaClient()

const insertPlataforma = async function (plataforma){
    try {
        let sql = `insert into tbl_plataforma(tipo_de_plataforma,logo)
    values(
        '${plataforma.tipo_de_plataforma}'






    );`



    } catch(error){
        return false
    }
}

const updatePlataforma = async function (plataforma){

}

const deletePlataforma = async function (id){

}

const selectAllPlataforma = async function (){

}

const selectByIdPlataforma = async function (id){

}


module.exports = {
    insertPlataforma,
    updatePlataforma,
    deletePlataforma,
    selectAllPlataforma,
    selectByIdPlataforma
}