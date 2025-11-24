const mongoose = require("mongoose")
const validator = require("validator")

const ContatoSchema = new mongoose.Schema({
    nome: { type: String},
    sobrenome: { type: String, required: false, default:''},
    email: { type: String, required: false, default:''},
    telefone: { type: String, required: false, default:''},
    criadoEm: {type: Date, default: Date.now}
})

const ContatoModel = mongoose.model('Contato',ContatoSchema)

function Contato(body){
    this.body = body
    this.errors = []
    this.contato = null

}

Contato.prototype.register = async function(){

    this.valida()
    //this.UserExists()
    console.log(this.errors);
    
    if (this.errors.length > 0) return

    this.contato = await ContatoModel.create(this.body)

}

// Posso colocar validação de usuario repetido na criação
// Contato.prototype.UserExists = async function(){
//         const user =  await LoginModel.findOne({email: this.body.email})
//         if(user) this.errors.push('Usuario já existe!') 
// }

Contato.prototype.valida = function(){
    this.cleanUP()
    if(this.body.email && !validator.isEmail(this.body.email)) this.errors.push('E-mail inválido!')
    if(!this.body.nome) this.errors.push('Nome é um campo obrigátorio') 
    if(!this.body.email && !this.body.telefone) this.errors.push('Preciso do seu email ou telefone para o cadastro!') 
}

Contato.prototype.cleanUP = function(){
    for (const key in this.body) {
            if (typeof this.body[key] !== 'string') {
            this.body[key] = String(this.body[key]);
        }
    }

    this.body = {
        nome: this.body.nome,
        sobrenome: this.body.sobrenome,
        email: this.body.email,
        telefone: this.body.telefone
    }
}

Contato.prototype.edit = async function(id){
   if(typeof id != 'string') return
   this.valida()
   if(this.errors.length > 0) return
   this.contato = await ContatoModel.findByIdAndUpdate(id, this.body, {new: true})
}


// Metodos estáticos (não precisa do 'this')
Contato.BuscarId = async function(id){
    if (typeof id != 'string') return
    
    const searchId = await ContatoModel.findById(id)
    return searchId
}


Contato.BuscarContatos = async function(){

    const contatos = await ContatoModel.find().sort({criadoEm: -1})
    return contatos
}

Contato.delete = async function(id){
    if(typeof id != 'string') return

    const contato =  await ContatoModel.findOneAndDelete({_id: id})
    return contato
}


module.exports = Contato