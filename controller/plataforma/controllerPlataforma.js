/**************************************************************************
 * Objetivo ==> Controller responsável pela regra de negócio do CRUD da plataforma
 * Data ==> 06/04/2025
 * Autor ==> Israel
 * Versão ==> 1.0
 ****************************************************************************/
// Import do arquivo de configuração para mensagens e status code
const MESSAGE = require('../../modulo/config.js')

// Import do DAO para realizar o CRUD no Banco de Dados
const plataformaDAO = require('../../model/DAO/plataforma.js')

// Função para inserir uma nova plataforma
const inserirPlataforma = async function (plataforma, contentType) {
    try{
        if(contentType == 'application/json'){
            if(
                plataforma.tipo_de_plataforma == undefined || plataforma.tipo_de_plataforma == '' || plataforma.tipo_de_plataforma == null || plataforma.tipo_de_plataforma.length > 100 ||
                plataforma.logo               == undefined || plataforma.logo               == '' || plataforma.logo               == null || plataforma.logo.length               > 200                                                                                      
            ){
                return MESSAGE.ERROR_REQUIRED_FIELDS // 400
            }else{
                // Encaminha os dados da nova plataforma para ser inserido no BD
                let resultPlataforma = await plataformaDAO.insertPlataforma(plataforma)

                if(resultPlataforma){
                    return MESSAGE.SUCCESS_CREATED_ITEM // 401
                }else {
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
// Função para atualizar uma plataforma
const atualizarPlataforma = async function(plataforma,id,contentType){
    try{
        if(contentType == 'applicaton/json'){
            if(
                plataforma.tipo_de_plataforma == undefined || plataforma.tipo_de_plataforma == '' || plataforma.tipo_de_plataforma == null || plataforma.tipo_de_plataforma.length > 100 ||
                plataforma.logo               == undefined || plataforma.logo               == '' || plataforma.logo               == null || plataforma.logo.length               > 200 
            ){
                return MESSAGE.ERROR_REQUIRED_FIELDS // 400
            }else{

                // Valida se o id existe no banco
                let resultPlataforma = await buscarPlataforma(parseInt(id))

                if(resultPlataforma.status_code == 200){

                    
                    plataforma.id = parseInt(id)
                    let result = await plataformaDAO.updatePlataforma(plataforma)

                    if(result){
                        return MESSAGE.SUCCESS_UPDATED_ITEM
                    }else{
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
                    }
                }else if(resultPlataforma.status_code == 400){
                    return MESSAGE.ERROR_NOT_FOUND
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
                }

            }
        }else{
            return MESSAGE.ERROR_CONTENT_TYPE // 400
        }
    }catch(error){
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}
// Função para excluir uma plataforma
const excluirPlataforma = async function(id){
    try{
        if(id == ''|| id == undefined || id == null || id == isNaN(id) || id <= 0){
            return MESSAGE.ERROR_REQUIRED_FIELDS
        }else{
            let resultPlataforma = await buscarPlataforma(parseInt(id))

            if(resultPlataforma.status_code == 200){
                let result = await plataformaDAO.deletePlataforma(parseInt(id))

                if(result){
                    return MESSAGE.SUCCESS_DELETED_ITEM
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
                }
            }else if(resultPlataforma.status_code == 404){
                return MESSAGE.ERROR_NOT_FOUND
            }else{
                return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
            }
        }
    }catch(error){
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}
// Função para retornar todas as plataformas
const listarPlataforma = async function(){
    try{
        let dadosPlataformas = {}

        let resultPlataforma = await plataformaDAO.selectAllPlataforma()

        if(resultPlataforma != false || typeof(resultPlataforma) == 'object'){

            if(resultPlataforma.length > 0){
                dadosPlataformas.status = true
                dadosPlataformas.status_code = 200
                dadosPlataformas.items = resultPlataforma.length
                dadosPlataformas.plataforma = resultPlataforma

                return dadosPlataformas
            }else{
                return MESSAGE.ERROR_NOT_FOUND
            }
        }else{
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
        }
    }catch(error){
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}
// Função para buscar uma plataforma pelo ID
const buscarPlataforma = async function(id){
    try{
        let idPlataforma = id

        if(id == '' || id == undefined || id == null || id == isNaN(id || id <= 0)){
            return MESSAGE.ERROR_REQUIRED_FIELDS // 400
        }else{
            let dadosPlataforma = {}

            let resultPlataforma = await plataformaDAO.selectByIdPlataforma(parseInt(idPlataforma))

            if(resultPlataforma != false || typeof(resultPlataforma) == 'object'){
                if(resultPlataforma.length > 0){
                    dadosPlataforma.status = true
                    dadosPlataforma.status_code = 200
                    dadosPlataforma.plataforma = resultPlataforma

                    return dadosPlataforma // 200
                }else{
                    return MESSAGE.ERROR_NOT_FOUND // 404
                }
            }else{
                return MESSAGE.ERROR_NOT_FOUND // 500
            }
        }
    }catch(error){
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}