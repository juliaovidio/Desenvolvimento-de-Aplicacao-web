// vamos importar nosso user service
const cargos= require('../models/cargo')

class cargoControllers{
    async listAll(req,res){
        let result = await cargos.findAll()
        !result.validated
        ?res.status(404).json({sucess:false, message:result.error})
        :res.status(200).json({sucess:true,values: result.values})
    }
    async listOne(req, res){
        if(isNaN(req.params.id)){
            res.status(400).json({sucess:false, message: 'Id inválido!'})

        }else{
            let result= await cargos.findByld(req.params.id)
        if(!result.validated){
            res.status(404).json({sucess:false, message:result.error})
        }else{
            result.values==undefined
            ?res.status(406).json({sucess:false, message: 'Cargo não encontrado'})
            :res.status(200).json({sucess:true,values: result.values})
        }
        }
        
    }
    async new(req,res){
        let{descricao,tipo}= req.body
        let result = await cargos.creat(descricao,tipo)

        result.validated
        ? res.status(201).json({sucess: true ,message:'Cargo Cadastrada com sucesso!'})
        : res.status(404).json({sucess: false, message: result.error} )

    }

    async editCargo(req,res){
            let idcargo= req.params.idcargo
            let {descricao,tipo} = req.body
            if(isNaN(idcargo)){
                res.status(404).json({sucess:false, message: "Parametros invalidos"})
            }else{
                let result = await cargos.update(idcargo, descricao, tipo)
                result.validated
                ? res.status(200).json({sucess:true, message: result.message})
                : res.status(406).json({sucess: false, message: result.error})
            }
     }
     async remove(req,res){
        let idcargo= req.params.idcargo
        if(isNaN(idcargo)){
            res.status(404).json({sucess:false, message: "Parametros invalidos"})
        }else{
            let result = await cargos.delete(idcargo)
            result.validated
            ? res.status(200).json({sucess:true, message: result.message})
            : res.status(406).json({sucess: false, message: result.error})
        }
    }
}

module.exports=new cargoControllers()

