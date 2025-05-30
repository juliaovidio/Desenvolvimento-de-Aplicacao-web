// vamos importar nosso user service
const vendas= require('../models/venda')

class vendaControllers{
    async listAll(req,res){
        let result = await vendas.findAll()
        !result.validated
        ?res.status(404).json({sucess:false, message:result.error})
        :res.status(200).json({sucess:true,values: result.values})
    }
    async listOne(req, res){
        if(isNaN(req.params.id)){
            res.status(400).json({sucess:false, message: 'Id inválido!'})

        }else{
            let result= await vendas.findByld(req.params.id)
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
        let{data, quant_total, valor_total, idcliente}= req.body
        let result = await vendas.creat(data, quant_total, valor_total, idcliente)
    
        result.validated
        ? res.status(201).json({sucess: true ,message:'Venda Cadastrada com sucesso!'})
        : res.status(404).json({sucess: false, message: result.error} )
    
    }
    async editVenda(req,res){
        let idvenda= req.params.idvenda
        let { data, quant_total, valor_total, idCliente} = req.body
        if(isNaN(idvenda)){
            res.status(404).json({sucess:false, message: "Parametros invalidos"})
        }else{
            let result = await vendas.update(idvenda, data, quant_total, valor_total, idCliente)
            result.validated
            ? res.status(200).json({sucess:true, message: result.message})
            : res.status(406).json({sucess: false, message: result.error})
        }
    }

     async remove(req,res){
        let idvenda= req.params.idvenda
        if(isNaN(idvenda)){
            res.status(404).json({sucess:false, message: "Parametros invalidos"})
        }else{
            let result = await vendas.delete(idvenda)
            result.validated
            ? res.status(200).json({sucess:true, message: result.message})
            : res.status(406).json({sucess: false, message: result.error})
        }
    }
}


module.exports=new vendaControllers()

