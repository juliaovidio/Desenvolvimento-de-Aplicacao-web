//requerer express
const express = require('express')

//utilizar o metodo de rotas do express
const router = express.Router()



//requerer o metodo listar todos USUARIOS
const usuarioControllers=require('../controllers/usuarioControllers')
const loginControllers=require('../controllers/loginControllers')
const auth=require('../middleware/auth_usuario_middleware')
// rota de listar os usuarios
router.get('/usuarios',usuarioControllers.listAll )

//rota de listar um unico usuario 
router.get('/usuario/:id', usuarioControllers.listOne)

//rota de inserir um usuario novo POST
router.post('/usuarios', usuarioControllers.new)

//rota de alterar algum dado
router.put('/usuario/:idcliente', usuarioControllers.editUser)

//rota para deletar
router.delete('/usuario/:idcliente', usuarioControllers.remove)

//rota do token para login
router.get('usuario/:id', auth,usuarioControllers.listOne)
router.get('usuarios', auth, usuarioControllers.listAll)
router.put('/usuario/:id', auth,usuarioControllers.editUser)
router.delete('/usuario/:id', auth,usuarioControllers.remove)
router.post('/login', loginControllers.login)




//requerer o metodo listar todos PRODUTOS
const produtoControllers=require('../controllers/produtoControllers')

// rota de listar os PRODUTOS
router.get('/produtos',produtoControllers.listAll )

//rota de listar um unico PRODUTO
router.get('/produto/:id', produtoControllers.listOne)

//rota de inserir um prouto novo POST
router.post('/produtos', produtoControllers.new)

//rota de alterar algum dado
router.put('/produto/:idproduto', produtoControllers.editProduto)

//rota para deletar
router.delete('/produto/:idproduto', produtoControllers.remove)




//requerer o metodo listar todas VENDAS
const vendaControllers=require('../controllers/vendaControllers')

// rota de listar as VENDAS
router.get('/vendas',vendaControllers.listAll )

//rota de listar uma unica VENDA 
router.get('/venda/:id', vendaControllers.listOne)

//rota de inserir uma venda novo POST
router.post('/vendas', vendaControllers.new)

//rota de alterar algum dado
router.put('/venda/:idvenda', vendaControllers.editVenda)

//rota para deletar
router.delete('/venda/:idvenda', vendaControllers.remove)




//requerer o metodo listar todos ITENS DE VENDA
const itens_vendaControllers=require('../controllers/itens_vendaControllers')

// rota de listar os ITENS DE VENDA
router.get('/itens',itens_vendaControllers.listAll )

//rota de listar um unico ITEN
router.get('/item/:id', itens_vendaControllers.listOne)

//rota de inserir um item novo POST
router.post('/itens', itens_vendaControllers.new)

//rota de alterar algum dado
router.put('/item/:iditens_venda', itens_vendaControllers.editItens)

//rota para deletar
router.delete('/item/:iditens_venda', itens_vendaControllers.remove)




//requerer o metodo listar todas CATEGORIAS
const categoriaControllers=require('../controllers/categoriaControllers')

// rota de listar as CATEGORIAS
router.get('/categorias',categoriaControllers.listAll )

//rota de listar uma unica CATEGORIA
router.get('/categoria/:id', categoriaControllers.listOne)

//rota de inserir uma categoria novo POST
router.post('/categorias', categoriaControllers.new)

//rota de alterar algum dado
router.put('/categoria/:idCategoria', categoriaControllers.editCategoria)

//rota para deletar
router.delete('/categoria/:idCategoria', categoriaControllers.remove)






//requerer o metodo listar todas CATEGORIAS
const cidadeControllers=require('../controllers/cidadeControllers')

// rota de listar as CATEGORIAS
router.get('/cidades',cidadeControllers.listAll )

//rota de listar uma unica CATEGORIA
router.get('/cidade/:id', cidadeControllers.listOne)

//rota de inserir uma cidade novo POST
router.post('/cidades', cidadeControllers.new)

//rota de alterar algum dado
router.put('/cidade/:idCidade', cidadeControllers.editCidade)

//rota para deletar
router.delete('/cidade/:idCidade', cidadeControllers.remove)


//requerer o metodo listar todas CATEGORIAS
const cargoControllers=require('../controllers/cargoControllers')

// rota de listar as CATEGORIAS
router.get('/cargos',cargoControllers.listAll )

//rota de listar uma unica CATEGORIA
router.get('/cargo/:id', cargoControllers.listOne)

//rota de inserir uma categoria novo POST
router.post('/cargos', cargoControllers.new)

//rota de alterar algum dado
router.put('/cargo/:idcargo', cargoControllers.editCargo)

//rota para deletar
router.delete('/cargo/:idcargo', cargoControllers.remove)






module.exports=router