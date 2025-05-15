/**********************************************************************************
 * Objetivo: Controller responsável pela regra de negócio referente ao CRUD de Plataforma Jogo
 * Data: 08/05/2025
 * Autor: Marcel
 * Versão: 1.0
 **********************************************************************************/

//Import do arquivo de mensagens e status code do projeto
const message = require('../../modulo/config.js')

//Import do aquivo para realizar o CRUD de dados no Banco de Dados
const plataformaJogoDAO = require('../../model/DAO/plataforma_jogo.js')

//Função para tratar a inserção de uma nova Plataforma Jogo no DAO
const inserirPlataformaJogo = async function(plataformaJogo, contentType){
    try {
        if(contentType == 'application/json')
        {
                if (
                    plataformaJogo.id_plataforma       == ''           || plataformaJogo.id_plataforma     == undefined    || plataformaJogo.id_plataforma  == null || isNaN(plataformaJogo.id_plataforma)  || plataformaJogo.id_plataforma <=0 ||
                    plataformaJogo.id_jogo             == ''           || plataformaJogo.id_jogo           == undefined    || plataformaJogo.id_jogo == null        || isNaN(plataformaJogo.id_jogo)                 || plataformaJogo.id_jogo<=0                 ||
                    plataformaJogo.id_versao           == ''           || plataformaJogo.id_versao         == undefined    || plataformaJogo.id_versao == null      || isNaN(plataformaJogo.id_versao)               || plataformaJogo.id_versao<=0 ||
                    plataformaJogo.hardware            == ''           || plataformaJogo.hardware          == undefined    || plataformaJogo.hardware == null       || plataformaJogo.hardware.length > 200
                )
                {
                    return message.ERROR_REQUIRED_FIELDS //400
                }else{
                    //Chama a função para inserir no BD e aguarda o retorno da função
                    let resultPlataformaJogo = await plataformaJogoDAO.insertPlataformaJogo(plataformaJogo)


                    if(resultPlataformaJogo)
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
const atualizarPlataformaJogo = async function(id, plataformaJogo, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
            {
                if (id                                == ''           || id                       == undefined    || id                    == null || isNaN(id)  || id  <= 0   ||
                    plataformaJogo.id_plataforma       == ''           || plataformaJogo.id_plataforma     == undefined    || plataformaJogo.id_plataforma  == null || isNaN(plataformaJogo.id_plataforma.id_filme)  || plataformaJogo.id_plataforma.id_filme <=0 ||
                    plataformaJogo.id_jogo             == ''           || plataformaJogo.id_jogo           == undefined    || plataformaJogo.id_jogo == null        || isNaN(plataformaJogo.id_jogo)                 || plataformaJogo.id_jogo<=0                 ||
                    plataformaJogo.id_versao           == ''           || plataformaJogo.id_versao         == undefined    || plataformaJogo.id_versao == null      || isNaN(plataformaJogo.id_versao)               || plataformaJogo.id_versao<=0
                )
                {
                    return message.ERROR_REQUIRED_FIELDS //400
                }else{
                    //Validação para verificar se o ID existe no BD
                    let resultPlataformaJogo = await plataformaJogoDAO.selectByIdPlataformaJogo(parseInt(id))

                    if(resultPlataformaJogo != false || typeof(resultPlataformaJogo) == 'object'){
                        if(resultPlataformaJogo.length > 0 ){
                            //Update
                            //Adiciona o ID do genero no JSON com os dados
                            jogo.id = parseInt(id)

                            let result = await plataformaJogoDAO.updatePlataformaJogo(plataformaJogo)

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
const excluirPlataformaJogo = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <=0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{

            //Funcção que verifica se  ID existe no BD
            let resultPlataformaJogo = await plataformaJogoDAO.selectByIdPlataformaJogo(parseInt(id))

            if(resultPlataformaJogo != false || typeof(resultPlataformaJogo) == 'object'){
                //Se existir, faremos o delete
                if(resultPlataformaJogo.length > 0){
                    //delete
                    let result = await plataformaJogoDAO.deletePlataformaJogo(parseInt(id))

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
const listarPlataformaJogo = async function(){
    try {
        //Objeto do tipo JSON
        let dadosPlataformaJogo = {}
        //Chama a função para retornar os generos cadastrados
        let resultPlataformaJogo = await plataformaJogoDAO.selectAllPlataformaJogo()

        if(resultPlataformaJogo != false || typeof(resultPlataformaJogo) == 'object'){
            if(resultPlataformaJogo.length > 0){
                //Criando um JSON de retorno de dados para a API
                dadosPlataformaJogo.status = true
                dadosPlataformaJogo.status_code = 200
                dadosPlataformaJogo.items = resultPlataformaJogo.length
                dadosPlataformaJogo.jogos = resultPlataformaJogo

                return dadosPlataformaJogo
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
const buscarPlataformaJogo = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <=0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
            dadosPlataformaJogo = {}

            let resultPlataformaJogo = await plataformaJogoDAO.selectByIdPlataformaJogo(parseInt(id))
            
            if(resultPlataformaJogo != false || typeof(resultPlataformaJogo) == 'object'){
                if(resultPlataformaJogo.length > 0){
                     //Criando um JSON de retorno de dados para a API
                     dadosPlataformaJogo.status = true
                     dadosPlataformaJogo.status_code = 200
                     dadosPlataformaJogo.plataforma = resultPlataformaJogo

                    return dadosPlataformaJogo //200
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

const buscarPlataformaPorJogo = async function(idJogo){
    try {
        if(idJogo == '' || idJogo == undefined || idJogo == null || isNaN(idJogo) || idJogo <=0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
            dadosPlataformaJogo = {}

            let resultPlataformaJogo = await plataformaJogoDAO.selectPlataformaByIdJogo(parseInt(idJogo)) // SEMPRE COLOQUE O NOME CERTO DA FUNÇÃO
            
            if(resultPlataformaJogo != false || typeof(resultPlataformaJogo) == 'object'){
                if(resultPlataformaJogo.length > 0){
                     //Criando um JSON de retorno de dados para a API
                     dadosPlataformaJogo.status = true
                     dadosPlataformaJogo.status_code = 200
                     dadosPlataformaJogo.plataforma = resultPlataformaJogo

                    return dadosPlataformaJogo //200
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
    inserirPlataformaJogo,
    atualizarPlataformaJogo,
    excluirPlataformaJogo,
    listarPlataformaJogo,
    buscarPlataformaJogo,
    buscarPlataformaPorJogo
}



