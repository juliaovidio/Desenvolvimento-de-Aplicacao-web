//importar a conexao com o banco
const knex = require('../config/data')


class itens_venda{
    //criar um metodo para buscar todos os usuarios do banco
    async findAll(){
        // para localizar o erro
        try {
            let itens= await knex.select(['iditens_venda',  'quant_unit', 'valor_unit', 'idProduto','idVenda']).table('itens_venda')
            return {validated: true, values:itens}
        } catch (error) {
            return {validated: false, error: error}
        }
    
} 
    async findByld(id){
         try{
            let item=await knex.select(['iditens_venda',  'quant_unit', 'valor_unit', 'idProduto','idVenda']).where({iditens_venda:id}).table('itens_venda')
            return item.length>0
              ?{validated: true, values: item}
              :{validated: true, values:undefined}

    } catch(error){
        return {validated: false, error:error}
    }
}


    async creat(quant_unit, valor_unit, idProduto, idVenda){
        try {
    await knex.insert({quant_unit:quant_unit, valor_unit:valor_unit, idProduto:idProduto, idVenda:idVenda}).table('itens_venda')
    return{validated:true}

    } catch (error) {
    return {validated: false, error:error}
    }{
}
}
    async update(iditens_venda,  quant_unit, valor_unit, idProduto, idVenda){
        //verificar se o usuario existe
        let item = await this.findByld(iditens_venda)
        if(item.values != undefined){
            // verificando os campos que terao alterações
            let editItens = {}
            quant_unit !=undefined ? editItens.quant_unit=quant_unit : null
            valor_unit !=undefined ? editItens.valor_unit=valor_unit : null
            idProduto !=undefined ? editItens.idProduto=idProduto : null
            idVenda !=undefined ? editItens.idVenda=idVenda: null


            // realizar a alteração dos campos no banco 
            try {
                await knex.update(editItens).where({iditens_venda:iditens_venda}).table('itens_venda')
                return {validated: true, message: "Itens editado com sucesso!"}

            }   catch (error) {
                    return {validated:false, error: error}
            }


        }else{
            return {validated: false, error:"Itens de venda não existente, portanto não pode ser alterado" }
            }
        }
    async delete(iditens_venda){
        //verificar se o usuario existe
        let item = await this.findByld(iditens_venda)
        if(item.values != undefined) {
            // realizar a exclusão do usuario do banco
            try {
                await knex.delete().where({iditens_venda:iditens_venda}).table('itens_venda')
                return {validated: true, message:"Item excluido com sucesso!"}

            } catch (error) {
                return {validated: false, error: error}
            }
        }else{
            return {validated: false, error:"Item não existente, portanto não pode ser alterado" }
        }
    }
}

module.exports =new  itens_venda()