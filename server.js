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

// sessões, mensagens flash, armazenamento de sessões no mongoDB
const session = require('express-session')
const MongoStore = require('connect-mongo')
const flash = require('connect-flash')
const routes = require('./routes') //importando as minhas rotas 
const path = require('path')
const helmet = require('helmet')
const csrf = require('csurf')

//app.use(helmet()) estou usando localhost o helmet pode me atrapalhar
app.use(session({
    secret: 'GHShs_&%he3h4u7',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 dias em milissegundos
        httpOnly: true
    }
}));



app.use(flash())


// Declaração midlewares globais
const {checkcsfr} = require('./backend/middleware/middleware')
const {middlewareCsfr} = require('./backend/middleware/middleware')
const {MiddlewareGlobal} = require('./backend/middleware/middleware')

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

app.use(csrf())

//Middlewares Globais

app.use(checkcsfr)
app.use(middlewareCsfr)
app.use(MiddlewareGlobal)

//minhas rotas vindo de routes.js
app.use(routes)

// recebendo o sinal emitido apos a conecção do database
app.on('ok',()=>{
app.listen(3000,()=>{
console.log('Acessar http://localhost:3000');
    
})})

