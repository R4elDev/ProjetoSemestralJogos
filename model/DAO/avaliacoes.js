/*****************************************************************************************
 * Objetivo --> Model responsavel pelo CRUD de dados referente a avaliacoes no BANCO DE DADOS
 * Data --> 07/05/2025
 * Autor --> Israel
 * Versão --> 1.0
 ****************************************************************************************/

// Import da biblioteca do PRISMA/CLIENT para executar scripts no Banco de Dados
const { PrismaClient } = require('@prisma/client')


//Instancia da classe do prisma client, para gerar um objeto
const prisma = new PrismaClient()

const insertAvaliacao = async function (avaliacao){
    try {
        let sql = `insert into tbl_avaliacoes(comentarios,quantidade_de_estrelas,id_jogo)
    values(
        '${avaliacao.comentarios}',
        '${avaliacao.quantidade_de_estrelas}',
        '${avaliacao.id_jogo}'
    );`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result){
            return true
        } else {
            return false
        }
    } catch(error){
        return false
    }
}

const updateAvaliacao = async function (avaliacao){
    try{
        let sql = `update tbl_avaliacoes set 
        comentarios = '${avaliacao.comentarios}', 
        quantidade_de_estrelas = '${avaliacao.quantidade_de_estrelas}',
        id_jogo = '${avaliacao.id_jogo}'
        where id = ${avaliacao.id}`

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

const deleteAvaliacao = async function (id){
    try{
        let idJogo = id

        let sql = `delete from tbl_avaliacoes where id=${idJogo}`

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

const selectAllAvaliacao = async function (){
    try{
        let sql = `select * from tbl_avaliacoes`

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

const selectByIdAvaliacao = async function (id){
    try{
        let idJogo = id
        let sql = `select * from tbl_avaliacoes where id=${idJogo}`

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
    insertAvaliacao,
    updateAvaliacao,
    deleteAvaliacao,
    selectAllAvaliacao,
    selectByIdAvaliacao
}