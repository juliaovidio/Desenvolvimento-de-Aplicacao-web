//requerer as variaveis de ambiente
require ('dotenv'). config()
//requerer o jwt para o desenvolviimento
const jwt =require('jsonwebtoken')

//iniciar a middleware
module.exports= function(req, res, next){
    const auth =req.headers['authorization']
    if(auth != undefined){
        try {
          const bearer =  auth.split(' ')
          let token= bearer[1]
          jwt.verify(token, process.env.SECRET)
          return next()
        } catch (error) {
            return res.status(403).json({sucess: false, Error: error, message:'Usuario não Autenticado'}) 
            
        }
        
    }else{
        return res.status(403).json({sucess: false, message:'Usuario não Autenticado'})
    }
}