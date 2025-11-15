require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require("mongoose")

//conectando a base de dados
mongoose.connect(process.env.CONNECTIONSTRING).then(()=>{
    console.log('conectou');
    //emitindo o sinal para executar minha aplicação apos a
    //conecção do banco de dados
    app.emit('ok')
}).catch(e => {
    console.log(e);
    
})
 
const routes = require('./routes') //importando as minhas rotas 
const path = require('path')

// Meus midlewares
const meuMiddleware = require('./backend/middleware/middleware')


////middleware para interpretar a requisição e retornar formato application/form
app.use(
    express.urlencoded({
        extended: true
    }))
//usando arquivos estáticos
app.use(express.static(path.resolve(__dirname,'public')))

//middleware para interpretar a requisição e retornar no formato json
app.use(express.json())

//passando a pasta que sera renderiza e a engine
app.set('views', path.resolve(__dirname, 'backend', 'Views'))
app.set('view engine', 'ejs')

//Middleware Global
app.use(meuMiddleware)
//minhas rotas vindo de routes.js
app.use(routes)

// recebendo o sinal emitido apos a conecção do database
app.on('ok',()=>{
app.listen(3000,()=>{
console.log('Acessar http://localhost:3000');
    
})})


//SOBRE PARAMETROS
// app.get('/test/:id', (req, res) => {

//     const id = req.params.id
//     const query = req.query
//     res.send({
//         id: id,
//         nome: query.name
//     });
    
// })