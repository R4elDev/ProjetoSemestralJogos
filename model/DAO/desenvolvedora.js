/*****************************************************************************************
 * Objetivo --> Model responsavel pelo CRUD de dados referente a DESENVOLVEDORA no BANCO DE DADOS
 * Data --> 10/04/2025
 * Autor --> Israel
 * Versão --> 1.0
 ****************************************************************************************/

// Import da biblioteca do PRISMA/CLIENT para executar scripts no Banco de Dados
const { PrismaClient } = require('@prisma/client')


//Instancia da classe do prisma client, para gerar um objeto
const prisma = new PrismaClient()


// Função para inserir no Banco De Dados uma nova desenvolvedora
const insertDesenvolvedora = async function(desenvolvedora){
    try{
        let sql = `insert into tbl_desenvolvedora(logo,link)
        values(
            '${desenvolvedora.logo}',
            '${desenvolvedora.link}'
        );` 

        let result = await prisma.$executeRawUnsafe(sql)

        if (result){
            return true
        } else{
            return false
        }
    }catch(error){
        return false
    }
}

// Função para atualizar no Banco De Dados uma desenvolvedora existente
const updateDesenvolvedora = async function(desenvolvedora){
    try{
        let sql = `update tbl_desenvolvedora set logo = '${desenvolvedora.logo}', link = '${desenvolvedora.link}' where id = ${desenvolvedora.id}`

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

// Função para excluir no Banco De Dados uma desenvolvedora existente
const deleteDesenvolvedora = async function(id){
    try{
        let idDesenvolvedora = id
        let sql = `delete from tbl_desenvolvedora where id=${idDesenvolvedora}`

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

// Função para retornar do Banco De Dados uma lista de desenvolvedora
const selectAllDesenvolvedora = async function(){
    try{
        let sql = `select * from tbl_desenvolvedora`

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

// Função para buscar no Banco de Dados uma desenvolvedora pelo ID
const selectByIdDesenvolvedora = async function(id){
    try{
        let idDesenvolvedora = id
        let sql = `select * from tbl_desenvolvedora where id=${idDesenvolvedora}`

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
    insertDesenvolvedora,
    updateDesenvolvedora,
    deleteDesenvolvedora,
    selectAllDesenvolvedora,
    selectByIdDesenvolvedora
}