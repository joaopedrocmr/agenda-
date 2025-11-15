const express = require('express')
const route = express.Router()
const homeController = require('./backend/Controllers/homeController')


//Rotas
route.get('/',homeController.paginaInicial)
route.post('/',homeController.postagem)

module.exports = route

