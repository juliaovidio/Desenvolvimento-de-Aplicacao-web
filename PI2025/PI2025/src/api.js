//requerer as rotas
const routers = require('./routers/routers')
const cors=require('cors')
const express = require('express');
const api = express();


api.use(cors())

//informar que API podera utilizar urls(links)
api.use(express.urlencoded({extended:false}))

//informar que API ira utilizar o json
api.use(express.json())

//utulizar as rotas
api.use('/', routers)


module.exports = api