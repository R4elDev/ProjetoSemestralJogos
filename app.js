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
 **********************************************************************************************************************/

// Import das bibliotecas para criar a API
const express   = require('express')
const cors      = require('cors')
const bodyParser = require('body-parser')

// Import das controles para realizar o CRUD de dados
const controllerJogo = require('./controller/jogo/controllerJogo.js')


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


// EndPoint para inserir um jogo no banco de dados
app.post('/v1/controle-jogos/jogo', cors(), bodyParserJson, async function(request, response){
    
    // Recebe o conteúdo do body da requesição em JSON ( deve chegar.. )
    let dadosBody = request.body

    // Encaminhando os dados do body da requisição para a controller inserir no banco de dados
    let resultJogo = await controllerJogo.inserirJogo(dadosBody)

    response.status(resultJogo.status_code)
    response.json(resultJogo)
})

app.listen(8080, function(){
    console.log('API aguardando Requesições')
})