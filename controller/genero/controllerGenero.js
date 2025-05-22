/**************************************************************************
 * Objetivo ==> Controller responsável pela regra de negócio do CRUD do genêro
 * Data ==> 09/04/2025
 * Autor ==> Israel
 * Versão ==> 1.0
 ****************************************************************************/

// Import do arquivo de configuração para mensagens e status code
const MESSAGE = require('../../modulo/config.js')

// Import do DAO para realizar o CRUD no Banco de Dados
const generoDAO = require('../../model/DAO/genero.js')

const controllerJogoGenero = require('../jogo/controllerJogoGenero.js')


// Função para inserir um novo jogo
const inserirGenero = async function(genero,contentType){
    try{
        if(contentType == 'application/json'){
            if(
                genero.tipo_de_genero == undefined || genero.tipo_de_genero == '' || genero.tipo_de_genero == null || genero.tipo_de_genero.length > 100
            ){
                return MESSAGE.ERROR_REQUIRED_FIELDS // 400
            }else{
                // Encaminha os dados do novo GENERO para ser inserido no BD
                let resultGenero = await generoDAO.insertGenero(genero)

                if(resultGenero){
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
// Função para atualizar um jogo
const atualizarGenero = async function(genero,id,contentType){
    try{
        if(contentType == 'application/json'){
            if(
                genero.tipo_de_genero == undefined || genero.tipo_de_genero == '' || genero.tipo_de_genero == null || genero.tipo_de_genero.length > 100
            ){
                return MESSAGE.ERROR_REQUIRED_FIELDS // 400
            }else{
                let resultGenero = await buscarGenero(parseInt(id))

                if(resultGenero.status_code == 200){
                    genero.id = parseInt(id)

                    let result = await generoDAO.updateGenero(genero)

                    if(result){
                        return MESSAGE.SUCCESS_UPDATED_ITEM
                    }else{
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
                    }
                }else if(resultGenero.status_code == 404){
                    return MESSAGE.ERROR_NOT_FOUND
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
                }
            }
        }else{
            return MESSAGE.ERROR_CONTENT_TYPE
        }
    }catch(error){
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

// Função para excluir um novo jogo
const excluirGenero = async function(id){
    try{
        if(id == ''|| id == undefined || id == null || id == isNaN(id) || id <= 0){
            return MESSAGE.ERROR_REQUIRED_FIELDS
        }else{
            let resultGenero = await buscarGenero(parseInt(id))

            if(resultGenero.status_code == 200){

                let result = await generoDAO.deleteGenero(parseInt(id))

                if(result){
                    return MESSAGE.SUCCESS_DELETED_ITEM
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
                }
            }else if(resultGenero.status_code == 404){
                return MESSAGE.ERROR_NOT_FOUND
            }else{
                return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
            }
        }
    }catch(erorr){
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}
// Função para retornar todos os jogos
const listarGenero = async function(){
    try{

        const arrayGeneros = []
        let dadosGenero = {}

        let resultGenero = await generoDAO.selectAllGenero()

        if(resultGenero != false || typeof(resultGenero) == 'object'){
            if(resultGenero.length > 0){
                // Cria um objeto do tipo JSON para retornar a lista de jogos

                dadosGenero.status = true
                dadosGenero.status_code = 200
                dadosGenero.items = resultGenero.length
                for(itemGenero of resultGenero){
                    let dadosJogosJogoGenero = await controllerJogoGenero.buscarJogoPorGenero(itemGenero.id)
                    itemGenero.jogos = dadosJogosJogoGenero.jogos

                    arrayGeneros.push(itemGenero)
                }

                dadosGenero.generos = arrayGeneros

                return dadosGenero
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


// Função para buscar um jogo pelo ID
const buscarGenero = async function(id){
    try{
        let idGenero = id

        if(id == '' || id == undefined || id == null || id == isNaN(id || id <= 0)){
            return MESSAGE.ERROR_REQUIRED_FIELDS // 400 
        }else{

            const arrayGeneros = []
            let dadosGenero = {}

            let resultGenero = await generoDAO.selectByIdGenero(parseInt(idGenero))

            if(resultGenero != false || typeof(resultGenero) == 'object'){
                if(resultGenero.length > 0){
                    dadosGenero.status = true
                    dadosGenero.status_code = 200
                    for(itemGenero of resultGenero){
                        let dadosJogosJogoGenero = await controllerJogoGenero.buscarJogoPorGenero(itemGenero.id)
                        itemGenero.jogos = dadosJogosJogoGenero.jogos
    
                        arrayGeneros.push(itemGenero)
                    }
    
                    dadosGenero.generos = arrayGeneros

                    return dadosGenero
                }else{
                    return MESSAGE.ERROR_NOT_FOUND
                }
            }else{
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
            }
        }
    }catch(error){
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

module.exports = {
    inserirGenero,
    atualizarGenero,
    buscarGenero,
    excluirGenero,
    listarGenero
}