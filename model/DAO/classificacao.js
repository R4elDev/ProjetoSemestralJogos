/*****************************************************************************************
 * Objetivo --> Model responsavel pelo CRUD de dados referente a CLASSIFICACAO no BANCO DE DADOS
 * Data --> 10/04/2025
 * Autor --> Israel
 * Versão --> 1.0
 ****************************************************************************************/
// Import da biblioteca do PRISMA/CLIENT para executar scripts no Banco de Dados
const { PrismaClient } = require('@prisma/client')


//Instancia da classe do prisma client, para gerar um objeto
const prisma = new PrismaClient()

// Função para inserir no Banco De Dados um novo Jogo
const insertClassificacao = async function (classificacao){
    try{
        let sql = `insert into tbl_classificacao(tipo_de_classificacao)values('${classificacao.tipo_de_classificacao}');`

        // Executa o script SQL no BD e aguarda o retorno no BD
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
// Função para atualizar no Banco De Dados um jogo existente
const updateClassificacao = async function (classificacao){
    try{
        let sql = `update tbl_classificacao set tipo_de_classificacao = '${classificacao.tipo_de_classificacao}' where id = ${classificacao.id}`

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
// Função para excluir no Banco De Dados um jogo existente
const deleteClassificacao = async function (id){
    try{
        let idClassificacao = id

        let sql = `delete from tbl_classificacao where id=${idClassificacao}`

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
// Função para retornar do Banco De Dados uma lista de Jogos
const selectAllClassificacao = async function (){
    try{
        let sql = `select * from tbl_classificacao`

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
// Função para buscar no Banco de Dados um Jogo pelo ID
const selectByIdClassificacao = async function (id){
    try{
        let idClassificacao = id
        let sql = `select * from tbl_classificacao where id=${idClassificacao}`

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
    insertClassificacao,
    updateClassificacao,
    deleteClassificacao,
    selectAllClassificacao,
    selectByIdClassificacao
}