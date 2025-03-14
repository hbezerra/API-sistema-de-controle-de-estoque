const mongoose = require("mongoose"); // Importando a biblioteca "Mongoose" ; 

const categoriaSchema = new mongoose.Schema({ // Criando a tabela no banco de dados ; 
    nome: {type: String, required: true, unique: true, lowercase: true}, // Criando o campo "nome" ; 
    slug: {type: String, required: true, lowercase: true}, // Criando o campo "slug" ; 
    produtos: [{type: mongoose.Schema.Types.ObjectId, ref: "Produtos"}] // Criando o campo "produtos"
})

module.exports = mongoose.model("Categoria", categoriaSchema); // Exportando o model de categoria ; 