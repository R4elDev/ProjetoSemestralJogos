/*******************************************************************************************************************
 * Objetivo ==> Api referente ao projeto de controle de jogos 
 * Data ==> 13/02/2025
 * Autor ==> Israel
 * Versão ==> 1.0
 * 
 * Observação:
 *      ****** PARA CONFIGURAR E INSTALAR A API, PRECISAMOS DAS SEGUINTE BIBLIOTECA ********
 *                      express                  npm install express --save
 *                      cors                     npm install cors --save
 *                      body-parser              npm install body-parser --save
 * 
 *      ****** PARA CONFIGURAR E INSTALAR O ACESSO AO BANCO DE DADOS, PRECISAMOS: ********
 *                      prisma                 npm install prisma --save ( Conexão com o BD )
 *                      prisma/client          npm install @prisma/client --save ( Executa scripts no BD )
 *    
 *      ******* Após a instalação do prisma e do primsa client, devemos:
 *                  npx prisma init ( ! INICIALIAR O PRISMA NO PROJETO !)
 * 
 *      ******* Para realizar o sincronismo do prisma com o BD, devemos executar o seguinte comando:
 *                  npx prisma migrate dev
 * 
 * 
 * ************************
 * 
 * POST E PUT PRECISAM DO BodyParserJson para funcionar
 **********************************************************************************************************************/

// Import das bibliotecas para criar a API
const express   = require('express')
const cors      = require('cors')
const bodyParser = require('body-parser')

// Import das controles para realizar o CRUD de dados
const controllerJogo = require('./controller/jogo/controllerJogo.js')
const controllerPlataforma = require('./controller/plataforma/controllerPlataforma.js')
const controllerVersao = require('./controller/versao/controllerVersao.js')

// Estabelecendo o formato de dados que deverá chegar no BODY da requisição (POST ou PUT)
const bodyParserJson = bodyParser.json()

// Cria o objeto app para criar a api
const app = express()

app.use((request, response, next) =>{
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    app.use(cors())
    next()
})



// ********************** ENDPOINTS DA TABELA JOGO ***************************** //

// EndPoint para inserir um jogo no banco de dados
app.post('/v1/controle-jogos/jogo', cors(), bodyParserJson, async function(request, response){

    //Recebe o content-type para validar o tipo de dados da requisição
    let contentType = request.headers['content-type']
    
    // Recebe o conteúdo do body da requesição em JSON ( deve chegar.. )
    let dadosBody = request.body

    // Encaminhando os dados do body da requisição para a controller inserir no banco de dados
    let resultJogo = await controllerJogo.inserirJogo(dadosBody,contentType)

    response.status(resultJogo.status_code)
    response.json(resultJogo)
})

// EndPoint para retornar uma lista de jogos
app.get('/v1/controle-jogos/jogo', cors(), async function (request, response){

    // Chama a função para listar os jogos
    let resultJogo = await controllerJogo.listarJogo()

    response.status(resultJogo.status_code)
    response.json(resultJogo)
})

// Endpoint para retornar um jogo pelo ID
app.get('/v1/controle-jogos/jogo/:id', cors(), async function (request, response){

    let idJogo = request.params.id
    // Chama a função para retornar um jogo pelo ID
    let resultJogo = await controllerJogo.buscarJogo(idJogo)

    response.status(resultJogo.status_code)
    response.json(resultJogo)
})

// Endpoint para retornar um delet
app.delete('/v1/controle-jogos/jogo/:id', cors(), async function(request,response){
    // Recebendo o id da requisição
    let idJogo = request.params.id

    let resultJogo = await controllerJogo.excluirJogo(idJogo)

    response.status(resultJogo.status_code)
    response.json(resultJogo)
})

app.put('/v1/controle-jogos/jogo/:id', cors(), bodyParserJson ,async function (request,response){
    // Recebe o contetType da requesição
    let contentType = request.headers['content-type']

    // Recebe o id Jogo
    let idJogo = request.params.id

    // Recebe os dados do jogo encaminhando do body da requesição
    let dadosBody = request.body

    let resultJogo = await controllerJogo.atualizarJogo(dadosBody,idJogo,contentType)

    response.status(resultJogo.status_code)
    response.json(resultJogo)
})

// ********************** ENDPOINTS DA TABELA PLATAFORMA ***************************** //

// EndPoint para inserir uma plataforma no banco de dados
app.post('/v1/contole-jogos/plataforma', cors(),bodyParserJson,async function(request, response) {
    
    //Recebe o content-type para validar o tipo de dados da requisição
    let contentType = request.headers['content-type']

    // Recebe o conteúdo do body da requesição em JSON ( deve chegar.. )
    let dadosBody = request.body

    // Encaminhando os dados do body da requisição para a controller inserir no banco de dados
    let resultPlataforma = await controllerPlataforma.inserirPlataforma(dadosBody,contentType)

    response.status(resultPlataforma.status_code)
    response.json(resultPlataforma)
})

// EndPoint para retornar uma lista de plataformas
app.get('/v1/controle-jogos/plataforma', cors(),async function(request,response){
    // Chama a função para listar todas as plataformas
    let resultPlataforma = await controllerPlataforma.listarPlataforma()

    response.status(resultPlataforma.status_code)
    response.json(resultPlataforma)
})

// Endpoint para retornar um jogo pelo ID
app.get('/v1/controle-jogos/platafoma/:id', cors(),async function (request,response){
    let idPlataforma = request.params.id

    let resultPlataforma = await controllerPlataforma.buscarPlataforma(idPlataforma)

    response.status(resultPlataforma.status_code)
    response.json(resultJogo)
})

// Endpoint para retornar um delet
app.delete('/v1/controle-jogos/plataforma/:id', cors(),async function(request,response){
    let idPlataforma = request.params.id

    let resultPlataforma = await controllerPlataforma.excluirPlataforma(idPlataforma)

    response.status(resultPlataforma.status_code)
    response.json(resultPlataforma)
})

// Endpoint para atualizar uma plataforma
app.put('/v1/controle-jogos/plataforma/:id', cors(), bodyParserJson, async function (request,response){
    // Recebe o contetType da requesição
    let contentType = request.header['content-type']
    // Recebe o id da plataforma
    let idPlataforma = request.params.id
    // Recebe os dados do jogo encaminhando do body da requesição
    let dadosBody = request.body

    let resultPlataforma = await controllerPlataforma.atualizarPlataforma(dadosBody,idPlataforma,contentType)

    response.status(resultPlataforma.status_code)
    response.json(resultJogo)


})

// ********************** ENDPOINTS DA TABELA VERSAO ***************************** //

// EndPoint para inserir uma versao no banco de dados
app.post('/v1/controle-jogos/versao', cors(),bodyParserJson,async function(request,response){
    //Recebe o content-type para validar o tipo de dados da requisição
    let contentType = request.headers['content-type']

    // Recebe o conteúdo do body da requesição em JSON ( deve chegar.. )
    let dadosBody = request.body

    // Encaminhando os dados do body da requisição para a controller inserir no banco de dados
    let resultVersao = await controllerVersao.inserirVersao(dadosBody,contentType)

    response.status(resultVersao.status_code)
    response.json(resultVersao)
})
// EndPoint para retornar uma lista de versoes
app.get('/v1/controle-jogos/versao',cors(),async function (request,response){
    // Chama a função para listar as versões
    let resultVersao = await controllerVersao.listarVersao()

    response.status(resultVersao.status_code)
    response.json(resultVersao)
})

// Endpoint para retornar uma versao pelo ID
app.get('/v1/controle-jogos/versao/:id', cors(),async function(request,response){
    let idVersao = request.params.id

    // Chama a função para retornar uma versão pelo ID
    let resultVersao = await controllerVersao.buscarVersao(idVersao)

    response.status(resultVersao.status_code)
    response.json(resultVersao)
})

// Endpoint para retornar um delet de versao
app.get('/v1/controle-jogos/versao/:id', cors(), async function (request,response){
    let idVersao = request.params.id

    // Chama a função para retornar um jogo pelo ID
    let resultVersao = await controllerVersao.excluirVersao(idVersao)

    response.status(resultVersao.status_code)
    response.json(resultVersao)
})

// Endpoint para atualizar uma versao
app.put('/v1/controle-jogos/versao/:id',cors(),bodyParserJson, async function(request,response){
    // Recebe o contentType da requesição
    let contentType = request.headers['content-type']

    // Recebe o idVersao
    let idVersao = request.params.id

    // Recebe os dados do jogo encaminhando do body da requesição
    let dadosBody = request.body

    let resultVersao = await controllerVersao.atualizarVersao(dadosBody,idVersao,contentType)

    response.status(resultVersao.status_code)
    response.json(resultVersao)
})

app.listen('3030', function(){
    console.log('API aguardando Requesições...')
})