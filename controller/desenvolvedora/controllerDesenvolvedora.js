/**************************************************************************
 * Objetivo ==> Controller responsável pela regra de negócio do CRUD da DESENVOLVEDORA
 * Data ==> 10/04/2025
 * Autor ==> Israel
 * Versão ==> 1.0
 ****************************************************************************/

// Import do arquivo de configuração para mensagens e status code
const MESSAGE = require('../../modulo/config.js')

// Import do DAO para realizar o CRUD no Banco de Dados
const desenvolvedoraDAO = require('../../model/DAO/desenvolvedora.js')

// Função para inserir uma nova desenvolvedora
const inserirDesenvolvedora = async function(desenvolvedora, contentType) {
    try{
        if(contentType == 'application/json'){
            if(
                desenvolvedora.logo           == undefined ||            desenvolvedora.logo            == '' ||            desenvolvedora.logo            == null || desenvolvedora.logo.length   > 200 ||
                desenvolvedora.link           == undefined ||            desenvolvedora.link            == '' ||            desenvolvedora.link            == null || desenvolvedora.link.length   > 200 ||
                desenvolvedora.nome           == undefined ||            desenvolvedora.nome            == '' ||            desenvolvedora.nome            == null || desenvolvedora.nome.length   > 200
             ){
                return MESSAGE.ERROR_REQUIRED_FIELDS // 400
            }else{
        
                // Encaminha os dados do novo jogo para ser inserido no BD
                let resultDesenvolvedora = await desenvolvedoraDAO.insertDesenvolvedora(desenvolvedora)
        
                if(resultDesenvolvedora){
                    return MESSAGE.SUCCESS_CREATED_ITEM // 401
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL // 500
                }
            }
        }else{
            return MESSAGE.ERROR_CONTENT_TYPE // 415
        }
    }catch(error){
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}
// Função para atualizar uma desenvolvedora
const atualizarDesenvolvedora = async function(desenvolvedora,id,contentType) {
    try{
        if(contentType == 'application/json'){
            if(
                desenvolvedora.logo           == undefined ||            desenvolvedora.logo            == '' ||            desenvolvedora.logo            == null || desenvolvedora.logo.length   > 200 ||
                desenvolvedora.link           == undefined ||            desenvolvedora.link            == '' ||            desenvolvedora.link            == null || desenvolvedora.link.length   > 200 ||
                desenvolvedora.nome           == undefined ||            desenvolvedora.nome            == '' ||            desenvolvedora.nome            == null || desenvolvedora.nome.length   > 200
            ){
                return MESSAGE.ERROR_REQUIRED_FIELDS // 400
            }else{
                // validar se o id existe no banco

                let resultDesenvolvedora = await buscarDesenvolvedora(parseInt(id))

                if(resultDesenvolvedora.status_code == 200){

                    // Adiciona um atributo id no Json para encaminhasr id da requisição
                    desenvolvedora.id = parseInt(id)
                    let result = await desenvolvedoraDAO.updateDesenvolvedora(desenvolvedora)

                    if(result){
                        return MESSAGE.SUCCESS_UPDATED_ITEM
                    }else{
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
                    }

                }else if(resultDesenvolvedora.status_code == 404){
                    return MESSAGE.ERROR_NOT_FOUND
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
                }
            }
        }else{
            return MESSAGE.ERROR_CONTENT_TYPE // 400
        }    
    }catch(error){
        console.log(error)
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}
// Função para excluir uma desenvolvedora
const excluirDesenvolvedora = async function(id) {
    try{
        if(id == ''|| id == undefined || id == null || id == isNaN(id) || id <= 0){
            return MESSAGE.ERROR_REQUIRED_FIELDS
        }else{
            let resultDesenvolvedora = await buscarDesenvolvedora(parseInt(id))

            if(resultDesenvolvedora.status_code == 200){
                // Código do delete
                let result = await desenvolvedoraDAO.deleteDesenvolvedora(parseInt(id))

                if(result){
                    return MESSAGE.SUCCESS_DELETED_ITEM
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
                }
            }else if(resultDesenvolvedora.status_code == 404){
                return MESSAGE.ERROR_NOT_FOUND
            }else{
                return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
            }
        }
    }catch(error){
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}
// Função para retornar todas as desenvolvedoras
const listarDesenvolvedora = async function() {
    try{
        let dadosDesenvolvedora = {}

        // Chama a função para retornar os dados do jogo
        let resultDesenvolvedora = await desenvolvedoraDAO.selectAllDesenvolvedora()

        if(resultDesenvolvedora != false || typeof(resultDesenvolvedora) == 'object'){

            if(resultDesenvolvedora.length > 0){

                //Cria um objeto do tipo JSON para retornar a lista de jogos
                dadosDesenvolvedora.status = true
                dadosDesenvolvedora.status_code = 200
                dadosDesenvolvedora.items = resultDesenvolvedora.length
                dadosDesenvolvedora.desenvolvedoras = resultDesenvolvedora

                return dadosDesenvolvedora // 200
            }else{
                return MESSAGE.ERROR_NOT_FOUND // 400
            }
        }else{
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL // 500
        }
    }catch(error){
        console.log(error)
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }



}
// Função para buscar uma desenvolvedora pelo ID
const buscarDesenvolvedora = async function(id) { 
    try{

        let idDesenvolvedora = id

        if(id == '' || id == undefined || id == null || id == isNaN(id || id <= 0)){
            return MESSAGE.ERROR_REQUIRED_FIELDS // 400 
        }else{
            let dadosDesenvolvedora = {}
            // Chama a função para retornar os dados do jogo

            let resultDesenvolvedora = await desenvolvedoraDAO.selectByIdDesenvolvedora(parseInt(idDesenvolvedora))
            if(resultDesenvolvedora != false || typeof(resultDesenvolvedora) == 'object'){
                if(resultDesenvolvedora.length > 0){
                    // Cria um objeto do tipo JSON pararetornar a lista de jogos
                    dadosDesenvolvedora.status = true
                    dadosDesenvolvedora.status_code = 200
                    dadosDesenvolvedora.desenvolvedoras = resultDesenvolvedora

                    return dadosDesenvolvedora // 200
                }else{
                    return MESSAGE.ERROR_NOT_FOUND // 404
                }
            }else{
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL // 500
            }
        }
    }catch(error){
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

module.exports = {
    inserirDesenvolvedora,
    atualizarDesenvolvedora,
    excluirDesenvolvedora,
    listarDesenvolvedora,
    buscarDesenvolvedora
}