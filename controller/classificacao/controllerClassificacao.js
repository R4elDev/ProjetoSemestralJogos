/****************************************************************************************
 * Objetivo ==> Controller responsável pela regra de negócio do CRUD da classificacao
 * Data ==> 10/04/2025
 * Autor ==> Israel
 * Versão ==> 1.0
 ***************************************************************************************/

// Import do arquivo de configuração para mensagens e status code
const MESSAGE = require('../../modulo/config.js')

// Import do DAO para realizar o CRUD no Banco de Dados
const classificacaoDAO = require('../../model/DAO/classificacao.js')

// ************* Funções *********** //

// Função para inserir um novo jogo
const inserirClassificacao = async function(classificacao, contentType){
    try{
        if(contentType == 'application/json'){
            if(classificacao.tipo_de_classificacao == undefined || classificacao.tipo_de_classificacao == '' || classificacao.tipo_de_classificacao == null || classificacao.tipo_de_classificacao.length > 5){
                return MESSAGE.ERROR_REQUIRED_FIELDS
            }else{
                let resultClassificacao = await classificacaoDAO.insertClassificacao(classificacao)

                if(resultClassificacao){
                    return MESSAGE.SUCCESS_DELETED_ITEM
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
                }
            }
        }
    }catch(error){
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}
// Função para atualizar um jogo
const atualizarClassificacao = async function(classificacao,id ,contentType){
    try{
        if(contentType == 'application/json'){
            if(classificacao.tipo_de_classificacao == undefined || classificacao.tipo_de_classificacao == '' || classificacao.tipo_de_classificacao == null || classificacao.tipo_de_classificacao.length > 5){
                return MESSAGE.ERROR_REQUIRED_FIELDS
            }else{
                let resultClassificacao = await buscarClassificacao(parseInt(id))

                if(resultClassificacao.status_code == 200){
                    classificacao.id = parseInt(id)
                    let result = await classificacaoDAO.updateClassificacao(classificacao)

                    if(result){
                        return MESSAGE.SUCCESS_UPDATED_ITEM
                    }else{
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
                    }
                }else if(resultClassificacao.status_code == 404){
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
// Função para excluir um novo jogo
const excluirClassificacao = async function(id){
    try{
        if(id == ''|| id == undefined || id == null || id == isNaN(id) || id <= 0){
                    return MESSAGE.ERROR_REQUIRED_FIELDS
        }else{
            let resultClassificacao = await buscarClassificacao(parseInt(id))

            if(resultClassificacao.status_code == 200){
                let result = await classificacaoDAO.deleteClassificacao(parseInt(id))

                if(result){
                    return MESSAGE.SUCCESS_DELETED_ITEM
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
                }
            }else if(resultClassificacao.status_code == 404){
                return MESSAGE.ERROR_NOT_FOUND
            }else{
                return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
            }
        }
    }catch(error){
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}
// Função para retornar todos os jogos
const listarClassificacao = async function(){
    try{
        let dadosClassificacao = {}

        let resultClassificacao = await classificacaoDAO.selectAllClassificacao()

        if(resultClassificacao != false || typeof(resultClassificacao) == 'object'){
            if(resultClassificacao.length > 0){
                dadosClassificacao.status = true
                dadosClassificacao.status_code = 200
                dadosClassificacao.items = resultClassificacao.length
                dadosClassificacao.classificacoes = resultClassificacao

                return dadosClassificacao // 200
            }else{
                return MESSAGE.ERROR_NOT_FOUND // 400
            }
        }else{
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL // 500
        }
    }catch(error){
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}
// Função para buscar um jogo pelo ID
const buscarClassificacao = async function(id){
    try{

        let idClassificacao = id

        if(id == '' || id == undefined || id == null || id == isNaN(id || id <= 0)){
            return MESSAGE.ERROR_REQUIRED_FIELDS // 400 
        }else{
            let dadosClassificacao = {}
            // Chama a função para retornar os dados do jogo

            let resultClassificacao = await classificacaoDAO.selectByIdClassificacao(parseInt(idClassificacao))
            if(resultClassificacao != false || typeof(resultClassificacao) == 'object'){
                if(resultClassificacao.length > 0){
                    // Cria um objeto do tipo JSON pararetornar a lista de classificacoes
                    dadosClassificacao.status = true
                    dadosClassificacao.status_code = 200
                    dadosClassificacao.classificacoes = resultClassificacao

                    return dadosClassificacao // 200
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
    inserirClassificacao,
    atualizarClassificacao,
    excluirClassificacao,
    listarClassificacao,
    buscarClassificacao
}