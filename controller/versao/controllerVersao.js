/**************************************************************************
 * Objetivo ==> Controller responsável pela regra de negócio do CRUD da versão
 * Data ==> 06/04/2025
 * Autor ==> Israel
 * Versão ==> 1.0
 ****************************************************************************/
// Import do arquivo de configuração para mensagens e status code
const MESSAGE = require('../../modulo/config.js')

// Import do DAO para realizar o CRUD no Banco de Dados
const versaoDAO = require('../../model/DAO/versao.js')

// Função para inserir uma nova versão
const inserirVersao = async function (versao, contentType){
    try{
        if(contentType == 'application/json'){
            if(versao.tipo_de_versao == undefined || versao.tipo_de_versao == '' || versao.tipo_de_versao == null || versao.tipo_de_versao.length > 45){
                return MESSAGE.ERROR_REQUIRED_FIELDS // 400
            }else {
                // Encaminha os dados da nova plataforma para ser inserido no BD
                let resultVersao  = await versaoDAO.insertVersao(versao)

                if(resultVersao){
                    return MESSAGE.SUCCESS_CREATED_ITEM // 401
                }else {
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL // 500
                }
            }
        }
    }catch(error){
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 415
    }
}
// Função para atualizar uma versão
const atualizarVersao = async function (versao,id, contentType){
    try{
        if(contentType == 'application/json'){
            if(versao.tipo_de_versao == undefined || versao.tipo_de_versao == '' || versao.tipo_de_versao == null || versao.tipo_de_versao.length > 45){
                
                return MESSAGE.ERROR_REQUIRED_FIELDS // 400
            }else{
                // Valida se o id existe no banco

                let resultVersao = await buscarVersao(parseInt(id))

                if(resultVersao.status_code == 200){

                    versao.id = parseInt(id)
                    let result = await versaoDAO.updateVersao(versao)

                    if(result){
                        return MESSAGE.SUCCESS_UPDATED_ITEM
                    }else{
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
                    }
                }else if(resultVersao.status_code == 400){
                    return MESSAGE.ERROR_NOT_FOUND
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
                }
            }
        }
    }catch(error){
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}
// Função para excluir uma versão
const excluirVersao = async function(id){
    try{
        if(id == ''|| id == undefined || id == null || id == isNaN(id) || id <= 0){
            return MESSAGE.ERROR_REQUIRED_FIELDS
        }else{
            let resultVersao = await buscarVersao(parseInt(id))

            if(resultVersao.status_code == 200){
                let result = await versaoDAO.deleteVersao(parseInt(id))

                if(result){
                    return MESSAGE.SUCCESS_DELETED_ITEM
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
                }
            }else if(resultVersao.status_code == 404){
                return MESSAGE.ERROR_NOT_FOUND
            }else{
                return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
            }
        }
    }catch(error){
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}
// Função para retornar todas as versões
const listarVersao = async function(){
    try{
        let dadosVersoes = {}

        let resultVersoes = await versaoDAO.selectAllVersao()

        if(resultVersoes != false || typeof(resultVersoes) == 'object'){
            if(resultVersoes.length > 0){
                dadosVersoes.status = true
                dadosVersoes.status_code = 200
                dadosVersoes.items = resultVersoes.length
                dadosVersoes.versao = resultVersoes

                return dadosVersoes
            }else{
                return MESSAGE.ERROR_NOT_FOUND
            }
        }else{
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
        }
    }catch(error){
        return
    }
}
// Função para buscar uma versão pelo ID
const buscarVersao = async function(id){
    try{
        let idVersao = id

        if(id == '' || id == undefined || id == null || id == isNaN(id || id <= 0)){
            return MESSAGE.ERROR_REQUIRED_FIELDS
        }else{
            let dadosVersao = {}

            let resultVersao = await versaoDAO.selectByIdVersao(parseInt(idVersao))

            if(resultVersao != false || typeof(resultVersao) == 'object'){
                if(resultVersao.length > 0){
                    dadosVersao.status = true
                    dadosVersao.status_code = 200
                    dadosVersao.versao = resultVersao

                    return dadosVersao
                }else{
                    return MESSAGE.ERROR_NOT_FOUND
                }
            }else{
                return MESSAGE.ERROR_NOT_FOUND
            }
        }
    }catch(error){
        console.log(error)
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

module.exports = {
    inserirVersao,
    atualizarVersao,
    buscarVersao,
    excluirVersao,
    listarVersao
}