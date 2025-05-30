const bcrypt = require('bcryptjs');

function hashPasswordService(password){
    let salt =bcrypt.genSaltSync(10)
    let passHast =bcrypt.hashSync(password, salt)
    
    return passHast

}

module.exports= hashPasswordService