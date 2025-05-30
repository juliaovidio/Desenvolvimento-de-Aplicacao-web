//importar a conexao com o banco
const knex = require('../config/data')


class cidade{
    //criar um metodo para buscar todos os usuarios do banco
    async findAll(){
        // para localizar o erro
        try {
            let cidades= await knex.select(['idCidade',  'municipio', 'estado']).table('cidade')
            return {validated: true, values:cidades}
        } catch (error) {
            return {validated: false, error: error}
        }
    
} 
    async findByld(id){
         try{
            let cidade=await knex.select(['idCidade',  'municipio', 'estado']).where({idCidade:id}).table('cidade')
            return cidade.length>0
              ?{validated: true, values: cidade}
              :{validated: true, values:undefined}

    } catch(error){
        return {validated: false, error:error}
    }
}



    async creat(municipio, estado){
        try {
    await knex.insert({municipio:municipio, estado:estado}).table('cidade')
    return{validated:true}

    } catch (error) {
    return {validated: false, error:error}
    }{

    }

    }
    async update(idCidade, municipio, estado){
        //verificar se o usuario existe
        let cidade = await this.findByld(idCidade)
        if(cidade.values != undefined){
            // verificando os campos que terao alterações
            let editCidade = {}
            municipio !=undefined ? editCidade.municipio=municipio : null
            estado!=undefined ? editCidade.estado=estado : null
            

            // realizar a alteração dos campos no banco 
            try {
                await knex.update(editCidade).where({idCidade:idCidade}).table('cidade')
                return {validated: true, message: "Cidade editado com sucesso!"}

            }   catch (error) {
                    return {validated:false, error: error}
            }


        }else{
            return {validated: false, error:"Cidade não existente, portanto não pode ser alterado" }
            }
        }
    async delete(idCidade){
        //verificar se o usuario existe
        let cidade = await this.findByld(idCidade)
        if(cidade.values != undefined) {
            // realizar a exclusão do usuario do banco
            try {
                await knex.delete().where({idCidade:idCidade}).table('cidade')
                return {validated: true, message:"Cidade excluido com sucesso!"}

            } catch (error) {
                return {validated: false, error: error}
            }
        }else{
            return {validated: false, error:"Cidade não existente, portanto não pode ser alterado" }
            }
        }


}

module.exports =new  cidade()