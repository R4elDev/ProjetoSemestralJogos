/*****************************************************************************************
 * Objetivo --> Model responsavel pelo CRUD de dados referente a plataforma no BANCO DE DADOS
 * Data --> 06/04/2025
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
        '${plataforma.tipo_de_plataforma}',
        '${plataforma.logo}'
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

const updatePlataforma = async function (plataforma){
    try{
        let sql = `update tbl_plataforma set 
        tipo_de_plataforma = '${plataforma.tipo_de_plataforma}', 
        logo = '${plataforma.logo}' 
        where id = ${plataforma.id}`

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

const deletePlataforma = async function (id){
    try{
        let idJogo = id

        let sql = `delete from tbl_plataforma where id=${idJogo}`

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

const selectAllPlataforma = async function (){
    try{
        let sql = `select * from tbl_plataforma`

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

const selectByIdPlataforma = async function (id){
    try{
        let idJogo = id
        let sql = `select * from tbl_plataforma where id=${idJogo}`

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
    insertPlataforma,
    updatePlataforma,
    deletePlataforma,
    selectAllPlataforma,
    selectByIdPlataforma
}