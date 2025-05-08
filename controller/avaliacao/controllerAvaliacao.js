/**************************************************************************
 * Objetivo ==> Controller responsável pela regra de negócio do CRUD de AVALIACAO
 * Data ==> 07/05/2025
 * Autor ==> Israel
 * Versão ==> 1.0
 ****************************************************************************/

// Import do arquivo de configuração para mensagens e status code
const MESSAGE = require('../../modulo/config.js')

// Import do DAO para realizar o CRUD no Banco de Dados
const avaliacaoDAO = require('../../model/DAO/avaliacoes.js')

//Import das controlleres para criar as relações com o jogo
const controllerJOGO = require('../jogo/controllerJogo.js')

// Função para inserir uma nova AVALIACAO
const inserirAvaliacao = async function(avaliacao, contentType) {
    try{
        if(contentType == 'application/json'){
            if(
                avaliacao.comentarios                    == undefined ||            jogo.nome                == '' ||            jogo.nome            == null || jogo.nome.length   > 500 ||
                avaliacao.quantidade_de_estrelas         == undefined ||            jogo.tamanho.length        > 5 ||
                avaliacao.id_jogo == ''                               ||            avaliacao.id_jogo == undefined
            ){
                return MESSAGE.ERROR_REQUIRED_FIELDS // 400
            }else{
        
                // Encaminha os dados do novo jogo para ser inserido no BD
                let resultJogo = await avaliacaoDAO.insertAvaliacao(avaliacao)
        
                if(resultJogo){
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

// Função para atualizar uma AVALIACAO
const atualizarAvaliacao = async function(avaliacao,id,contentType) {
    try{
        if(contentType == 'application/json'){
            if(
                id                        == undefined                ||            id  ==  ''    ||  id  == null  || isNaN(id)  || id <= 0 ||
                avaliacao.comentarios                    == undefined ||            jogo.nome                == '' ||            jogo.nome            == null || jogo.nome.length   > 500 ||
                avaliacao.quantidade_de_estrelas         == undefined ||            jogo.tamanho.length        > 5 ||
                avaliacao.id_jogo == ''
            ){
                return MESSAGE.ERROR_REQUIRED_FIELDS // 400
            }else{
                // validar se o id existe no banco

                let resultAvaliacao = await buscarAvaliacao(parseInt(id))

                if(resultAvaliacao.status_code == 200){

                    // Adiciona um atributo id no Json para encaminhasr id da requisição
                    avaliacao.id = parseInt(id)
                    let result = await avaliacaoDAO.updateAvaliacao(avaliacao)

                    if(result){
                        return MESSAGE.SUCCESS_UPDATED_ITEM
                    }else{
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
                    }

                }else if(resultAvaliacao.status_code == 404){
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

// Função para excluir uma nova avaliacao
const excluirAvaliacao = async function(id) {
    try{
        if(id == ''|| id == undefined || id == null || id == isNaN(id) || id <= 0){
            return MESSAGE.ERROR_REQUIRED_FIELDS
        }else{
            let resultAvaliacao = await buscarAvaliacao(parseInt(id))

            if(resultAvaliacao.status_code == 200){
                // Código do delete
                let result = await avaliacaoDAO.deleteAvaliacao(parseInt(id))

                if(result){
                    return MESSAGE.SUCCESS_DELETED_ITEM
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
                }
            }else if(resultAvaliacao.status_code == 404){
                return MESSAGE.ERROR_NOT_FOUND
            }else{
                return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
            }
        }
    }catch(error){
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

// Função para retornar todas as avaliacoes
const listarAvaliacao = async function() {
    try{
        //Objeto do tipo array para utilizar no foreach para carregar os dados 
        //do jogo e da classificacao
        const arrayAvaliacao = []

        let dadosAvaliacao = {}

        // Chama a função para retornar os dados do jogo
        let resultAvaliacao = await avaliacaoDAO.selectAllAvaliacao()

        if(resultAvaliacao != false || typeof(resultAvaliacao) == 'object'){

            if(resultAvaliacao.length > 0){

                //Cria um objeto do tipo JSON para retornar a lista de jogos
                dadosAvaliacao.status = true
                dadosAvaliacao.status_code = 200
                dadosAvaliacao.items = resultAvaliacao.length
                //resultFilme.forEach(async function(itemFilme){
                //foi necessário substituir o foreach pelo for of, pois
                //o foreach não consegue trabalhar com requisições async e await

                for(itemJogo of resultAvaliacao){
                    let dadosJogo = await controllerJOGO.buscarJogo(itemAvaliacao.id_jogo)

                    itemAvaliacao.jogo = dadosJogo.jogos
                    delete itemAvaliacao.id_jogo

                    arrayAvaliacao.push(itemAvaliacao)
                }

                //Adiciona o novo array de filmes no JSON para retornar ao APP
                dadosAvaliacao.avaliacoes = arrayAvaliacao

                return dadosAvaliacao // 200
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

// Função para buscar uma avaliacao pelo ID
const buscarAvaliacao = async function(id) { 
    try{

        let arrayAvaliacao = []
        let idAvaliacao = id

        if(id == '' || id == undefined || id == null || id == isNaN(id || id <= 0)){
            return MESSAGE.ERROR_REQUIRED_FIELDS // 400 
        }else{
            let dadosAvaliacao = {}
            // Chama a função para retornar os dados do jogo

            let resultAvaliacao = await avaliacaoDAO.selectByIdAvaliacao(parseInt(idAvaliacao))
            if(resultAvaliacao != false || typeof(resultAvaliacao) == 'object'){
                if(resultAvaliacao.length > 0){
                    // Cria um objeto do tipo JSON para retornar a lista de jogos
                    dadosAvaliacao.status = true
                    dadosAvaliacao.status_code = 200
                    for(itemAvaliacao of resultAvaliacao){
                        let dadosJogo = await controllerJOGO.buscarJogo(itemAvaliacao.id_jogo)

                        itemAvaliacao.jogo = dadosJogo.jogos
                        delete itemAvaliacao.id_jogo

                        arrayAvaliacao.push(itemAvaliacao)
                    }

                    dadosAvaliacao.avaliacoes = arrayAvaliacao
                
                    return dadosAvaliacao // 200

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
    inserirAvaliacao,
    atualizarAvaliacao,
    buscarAvaliacao,
    excluirAvaliacao,
    listarAvaliacao
}