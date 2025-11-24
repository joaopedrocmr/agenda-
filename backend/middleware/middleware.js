exports.checkcsfr = (err, req, res,next)=>{
    if(err){
        return res.render('404')
    }
}

exports.middlewareCsfr = (req, res,next)=>{

 if (!res.locals.csrfToken) 
 {
    res.locals.csrfToken = req.csrfToken()
   
 }
    next() 
}

exports.MiddlewareGlobal = (req, res, next) => {

    res.locals.errors = req.flash('errors')
    res.locals.success = req.flash('success')
    res.locals.user = req.session.user
    next()
}

exports.loginRequired = (req, res, next) => {

     if (!req.session.user){
        req.flash('errors','Você precisa fazer login')
        req.session.save(()=> res.redirect('/'))
        return
     }
     
     next()
}
