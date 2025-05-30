require('dotenv').config()

//importar o objeto api
const api=require('./src/api')


//inicializar o servidor 
api.listen(process.env.PORT,()=>{console.log('\n INICIALIZADO')})