const Contato = require('../Models/ContatoModel')
exports.index = function(req, res){
    res.render('contato',{ contatoID: {} })
}

exports.register = async function(req, res){

try{ 
    const contato = new Contato(req.body)
    
    await contato.register()
    
    if (contato.errors.length > 0) {
        req.flash('errors', contato.errors)
        req.session.save(()=>{
          
            
            res.redirect('/contato/index')
        })
       return
    }

    

     req.flash('success', 'Contato registrado com sucesso!')
        req.session.save(function(){
            res.redirect(`/contato/index/${contato.contato._id}`)
            
        })

  

    } catch (error) {
        console.log(error);
        
        return res.render('404')
    }
   

}

exports.editIndex = async function(req, res){
  if(!req.params.id) return res.render('404')
    const contatoID = await Contato.BuscarId(req.params.id)
   res.render('contato',{  contatoID })
   
}

exports.edit = async function(req, res){
  if(!req.params.id) return res.render('404')
    const contato = new Contato(req.body)
    await contato.edit(req.params.id)
   
   try {
    if (contato.errors.length > 0) {
        req.flash('errors', contato.errors)
        req.session.save(()=>{
          
            
              res.redirect(`/contato/index/${req.params.id}`)
        })
       return
    }

    

     req.flash('success', 'Contato editado com sucesso!')
        req.session.save(function(){
            res.redirect(`/contato/index/${contato.contato._id}`)
            
        })

   } catch (error) {
    
   }
}

exports.delete = async (req ,res)=>{
    if(!req.params.id) return res.render('404')
    const contato = await Contato.delete(req.params.id)
    if(!contato) return res.render('404')

    req.flash('success', 'Contato deletado')
        req.session.save(()=>{
              res.redirect('/')
        })
        return
}