// vamos importar nosso user service
const usuarios = require('../models/usuarios')
const hashPasswordService= require('../services/hash_password_service')

class UsuarioControllers{
    async listAll(req,res){
        let result = await usuarios.findAll()
        !result.validated
        ?res.status(404).json({sucess:false, message:result.error})
        :res.status(200).json({sucess:true,values: result.values})
    }
    async listOne(req, res){
        if(isNaN(req.params.id)){
            res.status(400).json({sucess:false, message: 'Id inválido!'})

        }else{
            let result= await usuarios.findByld(req.params.id)
        if(!result.validated){
            res.status(404).json({sucess:false, message:result.error})
        }else{
            result.values==undefined
            ?res.status(406).json({sucess:false, message: 'Usuario não encontrado'})
            :res.status(200).json({sucess:true,values: result.values})
        }
        }
        
    }
    async new(req,res){
        let{nome, cpf, telefone, endereco, cep, email, genero, senha, cidade_idCidade, idcargo}= req.body
        let result = await usuarios.creat(nome, cpf, telefone, endereco, cep, email, genero, hashPasswordService(senha), cidade_idCidade, idcargo)

        result.validated
        ? res.status(201).json({sucess: true ,message:'Usuario Cadastrado com sucesso!'})
        : res.status(404).json({sucess: false, message: result.error} )

    }
    async editUser(req,res){
        let idcliente= req.params.idcliente
        let {nome, cpf, telefone, endereco, cep, email, genero, senha, cidade_idCidade, idcargo} = req.body
        if(isNaN(idcliente)){
            res.status(404).json({sucess:false, message: "Parametros invalidos"})
        }else{
            let result = await usuarios.update(idcliente, nome, cpf, telefone, endereco, cep, email, genero, senha, cidade_idCidade, idcargo)
            result.validated
            ? res.status(200).json({sucess:true, message: result.message})
            : res.status(406).json({sucess: false, message: result.error})
        }
     }
     async remove(req,res){
        let idcliente= req.params.idcliente
        if(isNaN(idcliente)){
            res.status(404).json({sucess:false, message: "Parametros invalidos"})
        }else{
            let result = await usuarios.delete(idcliente)
            result.validated
            ? res.status(200).json({sucess:true, message: result.message})
            : res.status(406).json({sucess: false, message: result.error})
        }
    }

}

module.exports=new UsuarioControllers()

