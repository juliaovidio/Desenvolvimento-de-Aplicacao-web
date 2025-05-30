// vamos importar nosso user service
const itens= require('../models/itens_venda')

class itens_vendaControllers{
    async listAll(req,res){
        let result = await itens.findAll()
        !result.validated
        ?res.status(404).json({sucess:false, message:result.error})
        :res.status(200).json({sucess:true,values: result.values})
    }
    async listOne(req, res){
        if(isNaN(req.params.id)){
            res.status(400).json({sucess:false, message: 'Id inválido!'})

        }else{
            let result= await itens.findByld(req.params.id)
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
         let{quant_unit, valor_unit, idProduto, idVenda}= req.body
         let result = await itens.creat(quant_unit, valor_unit, idProduto, idVenda)
    
        result.validated
        ? res.status(201).json({sucess: true ,message:'Itens de venda Cadastrada com sucesso!'})
        : res.status(404).json({sucess: false, message: result.error} )
    
     }
    async editItens(req,res){
            let iditens_venda= req.params.iditens_venda
            let { quant_unit, valor_unit, idProduto, idVenda} = req.body
            if(isNaN(iditens_venda)){
                res.status(404).json({sucess:false, message: "Parametros invalidos"})
            }else{
                let result = await itens.update(iditens_venda,  quant_unit, valor_unit, idProduto, idVenda)
                result.validated
                ? res.status(200).json({sucess:true, message: result.message})
                : res.status(406).json({sucess: false, message: result.error})
            }
        }

     async remove(req,res){
        let iditens_venda= req.params.iditens_venda
        if(isNaN(iditens_venda)){
            res.status(404).json({sucess:false, message: "Parametros invalidos"})
        }else{
            let result = await itens.delete(iditens_venda)
            result.validated
            ? res.status(200).json({sucess:true, message: result.message})
            : res.status(406).json({sucess: false, message: result.error})
        }
    }
    }


module.exports=new itens_vendaControllers()

