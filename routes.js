const express = require('express')
const route = express.Router()
const homeController = require('./backend/Controllers/homeController')
const loginController = require('./backend/Controllers/loginController')
const contatoController = require('./backend/Controllers/contatoController')
const { loginRequired } = require('./backend/middleware/middleware')

//Rotas da home
route.get('/',homeController.index)

//Rotas do Login
route.get('/login',loginController.index)
route.post('/login/register', loginController.register)
route.post('/login/login', loginController.login)
route.get('/login/logout', loginController.logout)

//rotas contato
route.get('/contato/index', loginRequired, contatoController.index)
route.post('/contato/register',loginRequired, contatoController.register)
route.get('/contato/index/:id',loginRequired, contatoController.editIndex)
route.post('/contato/edit/:id',loginRequired, contatoController.edit)
route.get('/contato/delete/:id',loginRequired, contatoController.delete)
 

module.exports = route

