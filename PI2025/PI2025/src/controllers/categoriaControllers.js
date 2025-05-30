// vamos importar nosso user service
const categorias= require('../models/categoria')

class categoriaControllers{
    async listAll(req,res){
        let result = await categorias.findAll()
        !result.validated
        ?res.status(404).json({sucess:false, message:result.error})
        :res.status(200).json({sucess:true,values: result.values})
    }
    async listOne(req, res){
        if(isNaN(req.params.id)){
            res.status(400).json({sucess:false, message: 'Id inválido!'})

        }else{
            let result= await categorias.findByld(req.params.id)
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
        let{nome}= req.body
        let result = await categorias.creat(nome)

        result.validated
        ? res.status(201).json({sucess: true ,message:'Categoria Cadastrada com sucesso!'})
        : res.status(404).json({sucess: false, message: result.error} )

    }

    async editCategoria(req,res){
            let idCategoria= req.params.idCategoria
            let {nome} = req.body
            if(isNaN(idCategoria)){
                res.status(404).json({sucess:false, message: "Parametros invalidos"})
            }else{
                let result = await categorias.update(idCategoria, nome)
                result.validated
                ? res.status(200).json({sucess:true, message: result.message})
                : res.status(406).json({sucess: false, message: result.error})
            }
     }
     async remove(req,res){
        let idCategoria= req.params.idCategoria
        if(isNaN(idCategoria)){
            res.status(404).json({sucess:false, message: "Parametros invalidos"})
        }else{
            let result = await categorias.delete(idCategoria)
            result.validated
            ? res.status(200).json({sucess:true, message: result.message})
            : res.status(406).json({sucess: false, message: result.error})
        }
    }
}

module.exports=new categoriaControllers()

