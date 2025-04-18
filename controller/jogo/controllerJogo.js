/**************************************************************************
 * Objetivo ==> Controller responsável pela regra de negócio do CRUD do jogo
 * Data ==> 13/02/2025
 * Autor ==> Israel
 * Versão ==> 1.0
 ****************************************************************************/

// Import do arquivo de configuração para mensagens e status code
const MESSAGE = require('../../modulo/config.js')

// Import do DAO para realizar o CRUD no Banco de Dados
const jogoDAO = require('../../model/DAO/jogo.js')

// Função para inserir um novo jogo
const inserirJogo = async function(jogo, contentType) {
    try{
        if(contentType == 'application/json'){
            if(
                jogo.nome            == undefined ||            jogo.nome            == '' ||            jogo.nome            == null || jogo.nome.length   > 80 ||
                jogo.data_lancamento == undefined ||            jogo.data_lancamento == '' ||            jogo.data_lancamento == null || jogo.data_lancamento.length   > 10 ||
                jogo.versao          == undefined ||            jogo.versao          == '' ||            jogo.versao          == null || jogo.versao.length > 10 ||
                jogo.tamanho         == undefined ||            jogo.tamanho.length   > 10 ||
                jogo.descricao       == undefined ||
                jogo.foto_capa       == undefined ||            jogo.foto_capa.length > 200 ||
                jogo.link            == undefined ||            jogo.link.length > 200
            ){
                return MESSAGE.ERROR_REQUIRED_FIELDS // 400
            }else{
        
                // Encaminha os dados do novo jogo para ser inserido no BD
                let resultJogo = await jogoDAO.insertJogo(jogo)
        
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
// Função para atualizar um jogo
const atualizarJogo = async function(jogo,id,contentType) {
    try{
        if(contentType == 'application/json'){
            if(
                jogo.nome            == undefined ||            jogo.nome            == ''    ||            jogo.nome            == null || jogo.nome.length   > 80 ||
                jogo.data_lancamento == undefined ||            jogo.data_lancamento == ''    ||            jogo.data_lancamento == null || jogo.data_lancamento.length   > 10 ||
                jogo.versao          == undefined ||            jogo.versao          == ''    ||            jogo.versao          == null || jogo.versao.length > 10 ||
                jogo.tamanho         == undefined ||            jogo.tamanho.length   > 10    ||
                jogo.descricao       == undefined ||
                jogo.foto_capa       == undefined ||            jogo.foto_capa.length > 200   ||
                jogo.link            == undefined ||            jogo.link.length > 200        ||
                id                   == undefined ||            id  ==  ''    ||  id  == null  || isNaN(id)  || id <= 0
            ){
                return MESSAGE.ERROR_REQUIRED_FIELDS // 400
            }else{
                // validar se o id existe no banco

                let resultJogo = await buscarJogo(parseInt(id))

                if(resultJogo.status_code == 200){

                    // Adiciona um atributo id no Json para encaminhasr id da requisição
                    jogo.id = parseInt(id)
                    let result = await jogoDAO.updateJogo(jogo)

                    if(result){
                        return MESSAGE.SUCCESS_UPDATED_ITEM
                    }else{
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
                    }

                }else if(resultJogo.status_code == 404){
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
// Função para excluir um novo jogo
const excluirJogo = async function(id) {
    try{
        if(id == ''|| id == undefined || id == null || id == isNaN(id) || id <= 0){
            return MESSAGE.ERROR_REQUIRED_FIELDS
        }else{
            let resultJogo = await buscarJogo(parseInt(id))

            if(resultJogo.status_code == 200){
                // Código do delete
                let result = await jogoDAO.deleteJogo(parseInt(id))

                if(result){
                    return MESSAGE.SUCCESS_DELETED_ITEM
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
                }
            }else if(resultJogo.status_code == 404){
                return MESSAGE.ERROR_NOT_FOUND
            }else{
                return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
            }
        }
    }catch(error){
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}
// Função para retornar todos os jogos
const listarJogo = async function() {
    try{
        let dadosJogos = {}

        // Chama a função para retornar os dados do jogo
        let resultJogo = await jogoDAO.selectAllJogo()

        if(resultJogo != false || typeof(resultJogo) == 'object'){

            if(resultJogo.length > 0){

                //Cria um objeto do tipo JSON para retornar a lista de jogos
                dadosJogos.status = true
                dadosJogos.status_code = 200
                dadosJogos.items = resultJogo.length
                dadosJogos.games = resultJogo

                return dadosJogos // 200
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
const buscarJogo = async function(id) { 
    try{

        let idJogo = id

        if(id == '' || id == undefined || id == null || id == isNaN(id || id <= 0)){
            return MESSAGE.ERROR_REQUIRED_FIELDS // 400 
        }else{
            let dadosJogos = {}
            // Chama a função para retornar os dados do jogo

            let resultJogo = await jogoDAO.selectByIdJogo(parseInt(idJogo))
            if(resultJogo != false || typeof(resultJogo) == 'object'){
                if(resultJogo.length > 0){
                    // Cria um objeto do tipo JSON para retornar a lista de jogos
                    dadosJogos.status = true
                    dadosJogos.status_code = 200
                    dadosJogos.games = resultJogo
                
                    return dadosJogos // 200

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
    inserirJogo,
    atualizarJogo,
    buscarJogo,
    excluirJogo,
    listarJogo
}