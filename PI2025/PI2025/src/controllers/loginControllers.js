//requere as variaveis de ambiente
require('dotenv').config()
//requerer o models usuario
const usuarios = require('../models/usuarios')
//requerer a função de comparar senha
const comparePasswordService = require('../services/compare_password_service')
const jwt = require('jsonwebtoken')

class loginControllers{
    async login(req, res){
        let {email, senha} = req.body
        let usuario = await usuarios.findByEmail(email)
        
        if(usuario.values != undefined){
            let passValiated = comparePasswordService(senha, usuario.values.senha)
            if(!passValiated){
               res.status(406).json({success: false, message:"Senha Invalida"})
            }else{
               let token=jwt.sign({nome: usuario.values.nome, email:usuario.values.email}, process.env.SECRET,{expiresIn: 100000})
               res.status(200).json({success: true, token: token})
            }
        }else{
            usuario.values == undefined
            ? res.status(406).json({success: false, message:'E-mail não encontrado'})
            : res.status(404).json({success: false, message: usuario.error})
        }
    }

}

module.exports = new loginControllers