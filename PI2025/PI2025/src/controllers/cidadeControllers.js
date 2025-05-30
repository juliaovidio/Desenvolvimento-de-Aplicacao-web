// vamos importar nosso user service
const cidades= require('../models/cidade')

class cidadeControllers{
    async listAll(req,res){
        let result = await cidades.findAll()
        !result.validated
        ?res.status(404).json({sucess:false, message:result.error})
        :res.status(200).json({sucess:true,values: result.values})
    }
    async listOne(req, res){
        if(isNaN(req.params.id)){
            res.status(400).json({sucess:false, message: 'Id inválido!'})

        }else{
            let result= await cidades.findByld(req.params.id)
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
        let{municipio, estado}= req.body
        let result = await cidades.creat(municipio, estado)

        result.validated
        ? res.status(201).json({sucess: true ,message:'Cidade Cadastrada com sucesso!'})
        : res.status(404).json({sucess: false, message: result.error} )

    }
    async editCidade(req,res){
            let idCidade= req.params.idCidade
            let {municipio, estado} = req.body
            if(isNaN(idCidade)){
                res.status(404).json({sucess:false, message: "Parametros invalidos"})
            }else{
                let result = await cidades.update(idCidade, municipio, estado)
                result.validated
                ? res.status(200).json({sucess:true, message: result.message})
                : res.status(406).json({sucess: false, message: result.error})
            }
        }
    async remove(req,res){
            let idCidade= req.params.idCidade
            if(isNaN(idCidade)){
                res.status(404).json({sucess:false, message: "Parametros invalidos"})
            }else{
                let result = await cidades.delete(idCidade)
                result.validated
                ? res.status(200).json({sucess:true, message: result.message})
                : res.status(406).json({sucess: false, message: result.error})
            }
        }

    
    }

module.exports=new cidadeControllers()

