/**********************************************************************************
 * Objetivo: Controller responsável pela regra de negócio referente ao CRUD de Jogo Genero
 * Data: 18/05/2025
 * Autor: Israel
 * Versão: 1.0
 **********************************************************************************/

//Import do arquivo de mensagens e status code do projeto
const message = require('../../modulo/config.js')

//Import do aquivo para realizar o CRUD de dados no Banco de Dados
const jogoGeneroDAO = require('../../model/DAO/jogo_genero.js')


//Função para tratar a inserção de uma nova Plataforma Jogo no DAO
const inserirJogoGenero = async function(jogoGenero, contentType){
    try {
        if(contentType == 'application/json')
        {
                if (
                    jogoGenero.id_jogo      == ''           || jogoGenero.id_jogo     == undefined    || jogoGenero.id_jogo  == null || isNaN(jogoGenero.id_jogo)  || jogoGenero.id_jogo <=0 ||
                    jogoGenero.id_genero             == ''           || jogoGenero.id_genero           == undefined    || jogoGenero.id_genero == null        || isNaN(jogoGenero.id_genero)                 || jogoGenero.id_genero<=0 
                )
                {
                    return message.ERROR_REQUIRED_FIELDS //400
                }else{
                    //Chama a função para inserir no BD e aguarda o retorno da função
                    let resultJogoGenero = await jogoGeneroDAO.insertJogoGenero(jogoGenero)
                    if(resultJogoGenero)
                        return message.SUCCESS_CREATED_ITEM //201
                    else
                        return message.ERROR_INTERNAL_SERVER_MODEL //500
                }
        }else{
            return message.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para tratar a atualização de uma nova Plataforma Jogo no DAO
const atualizarJogoGenero = async function(id, jogoGenero, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
            {
                if (id                                == ''           || id                       == undefined    || id                    == null || isNaN(id)  || id  <= 0   ||
                    jogoGenero.id_jogo             == ''           || jogoGenero.id_jogo           == undefined    || jogoGenero.id_jogo == null        || isNaN(jogoGenero.id_jogo)                 || jogoGenero.id_jogo<=0                 ||
                    jogoGenero.id_genero           == ''           || jogoGenero.id_genero         == undefined    || jogoGenero.id_genero == null      || isNaN(jogoGenero.id_genero)               || jogoGenero.id_genero<=0
                )
                {
                    return message.ERROR_REQUIRED_FIELDS //400
                }else{
                    //Validação para verificar se o ID existe no BD
                    let resultJogoGenero = await jogoGeneroDAO.selectByIdJogoGenero(parseInt(id))

                    if(resultJogoGenero != false || typeof(resultJogoGenero) == 'object'){
                        if(resultJogoGenero.length > 0 ){
                            //Update
                            //Adiciona o ID do genero no JSON com os dados
                            jogo.id = parseInt(id)

                            let result = await jogoGeneroDAO.updateJogoGenero(jogoGenero)

                            if(result){
                                return message.SUCCESS_UPDATED_ITEM //200
                            }else{
                                return message.ERROR_INTERNAL_SERVER_MODEL //500
                            }
                        }else{
                            return message.ERROR_NOT_FOUND //404
                        }
                    }else{
                        return message.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                }
            }else{
                return message.ERROR_CONTENT_TYPE //415
            }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para tratar a exclusão de uma nova Plataforma Jogo no DAO
const excluirJogoGenero = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <=0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{

            //Funcção que verifica se  ID existe no BD
            let resultJogoGenero = await jogoGeneroDAO.selectByIdJogoGenero(parseInt(id))

            if(resultJogoGenero != false || typeof(resultJogoGenero) == 'object'){
                //Se existir, faremos o delete
                if(resultJogoGenero.length > 0){
                    //delete
                    let result = await jogoGeneroDAO.deleteJogoGenero(parseInt(id))

                    if(result){
                        return message.SUCCESS_DELETED_ITEM //200
                    }else{
                        return message.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                }else{
                    return message.ERROR_NOT_FOUND //404
                }
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para tratar o retorno de uma lista de uma Plataforma Jogo do DAO
const listarJogoGenero = async function(){
    try {
        //Objeto do tipo JSON
        let dadosJogoGenero = {}
        //Chama a função para retornar os generos cadastrados
        let resultJogoGenero = await jogoGeneroDAO.selectAllJogoGenero()

        if(resultJogoGenero != false || typeof(resultJogoGenero) == 'object'){
            if(resultJogoGenero.length > 0){
                //Criando um JSON de retorno de dados para a API
                dadosJogoGenero.status = true
                dadosJogoGenero.status_code = 200
                dadosJogoGenero.items = resultJogoGenero.length
                dadosJogoGenero.jogos_generos = resultJogoGenero

                return dadosJogoGenero
            }else{
                return message.ERROR_NOT_FOUND //404
            }
        }else{
            return message.ERROR_INTERNAL_SERVER_MODEL //500
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para tratar o retorno de um genero filtrando pelo ID do DAO
const buscarJogoGenero = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <=0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
            let dadosJogoGenero = {}

            let resultJogoGenero = await jogoGeneroDAO.selectByIdJogoGenero(parseInt(id))
            
            if(resultJogoGenero != false || typeof(resultJogoGenero) == 'object'){
                if(resultJogoGenero.length > 0){
                     //Criando um JSON de retorno de dados para a API
                     dadosJogoGenero.status = true
                     dadosJogoGenero.status_code = 200
                     dadosJogoGenero.generos = resultJogoGenero

                    return dadosJogoGenero //200
                }else{
                    return message.ERROR_NOT_FOUND //404
                }
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const buscarGeneroPorJogo = async function(idJogo){
    try {
        if(idJogo == '' || idJogo == undefined || idJogo == null || isNaN(idJogo) || idJogo <=0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
            let dadosJogoGenero = {}

            let resultJogoGenero = await jogoGeneroDAO.selectGeneroByIdJogo(parseInt(idJogo)) // SEMPRE COLOQUE O NOME CERTO DA FUNÇÃO
            
            if(resultJogoGenero != false || typeof(resultJogoGenero) == 'object'){
                if(resultJogoGenero.length > 0){
                     //Criando um JSON de retorno de dados para a API
                     dadosJogoGenero.status = true
                     dadosJogoGenero.status_code = 200
                     dadosJogoGenero.generos = resultJogoGenero

                    return dadosJogoGenero //200
                }else{
                    return message.ERROR_NOT_FOUND //404
                }
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }

    } catch (error) {
        
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const buscarJogoPorGenero = async function(idGenero){
    try {
        if(idGenero == '' || idGenero == undefined || idGenero == null || isNaN(idGenero) || idGenero <=0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
            let dadosJogoGenero = {}

            let resultJogoGenero = await jogoGeneroDAO.selectJogoByIdGenero(parseInt(idGenero)) // SEMPRE COLOQUE O NOME CERTO DA FUNÇÃO
            
            if(resultJogoGenero != false || typeof(resultJogoGenero) == 'object'){
                if(resultJogoGenero.length > 0){
                     //Criando um JSON de retorno de dados para a API
                     dadosJogoGenero.status = true
                     dadosJogoGenero.status_code = 200
                     dadosJogoGenero.jogos = resultJogoGenero

                    return dadosJogoGenero //200
                }else{
                    return message.ERROR_NOT_FOUND //404
                }
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }

    } catch (error) {
        
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}



module.exports = {
    inserirJogoGenero,
    atualizarJogoGenero,
    excluirJogoGenero,
    listarJogoGenero,
    buscarJogoGenero,
    buscarGeneroPorJogo,
    buscarJogoPorGenero
}