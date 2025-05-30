// vamos importar nosso user service
const produtos= require('../models/produtos')

class produtoControllers{
    async listAll(req,res){
        let result = await produtos.findAll()
        !result.validated
        ?res.status(404).json({sucess:false, message:result.error})
        :res.status(200).json({sucess:true,values: result.values})
    }
    async listOne(req, res){
        if(isNaN(req.params.id)){
            res.status(400).json({sucess:false, message: 'Id inválido!'})

        }else{
            let result= await produtos.findByld(req.params.id)
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
        let{descricao, valor, estoque, categoria_idCategoria}= req.body
        let result = await produtos.creat(descricao, valor, estoque, categoria_idCategoria)

        result.validated
        ? res.status(201).json({sucess: true ,message:'Produto Cadastrado com sucesso!'})
        : res.status(404).json({sucess: false, message: result.error} )

    }
     async editProduto(req,res){
            let idproduto= req.params.idproduto
            let { descricao, valor, estoque, categoria_idCategoria} = req.body
            if(isNaN(idproduto)){
                res.status(404).json({sucess:false, message: "Parametros invalidos"})
            }else{
                let result = await produtos.update(idproduto, descricao, valor, estoque, categoria_idCategoria)
                result.validated
                ? res.status(200).json({sucess:true, message: result.message})
                : res.status(406).json({sucess: false, message: result.error})
            }
         }
     async remove(req,res){
            let idproduto= req.params.idproduto
            if(isNaN(idproduto)){
                res.status(404).json({sucess:false, message: "Parametros invalidos"})
            }else{
                let result = await produtos.delete(idproduto)
                result.validated
                ? res.status(200).json({sucess:true, message: result.message})
                : res.status(406).json({sucess: false, message: result.error})
            }
        }
    
}

module.exports=new produtoControllers()

