const mongoose = require("mongoose"); // Importando a biblioteca "Mongoose";
const bcrypt = require("bcrypt"); // Importando a biblioteca "Bcrypt"; 

let userSchema = new mongoose.Schema({ // Criando o Schema de usuário ; 
    name: {type: String, required: true, lowercase: true}, // Criando o campo "nome" ;
    email: {type: String, required: true, unique: true, lowercase: true}, // Criando o campo "email" ; 
    password: {type: String, required: true, lowercase: true}, // Criando o campo "senha" ; 
    created_at: {type: Date, default: Date.now} // Criando o campo "Criado" ; 
}); 

// Transformando a senha em hash antes de salvar no banco de dados ; 
userSchema.pre("save", function (next) {
    if (this.isNew || this.isModified("password")) {
        bcrypt.hash(this.password, 10, (err, hashedPassword) => {
            if (err) next(err);
            else {
                this.password = hashedPassword;
                next();
            }
        });
    } 
});

// Verificando se a senha fornecida pelo usuário corresponde a senha armazenada em formato hash ; 
userSchema.methods.isCorrectPassword = function (password, callback) {
    bcrypt.compare(password, this.password, (err, same) => {
        if(err) callback(err); 
        else callback(null, same);
    })
}

module.exports = mongoose.model('User', userSchema);