/**********************************************************************************
 * Objetivo: Controller responsável pela regra de negócio referente ao CRUD de Jogo Desenvolvedora
 * Data: 18/05/2025
 * Autor: Israel
 * Versão: 1.0
 **********************************************************************************/

//Import do arquivo de mensagens e status code do projeto
const message = require('../../modulo/config.js')

//Import do aquivo para realizar o CRUD de dados no Banco de Dados
const jogoDesenvolvedoraDAO = require('../../model/DAO/jogo_desenvolvedora.js')


const inserirJogoDesenvolvedora = async function(jogoDesenvolvedor, contentType){
    try {
        if(contentType == 'application/json')
        {
                if (
                    jogoDesenvolvedor.id_jogo                       == ''           || jogoDesenvolvedor.id_jogo                     == undefined    || jogoDesenvolvedor.id_jogo              == null          || isNaN(jogoDesenvolvedor.id_jogo)                           || jogoDesenvolvedor.id_jogo <=0 ||
                    jogoDesenvolvedor.id_desenvolvedora             == ''           || jogoDesenvolvedor.id_desenvolvedora           == undefined    || jogoDesenvolvedor.id_desenvolvedora    == null          || isNaN(jogoDesenvolvedor.id_desenvolvedora)                 || jogoDesenvolvedor.id_desenvolvedora<=0 
                )
                {
                    return message.ERROR_REQUIRED_FIELDS //400
                }else{
                    //Chama a função para inserir no BD e aguarda o retorno da função
                    let resultJogoDesenvolvedor = await jogoDesenvolvedoraDAO.insertJogoDesenvolvedora(jogoDesenvolvedor)
                    if(resultJogoDesenvolvedor)
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


const atualizarJogoDesenvolvedora = async function(id, jogoDesenvolvedor, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
            {
                if (id                                    == ''           || id                                  == undefined    || id                                  == null        || isNaN(id)                                        || id  <= 0   ||
                    jogoDesenvolvedor.id_jogo             == ''           || jogoDesenvolvedor.id_jogo           == undefined    || jogoDesenvolvedor.id_jogo           == null        || isNaN(jogoDesenvolvedor.id_jogo)                 || jogoDesenvolvedor.id_jogo<=0                 ||
                    jogoDesenvolvedor.id_desenvolvedora   == ''           || jogoDesenvolvedor.id_desenvolvedora == undefined    || jogoDesenvolvedor.id_desenvolvedora == null        || isNaN(jogoDesenvolvedor.id_desenvolvedora)       || jogoDesenvolvedor.id_desenvolvedora<=0
                )
                {
                    return message.ERROR_REQUIRED_FIELDS //400
                }else{
                    //Validação para verificar se o ID existe no BD
                    let resultJogoDesenvolvedor = await jogoDesenvolvedoraDAO.selectByIdJogoDesenvolvedora(parseInt(id))

                    if(resultJogoDesenvolvedor != false || typeof(resultJogoDesenvolvedor) == 'object'){
                        if(resultJogoDesenvolvedor.length > 0 ){
                            //Update
                            //Adiciona o ID do genero no JSON com os dados
                            jogo.id = parseInt(id)

                            let result = await jogoDesenvolvedoraDAO.updateJogoDesenvolvedora(jogoDesenvolvedor)

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


const excluirJogoDesenvolvedora = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <=0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{

            //Funcção que verifica se  ID existe no BD
            let resultJogoDesenvolvedora = await jogoDesenvolvedoraDAO.selectByIdJogoDesenvolvedora(parseInt(id))

            if(resultJogoDesenvolvedora != false || typeof(resultJogoDesenvolvedora) == 'object'){
                //Se existir, faremos o delete
                if(resultJogoDesenvolvedora.length > 0){
                    //delete
                    let result = await jogoDesenvolvedoraDAO.deleteJogoDesenvolvedora(parseInt(id))

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


const listarJogoDesenvolvedora = async function(){
    try {
        //Objeto do tipo JSON
        let dadosJogoDesenvolvedora = {}
        //Chama a função para retornar os generos cadastrados
        let resultJogoDesenvolvedora = await jogoDesenvolvedoraDAO.selectAllJogoDesenvolvedora()

        if(resultJogoDesenvolvedora != false || typeof(resultJogoDesenvolvedora) == 'object'){
            if(resultJogoDesenvolvedora.length > 0){
                //Criando um JSON de retorno de dados para a API
                dadosJogoDesenvolvedora.status = true
                dadosJogoDesenvolvedora.status_code = 200
                dadosJogoDesenvolvedora.items = resultJogoGenero.length
                dadosJogoDesenvolvedora.jogos_desenvolvedoras = resultJogoDesenvolvedora

                return dadosJogoDesenvolvedora
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


const buscarJogoDesenvolvedora = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <=0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{

            let dadosJogoDesenvolvedora = {}

            let resultJogoDesenvolvedora = await jogoDesenvolvedoraDAO.selectByIdJogoDesenvolvedora(parseInt(id))
            
            if(resultJogoDesenvolvedora != false || typeof(resultJogoDesenvolvedora) == 'object'){
                if(resultJogoDesenvolvedora.length > 0){
                     //Criando um JSON de retorno de dados para a API
                     dadosJogoDesenvolvedora.status = true
                     dadosJogoDesenvolvedora.status_code = 200
                     dadosJogoDesenvolvedora.generos = resultJogoDesenvolvedora

                    return dadosJogoDesenvolvedora //200
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

const buscarDesenvolvedoraPorJogo = async function(idJogo){
    try {
        if(idJogo == '' || idJogo == undefined || idJogo == null || isNaN(idJogo) || idJogo <=0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
            let dadosDesenvolvedoraPorJogo = {}

            let resultDesenvolvedoraPorJogo = await jogoDesenvolvedoraDAO.selectDesenvolvedoraByIdJogo(parseInt(idJogo)) // SEMPRE COLOQUE O NOME CERTO DA FUNÇÃO
            
            if(resultDesenvolvedoraPorJogo != false || typeof(resultDesenvolvedoraPorJogo) == 'object'){
                if(resultDesenvolvedoraPorJogo.length > 0){
                     //Criando um JSON de retorno de dados para a API
                     dadosDesenvolvedoraPorJogo.status = true
                     dadosDesenvolvedoraPorJogo.status_code = 200
                     dadosDesenvolvedoraPorJogo.desenvolvedoras = resultDesenvolvedoraPorJogo

                    return dadosDesenvolvedoraPorJogo //200
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
   inserirJogoDesenvolvedora,
   atualizarJogoDesenvolvedora,
   excluirJogoDesenvolvedora,
   listarJogoDesenvolvedora,
   buscarJogoDesenvolvedora,
   buscarDesenvolvedoraPorJogo
}