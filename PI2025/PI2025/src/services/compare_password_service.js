const bcrypt = require ('bcryptjs');

function comparePasswordService(password, usuario_passoword){
    let isPassword = bcrypt.compareSync(password, usuario_passoword)
    return isPassword

}

module.exports = comparePasswordService