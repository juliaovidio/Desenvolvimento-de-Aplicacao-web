//importar a conexao com o banco
const knex = require('../config/data')


class Cargo{
    //criar um metodo para buscar todos os usuarios do banco
    async findAll(){
        // para localizar o erro
        try {
            let cargos = await knex.select(['idcargo', 'tipo', 'descricao']).table('cargo')
            return {validated: true, values:cargos}
        } catch (error) {
            return {validated: false, error: error}
        }
    
} 
    async findByld(id){
         try{
            let cargo=await knex.select(['idcargo', 'tipo', 'descricao']).where({idcargo:id}).table('cargo')
            return cargo.length>0
              ?{validated: true, values: cargo}
              :{validated: true, values:undefined}

    } catch(error){
        return {validated: false, error:error}
    }
}


    async creat(descricao, tipo){
        try {
     await knex.insert({descricao:descricao, tipo:tipo}).table('cargo')
    return{validated:true}
    
} catch (error) {
    return {validated: false, error:error}
}{

}



}
    async update(idcargo, descricao, tipo){
        //verificar se o usuario existe
        let cargo = await this.findByld(idcargo)
        if(cargo.values != undefined){
            // verificando os campos que terao alterações
            let editCargo = {}
            descricao !=undefined ? editCargo.descricao=descricao : null
            tipo !=undefined ? editCargo.tipo=tipo : null

            // realizar a alteração dos campos no banco 
            try {
                await knex.update(editCargo).where({id:idcargo}).table('cargo')
                return {validated: true, message: "Cargo editado com sucesso!"}

            }   catch (error) {
                    return {validated:false, error: error}
            }


        }else{
            return {validated: false, error:"Cargo não existente, portanto não pode ser alterado" }
            }
        }
    async delete(idcargo){
        //verificar se o usuario existe
        let cargo = await this.findByld(idcargo)
        if(cargo.values != undefined) {
            // realizar a exclusão do usuario do banco
            try {
                await knex.delete().where({id:idcargo}).table('cargo')
                return {validated: true, message:"Cargo excluida com sucesso!"}

            } catch (error) {
                return {validated: false, error: error}
            }
        }else{
            return {validated: false, error:"Cargo não existente, portanto não pode ser alterado" }
            }
        }
}
module.exports =new Cargo()