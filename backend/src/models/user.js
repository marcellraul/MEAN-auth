const {Schema, model} = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new Schema({
    username: String,
    email: String,
    pass: String
})

userSchema.methods.encryptPass = async (pass) => {
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(pass, salt)
}

userSchema.methods.ValidatePass = function (pass){
    return bcrypt.compare(pass, this.pass)

}

module.exports = model('User', userSchema)// esta es la table en la db