const Contato = require('../Models/ContatoModel')



exports.index = async (req,res) => {
     const contatos = await Contato.BuscarContatos()
     res.render('index', {contatos})

}

