/*******************************************************************************************************
 * Objetivo: Criar a comunicação com o Banco de Dados para fazer o CRUD de Jogo_desenvolvedora
 * Data: 07/05/2025
 * Autor: Israel
 * Versão: 1.0
 ******************************************************************************************************/

//import da biblioteca do prisma client para executar os scripts SQL
const { PrismaClient } = require('@prisma/client')

//Instancia (criar um objeto a ser utilizado) a biblioteca do prisma/client
const prisma = new PrismaClient()


//Função para inserir um nova PlataformaJogo
const insertJogoDesenvolvedora = async function(JogoDesenvolvedora){
    try {
  
        let sql = `insert into tbl_jogo_desenvolvedora (id_jogo,id_desenvolvedora) 
        values(
            '${JogoDesenvolvedora.id_jogo}',
            '${JogoDesenvolvedora.id_desenvolvedora}'
        );`
  
        //Executa o scriptSQL no banco de dados e aguarda o retorno do BD para 
        //saber se deu certo                                  
        let result = await prisma.$executeRawUnsafe(sql)
  
        if(result){
            return true
        }else{
            return false
        }
    } catch (error) {
        return false
    }
}

//Função para atualizar uma PlataformaJogo existente
const updateJogoDesenvolvedora = async function(JogoDesenvolvedora){
    try {
        let sql = `update tbl_jogo_desenvolvedora set     id_jogo       = '${JogoDesenvolvedora.id_jogo}',
                                                      id_desenvolvedora             = '${JogoDesenvolvedora.id_desenvolvedora}'
                                                      where id = ${JogoDesenvolvedora.id}`
        let resultJogoDesenvolvedora = await prisma.$executeRawUnsafe(sql)
  
        if(JogoDesenvolvedora){
            return true
        }else{
            return false
        }
    } catch (error) {
      return false
    }
}

//Função para excluir um FilmeGenero existente
const deleteJogoDesenvolvedora = async function(id){
    try {
      let sql = `delete from tbl_jogo_desenvolvedora where id = ${id}`
  
      let result = await prisma.$executeRawUnsafe(sql)
  
      if (result){
        return true
      }else{
        return false
      }
    } catch (error) {
      return false
    }
}

//Função para retornar todos os FilmeGeneros existentes
const selectAllJogoDesenvolvedora = async function(){

    try {
      //ScriptSQL para retornar todos os dados
      let sql = 'select * from tbl_jogo_desenvolvedora order by id desc'

      //Executa o scriptSQL no BD e aguarda o retorno dos dados
      let result = await prisma.$queryRawUnsafe(sql)

      if(result){
        return result
      }else{
        return false
      }

    } catch (error) {
      return false
    }
}

//Função para buscar um FilmeGenero pelo ID
const selectByIdJogoDesenvolvedora = async function(id){
    try {
      let sql = `select * from tbl_jogo_desenvolvedora where id = ${id}`
  
      let result = await prisma.$queryRawUnsafe(sql)
  
      if(result){
        return result
      }else{
        return false
      }
    } catch (error) {
      return false
    }
}

const selectDesenvolvedoraByIdJogo = async function(idJogo){
  try{
    let sql= `select tbl_desenvolvedora.* from tbl_jogo
                    inner join tbl_jogo_desenvolvedora
                      on tbl_jogo.id = tbl_jogo_desenvolvedora.id_jogo
                    inner join tbl_desenvolvedora
                      on tbl_desenvolvedora.id = tbl_jogo_desenvolvedora.id_desenvolvedora
                  where tbl_jogo.id = ${idJogo}`

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

const selectJogoByIdDesenvolvedora = async function(idDesenvolvedora){
  try{
    let sql = `SELECT tbl_jogo.* FROM tbl_jogo
                INNER JOIN tbl_jogo_desenvolvedora
                  ON tbl_jogo.id = tbl_jogo_desenvolvedora.id_jogo
                INNER JOIN tbl_desenvolvedora
                  ON tbl_desenvolvedora.id = tbl_jogo_desenvolvedora.id_desenvolvedora
                WHERE tbl_desenvolvedora.id = ${idDesenvolvedora};
                `

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
    insertJogoDesenvolvedora,
    updateJogoDesenvolvedora,
    deleteJogoDesenvolvedora,
    selectAllJogoDesenvolvedora,
    selectByIdJogoDesenvolvedora,
    selectDesenvolvedoraByIdJogo,
    selectJogoByIdDesenvolvedora
}