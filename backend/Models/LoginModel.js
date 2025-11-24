const validator = require('validator')
const bcrypt = require('bcryptjs')
const mongoose = require("mongoose")

const LoginSchema = new mongoose.Schema({
    email: { type: String, required: true},
    senha: { type: String, required: true},

})

const LoginModel = mongoose.model('Login',LoginSchema)

class Login{
    constructor(body){
        this.body = body
        this.errors = []
        this.user = null
    }
 async login(){
        this.Valida()
        if (this.errors.length > 0) return

        this.user  = await LoginModel.findOne({email: this.body.email})

       
        
        if(!this.user){
            this.errors.push('Email não existe')
            return
        }
        
         console.log(this.user);
        if(!bcrypt.compareSync(this.body.senha,this.user.senha)) {
             this.errors.push('Usuário ou senha inválido!')
           return
         }
      
    }

    async register(){
        this.Valida()

        await this.UserExists()

        if (this.errors.length > 0) return

         const salt = bcrypt.genSaltSync()
            this.body.senha = bcrypt.hashSync(this.body.senha,salt)
           
            this.user = await LoginModel.create(this.body)
       
    }
    async UserExists(){
        const user =  await LoginModel.findOne({email: this.body.email})
        if(user) this.errors.push('Usuario já existe!') 
    }

    Valida(){
       this.cleanUP()
        if(!validator.isEmail(this.body.email)) this.errors.push('E-mail inválido')
        if(this.body.senha.length < 3 || this.body.senha.length > 10) this.errors.push('Senha inválida')

    }

    cleanUP(){
        for (const key in this.body) {
            if (typeof this.body[key] !== 'string') {
            this.body[key] = String(this.body[key]);
        }
    }

        this.body = {
            email: this.body.email,
            senha: this.body.senha
        }
    }

}

module.exports = Login
