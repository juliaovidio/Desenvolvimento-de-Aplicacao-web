//importar a conexao com o banco
const knex = require('../config/data')


class venda{
    //criar um metodo para buscar todos os usuarios do banco
    async findAll(){
        // para localizar o erro
        try {
            let vendas = await knex.select(['idvenda', 'data',  'quant_total', 'valor_total', 'idcliente']).table('venda')
            return {validated: true, values:vendas}
        } catch (error) {
            return {validated: false, error: error}
        }
    
} 
    async findByld(id){
         try{
            let venda=await knex.select(['idvenda', 'data',  'quant_total', 'valor_total', 'idcliente']).where({idVenda:id}).table('venda')
            return venda.length>0
              ?{validated: true, values: venda}
              :{validated: true, values:undefined}

    } catch(error){
        return {validated: false, error:error}
    }
}


    async creat(data, quant_total, valor_total, idCliente){
        try {
    await knex.insert({data:data, quant_total:quant_total, valor_total:valor_total, idCliente:idCliente}).table('venda')
    return{validated:true}

    } catch (error) {
return {validated: false, error:error}
}{
}}
    async update(idvenda, data, quant_total, valor_total, idCliente){
        //verificar se o usuario existe
        let venda = await this.findByld(idvenda)
        if(venda.values != undefined){
            // verificando os campos que terao alterações
            let editVenda= {}
            data!=undefined ? editVenda.data=data: null
            quant_total !=undefined ? editVenda.quant_total=quant_total : null
            valor_total !=undefined ? editVenda.valor_total=valor_total : null
            idCliente !=undefined ? editVenda.idCliente=idCliente: null

            // realizar a alteração dos campos no banco 
            try {
                await knex.update(editVenda).where({idvenda:idvenda}).table('venda')
                return {validated: true, message: "Venda editada com sucesso!"}

            }   catch (error) {
                    return {validated:false, error: error}
            }


        }else{
            return {validated: false, error:"Venda não existente, portanto não pode ser alterado" }
            }
        }
    

    async delete(idvenda){
        //verificar se o usuario existe
        let venda = await this.findByld(idvenda)
        if(venda.values != undefined) {
            // realizar a exclusão do usuario do banco
            try {
                await knex.delete().where({idvenda:idvenda}).table('venda')
                return {validated: true, message:"Venda excluida com sucesso!"}

            } catch (error) {
                return {validated: false, error: error}
            }
        }else{
            return {validated: false, error:"Venda não existente, portanto não pode ser alterado" }
            }
        }
   
}

module.exports =new  venda()