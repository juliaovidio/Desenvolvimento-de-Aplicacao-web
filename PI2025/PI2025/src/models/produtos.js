//importar a conexao com o banco
const knex = require('../config/data')


class Produto{
    //criar um metodo para buscar todos os usuarios do banco
    async findAll(){
        // para localizar o erro
        try {
            let produtos = await knex.select(['idproduto', 'descricao', 'valor', 'estoque', 'categoria_idCategoria']).table('produto')
            return {validated: true, values:produtos}
        } catch (error) {
            return {validated: false, error: error}
        }
    
} 
    async findByld(id){
         try{
            let produto=await knex.select(['idproduto', 'descricao', 'valor', 'estoque', 'categoria_idCategoria']).where({idproduto:id}).table('produto')
            return produto.length>0
              ?{validated: true, values: produto}
              :{validated: true, values:undefined}

    } catch(error){
        return {validated: false, error:error}
    }
}
    async creat(descricao, valor, estoque, categoria_idCategoria){
        try {
    await knex.insert({descricao:descricao, valor:valor, estoque:estoque, categoria_idCategoria:categoria_idCategoria}).table('produto')
    return{validated:true}

    } catch (error) {
    return {validated: false, error:error}
    }{

}


}
    async update(idproduto, descricao, valor, estoque, categoria_idCategoria){
        //verificar se o usuario existe
        let produto = await this.findByld(idproduto)
        if(produto.values != undefined){
            // verificando os campos que terao alterações
            let editProduto = {}
            descricao!=undefined ? editProduto.descricao=descricao : null
            valor !=undefined ? editProduto.valor=valor : null
            estoque !=undefined ? editProduto.estoque=estoque : null
            categoria_idCategoria !=undefined ? editProduto.categoria_idCategoria=categoria_idCategoria: null

            // realizar a alteração dos campos no banco 
            try {
                await knex.update(editProduto).where({idproduto:idproduto}).table('produto')
                return {validated: true, message: "Produto editado com sucesso!"}

            }   catch (error) {
                    return {validated:false, error: error}
            }


        }else{
            return {validated: false, error:"Produto não existente, portanto não pode ser alterado" }
            }
        }
    async delete(idproduto){
        //verificar se o usuario existe
        let produto = await this.findByld(idproduto)
        if(produto.values != undefined) {
            // realizar a exclusão do usuario do banco
            try {
                await knex.delete().where({idproduto:idproduto}).table('produto')
                return {validated: true, message:"Produto excluido com sucesso!"}

            } catch (error) {
                return {validated: false, error: error}
            }
        }else{
            return {validated: false, error:"Produto não existente, portanto não pode ser alterado" }
        }
    }


}

module.exports =new Produto()