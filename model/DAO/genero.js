/*****************************************************************************************
 * Objetivo --> Model responsavel pelo CRUD de dados referente a GENERO no BANCO DE DADOS
 * Data --> 09/04/2025
 * Autor --> Israel
 * Versão --> 1.0
 ****************************************************************************************/

// Import da biblioteca do PRISMA/CLIENT para executar scripts no Banco de Dados
const { PrismaClient } = require('@prisma/client')


//Instancia da classe do prisma client, para gerar um objeto
const prisma = new PrismaClient()


// Função para inserir no Banco De Dados um novo Jogo
const insertGenero = async function (genero){
    try{
        let sql = `insert into tbl_genero(tipo_de_genero)
        values(
        '${genero.tipo_de_genero}'
        );`

        // Executa o script SQL no BD e AGUARDA o retorno do BD
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
const updateGenero = async function (genero){
    try{
        let sql = `update tbl_genero set tipo_de_genero = '${genero.tipo_de_genero}'`

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
const deleteGenero = async function (id){
    try{
        let idGenero = id
        let sql = `delete from tbl_genero where id=${idGenero}`

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
const selectAllGenero = async function (){
    try{
        let sql = `select * from tbl_genero`

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
const selectByIdGenero = async function (id){
    try{
        let idGenero = id
        let sql = `select * from tbl_genero where id=${idGenero}`

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
    insertGenero,
    updateGenero,
    deleteGenero,
    selectAllGenero,
    selectByIdGenero
}
