exports.paginaInicial = (req,res) => {
  res.render('index')
  return
}

exports.postagem = (req,res)=>{
    res.send(req.body.cliente)
    return
}