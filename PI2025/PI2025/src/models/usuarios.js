//importar a conexao com o banco
const knex = require('../config/data')


class Usuario{
    //criar um metodo para buscar todos os usuarios do banco
    async findAll(){
        // para localizar o erro
        try {
            let usuarios = await knex.select(['idcliente', 'nome', 'cpf', 'telefone', 'endereco', 'cep', 'email', 'genero', 'senha', 'cidade_idCidade', 'idcargo']).table('cliente')
            return {validated: true, values:usuarios}
        } catch (error) {
            return {validated: false, error: error}
        }
    
} 
    async findByld(id){
         try{
            let usuario=await knex.select(['idcliente', 'nome', 'cpf', 'telefone', 'endereco', 'cep', 'email', 'genero', 'senha', 'cidade_idCidade', 'idcargo' ]).where({idcliente:id}).table('cliente')
            return usuario.length>0
              ?{validated: true, values: usuario}
              :{validated: true, values:undefined}

    } catch(error){
        return {validated: false, error:error}
    }
}
 async findByEmail(email){
        try{
            let usuario=await knex.select(['email', 'senha']). where({email:email}).table('cliente')
             return usuario.length>0
            ?{validated: true, values: usuario[0]}
            :{validated: true, values:undefined}

        } catch (error) {
            return {validated: false, error: error}

        }
    }


    async creat(nome, cpf, telefone, endereco, cep, email, genero, senha, cidade_idCidade, idcargo){
    try {
         await knex.insert({nome:nome, cpf:cpf, telefone:telefone, endereco:endereco, cep:cep, email:email, genero:genero, senha:senha, cidade_idCidade:cidade_idCidade, idcargo:idcargo}).table('cliente')
        return{validated:true}
        
    } catch (error) {
        return {validated: false, error:error}
    }{

    }

}
    async update(idcliente, nome, cpf, telefone, endereco, cep, email, genero, senha, cidade_idCidade, idcargo){
        //verificar se o usuario existe
        let usuario = await this.findByld(idcliente)
        if(usuario.values != undefined){
            // verificando os campos que terao alterações
            let editUser = {}
            nome !=undefined ? editUser.nome=nome : null
            cpf !=undefined ? editUser.cpf=cpf : null
            telefone !=undefined ? editUser.telefone=telefone : null
            endereco !=undefined ? editUser.endereco=endereco: null
            cep !=undefined ? editUser.cep=cep : null
            email !=undefined ? editUser.email=email : null
            genero !=undefined ? editUser.genero=genero : null
            senha !=undefined ? editUser.senha=senha : null
            cidade_idCidade !=undefined ? editUser.cidade_idCidade=cidade_idCidade : null
            idcargo !=undefined ? editUser.idcargo=idcargo : null

            // realizar a alteração dos campos no banco 
            try {
                await knex.update(editUser).where({idcliente:idcliente}).table('cliente')
                return {validated: true, message: "Usuario editado com sucesso!"}

            }   catch (error) {
                    return {validated:false, error: error}
            }


        }else{
            return {validated: false, error:"Usuario não existente, portanto não pode ser alterado" }
            }
        }
    async delete(idcliente){
        //verificar se o usuario existe
        let usuario = await this.findByld(idcliente)
        if(usuario.values != undefined) {
            // realizar a exclusão do usuario do banco
            try {
                await knex.delete().where({idcliente:idcliente}).table('cliente')
                return {validated: true, message:"Usuario excluido com sucesso!"}

            } catch (error) {
                return {validated: false, error: error}
            }
        }else{
            return {validated: false, error:"Usuario não existente, portanto não pode ser alterado" }
        }
    }


}

module.exports =new Usuario()