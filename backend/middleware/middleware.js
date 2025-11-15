module.exports = (req,res,next)=>{

console.log("passei no middleware global");

if (req.body != undefined) {
 req.body.cliente = req.body.cliente.replace(' ','--' )
   
}


next()
}