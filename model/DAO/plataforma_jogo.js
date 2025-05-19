/*******************************************************************************************************
 * Objetivo: Criar a comunicação com o Banco de Dados para fazer o CRUD de Plataforma_Jogo
 * Data: 07/05/2025
 * Autor: Israel
 * Versão: 1.0
 ******************************************************************************************************/

//import da biblioteca do prisma client para executar os scripts SQL
const { PrismaClient } = require('@prisma/client')

//Instancia (criar um objeto a ser utilizado) a biblioteca do prisma/client
const prisma = new PrismaClient()


//Função para inserir um nova PlataformaJogo
const insertPlataformaJogo = async function(PlataformaJogo){
    try {
        let sql = `insert into tbl_plataforma_jogo  (id_plataforma,id_jogo,id_versao,hardware) 
        values(
            ${PlataformaJogo.id_plataforma},
            ${PlataformaJogo.id_jogo},
            ${PlataformaJogo.id_versao},
            '${PlataformaJogo.hardware}'
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
const updatePlataformaJogo = async function(PlataformaJogo){
    try {
        let sql = `update tbl_plataforma_jogo set     id_plataforma       = '${PlataformaJogo.id_plataforma}',
                                                      id_jogo             = '${PlataformaJogo.id_jogo}',
                                                      id_versao           = '${PlataformaJogo.id_versao}'
                                                      hardware            = '${PlataformaJogo.hardware}'
                                                      where id = ${PlataformaJogo.id}`
        let resultPlataformaJogo = await prisma.$executeRawUnsafe(sql)
  
        if(resultPlataformaJogo){
            return true
        }else{
            return false
        }
    } catch (error) {
      return false
    }
}

//Função para excluir um FilmeGenero existente
const deletePlataformaJogo = async function(id){
    try {
      let sql = `delete from tbl_plataforma_jogo where id = ${id}`
  
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
const selectAllPlataformaJogo = async function(){

    try {
      //ScriptSQL para retornar todos os dados
      let sql = 'select * from tbl_plataforma_jogo order by id desc'

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
const selectByIdPlataformaJogo = async function(id){
    try {
      let sql = `select * from tbl_plataforma_jogo where id = ${id}`
  
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

const selectVersaoByIdJogo = async function (idJogo){
  try{
    let sql= `select tbl_versao.* from tbl_jogo
                    inner join tbl_plataforma_jogo
                      on tbl_jogo.id = tbl_plataforma_jogo.id_jogo
                    inner join tbl_versao
                      on tbl_versao.id = tbl_plataforma_jogo.id_versao
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

const selectJogoByIdVersao = async function (idVersao){
  try{
    let sql= `select tbl_jogo.* from tbl_versao
                    inner join tbl_plataforma_jogo
                      on tbl_versao.id = tbl_plataforma_jogo.id_versao
                    inner join tbl_jogo
                      on tbl_jogo.id = tbl_plataforma_jogo.id_jogo
                  where tbl_versao.id = ${idVersao}`

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

const selectVersaoBydIdPlataforma = async function (idPlataforma){
  try{
    let sql= `select tbl_versao.* from tbl_plataforma
                    inner join tbl_plataforma_jogo
                      on tbl_versao.id = tbl_plataforma_jogo.id_versao
                    inner join tbl_plataforma
                      on tbl_plataforma.id = tbl_plataforma_jogo.id_plataforma
                  where tbl_plataforma.id = ${idJogo}`

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

const selectPlataformaByIdVersao = async function (idVersao){
  try{
    let sql= `select tbl_plataforma.* from tbl_plataforma
                    inner join tbl_plataforma_jogo
                      on tbl_versao.id = tbl_plataforma_jogo.id_versao
                    inner join tbl_plataforma
                      on tbl_plataforma.id = tbl_plataforma_jogo.id_plataforma
                  where tbl_versao.id = ${idJogo}`

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


const selectPlataformaByIdJogo = async function(idJogo){
  try{
    let sql= `select tbl_plataforma.* from tbl_jogo
                    inner join tbl_plataforma_jogo
                      on tbl_jogo.id = tbl_plataforma_jogo.id_jogo
                    inner join tbl_plataforma
                      on tbl_plataforma.id = tbl_plataforma_jogo.id_plataforma
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

const selectJogoByIdPlataforma = async function(idPlataforma){
  try {
    let sql = `select tbl_jogo.* from tbl_plataforma 
                        inner join tbl_plataforma_jogo
                          on tbl_plataforma.id = tbl_jogo_plataforma.id_plataforma
                        inner join tbl_jogo
                          on tbl_jogo.id = tbl_jogo_plataforma.id_jogo
                    where tbl_plataforma.id = ${idPlataforma}`

    let result = await prisma.$queryRawUnsafe(sql)

    if (result)
      return result
    else 
      return false
} catch (error) {
    return false
}
}

module.exports = {
    insertPlataformaJogo,
    updatePlataformaJogo,
    deletePlataformaJogo,
    selectAllPlataformaJogo,
    selectByIdPlataformaJogo,
    selectPlataformaByIdJogo,
    selectJogoByIdPlataforma,
    selectVersaoByIdJogo
}