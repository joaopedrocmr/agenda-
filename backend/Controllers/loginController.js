const LoginModel = require('../Models/LoginModel')

exports.index = (req, res) =>{
    
    
    if(req.session.user) return res.render('login-logado')
    res.render('login')
}

exports.register = async function(req, res){
    try {
    const login = new LoginModel(req.body)
    await login.register()
    
    if (login.errors.length > 0) {
        req.flash('errors', login.errors)
        req.session.save(()=>{
          
            
            res.redirect('/login')
        })
       return
    }
     req.flash('success', 'Usuario criado com sucesso!')
        req.session.save(function(){
            res.redirect('/login')
            
        })

  

    } catch (error) {
        return res.render('404')
    }
   


}

exports.login = async function(req,res){

try {
    const login = new LoginModel(req.body)
    await login.login()
    
    if (login.errors.length > 0) {
        req.flash('errors', login.errors)
        req.session.save(()=>{
          
            
            res.redirect('/login')
        })
       return
    }

        
     req.flash('success', 'Você entrou')
        req.session.user = login.user
        req.session.save(function(){
        
            res.redirect('/login')
            
        })

  

    } catch (error) {
     
        return res.render('404')
        
    }
   
}
    
exports.logout = function (req, res) {
    req.session.destroy()
    res.redirect('/')
}