/*****************************************************************************************
 * Objetivo --> Model responsavel pelo CRUD de dados referente a versão no BANCO DE DADOS
 * Data --> 08/04/2025
 * Autor --> Israel
 * Versão --> 1.0
 ****************************************************************************************/

// Import da biblioteca do PRISMA/CLIENT para executar scripts no Banco de Dados
const { PrismaClient } = require('@prisma/client')


//Instancia da classe do prisma client, para gerar um objeto
const prisma = new PrismaClient()

const insertVersao = async function(versao){
    try{
        let sql = `insert into tbl_versao(tipo_de_versao)
        values(
            '${versao.tipo_de_versao}'
        );`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result){
            return true
        } else {
            return false
        }
    }catch(error){
        return false
    }
}

const updateVersao = async function (versao){
    try{
        let sql = `update tbl_versao set tipo_de_versao = '${versao.tipo_de_versao}'`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result){
            return true
        } else {
            return false
        }
    }catch(error){
        return false
    }
}

const deleteVersao = async function (id){
    try{
        let idVersao = id

        let sql = `delete from tbl_versao where id=${idVersao}`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result){
            return true
        }else{
            return false
        }
    }catch(error){
        return false
    }
}

const selectAllVersao = async function (){
    try{
        let sql = `select * from tbl_versao`

        let result = await prisma.$queryRawUnsafe(sql)

        if(result){
            return result
        }else{
            return false
        }
    }catch(error){
        return false
    }
}

const selectByIdVersao = async function (id){
    try{
        let idVersao = id
        let sql = `select * from tbl_versao where id=${idVersao}`

        let result = await prisma.$queryRawUnsafe(sql)

        if(result){
            return result
        }else{
            return false
        }
    }catch(error){
        return false
    }
}

module.exports = {
    insertVersao,
    updateVersao,
    deleteVersao,
    selectAllVersao,
    selectByIdVersao
}