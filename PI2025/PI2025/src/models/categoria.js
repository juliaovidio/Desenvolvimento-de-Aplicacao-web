//importar a conexao com o banco
const knex = require('../config/data')


class Categoria{
    //criar um metodo para buscar todos os usuarios do banco
    async findAll(){
        // para localizar o erro
        try {
            let categorias = await knex.select(['idCategoria', 'nome']).table('categoria')
            return {validated: true, values:categorias}
        } catch (error) {
            return {validated: false, error: error}
        }
    
} 
    async findByld(id){
         try{
            let categoria=await knex.select(['idCategoria', 'nome']).where({idCategoria:id}).table('categoria')
            return categoria.length>0
              ?{validated: true, values: categoria}
              :{validated: true, values:undefined}

    } catch(error){
        return {validated: false, error:error}
    }
}


    async creat(nome){
        try {
     await knex.insert({nome:nome}).table('categoria')
    return{validated:true}
    
} catch (error) {
    return {validated: false, error:error}
}{

}



}
    async update(idCategoria, nome){
        //verificar se o usuario existe
        let categoria = await this.findByld(idCategoria)
        if(categoria.values != undefined){
            // verificando os campos que terao alterações
            let editCategoria = {}
            nome !=undefined ? editCategoria.nome=nome : null

            // realizar a alteração dos campos no banco 
            try {
                await knex.update(editCategoria).where({idCategoria:idCategoria}).table('categoria')
                return {validated: true, message: "Categoria editado com sucesso!"}

            }   catch (error) {
                    return {validated:false, error: error}
            }


        }else{
            return {validated: false, error:"Categoria não existente, portanto não pode ser alterado" }
            }
        }
    async delete(idCategoria){
        //verificar se o usuario existe
        let categoria = await this.findByld(idCategoria)
        if(categoria.values != undefined) {
            // realizar a exclusão do usuario do banco
            try {
                await knex.delete().where({idCategoria:idCategoria}).table('categoria')
                return {validated: true, message:"Categoria excluida com sucesso!"}

            } catch (error) {
                return {validated: false, error: error}
            }
        }else{
            return {validated: false, error:"Categoria não existente, portanto não pode ser alterado" }
            }
        }
}
module.exports =new Categoria()