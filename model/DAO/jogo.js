/*****************************************************************************************
 * Objetivo --> Model responsavel pelo CRUD de dados referente a JOGOS no BANCO DE DADOS
 * Data --> 13/02/2025
 * Autor --> Israel
 * Versão --> 1.0
 ****************************************************************************************/

//TRY-CATCH - usado para nao derrubar a api depois de subir ela, e usando o console.log ela guia o lugar do erro (Sempre usar Try-Catch)

//quando for script que nao retorna dados (insert,update e delete) ->RawUnsafe
//quando for script que tem algum retorno (return) - queryRawUnsafe



// Import da biblioteca do PRISMA/CLIENT para executar scripts no Banco de Dados
const { PrismaClient } = require('@prisma/client')


//Instancia da classe do prisma client, para gerar um objeto
const prisma = new PrismaClient()

// Função para inserir no Banco De Dados um novo Jogo
const insertJogo = async function (jogo) {

    try {
        let sql = `insert into tbl_jogo(nome,data_lancamento,versao,tamanho,descricao,foto_capa,link)
    values(
        '${jogo.nome}',
        '${jogo.data_lancamento}',
        '${jogo.versao}',
        '${jogo.tamanho}',
        '${jogo.descricao}',
        '${jogo.foto_capa}',
        '${jogo.link}'
    );`

        // Executa o script SQL no BD e AGUARDA O retorno no BD
        let result = await prisma.$executeRawUnsafe(sql)

        if (result) {
            return true
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

// Função para atualizar no Banco De Dados um jogo existente
const updateJogo = async function () {

}

// Função para excluir no Banco De Dados um jogo existente
const deleteJogo = async function (jogo) {
    
}

// Função para retornar do Banco De Dados uma lista de Jogos
const selectAllJogo = async function () {
    try{

        // Script SQL para retornar os dados do BD
        let sql = `select * from tbl_jogo`

        // Executa o script SQL e aguarda o retorno dos dados
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
const selectByIdJogo = async function (jogo) {
    
    try{
        let idJogo = jogo
        let sql = `select * from tbl_jogo where id=${idJogo}`

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
    insertJogo,
    updateJogo,
    deleteJogo,
    selectAllJogo,
    selectByIdJogo
}


