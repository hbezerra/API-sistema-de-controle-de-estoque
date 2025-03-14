const mongoose = require("mongoose"); // Importando a biblioteca "mongoose"; 

const produtoSchema = new mongoose.Schema({ // Criando a tabela no banco de dados ; 
    nome: {type: String, required: true, unique: true, lowercase: true}, // Criando o campo "nome" ; 
    descricao: {type: String, required: true}, // Criando o campo "descrição" ; 
    preco: {type: Number, required: true, min: 0}, // Criando o campo "preço" ; 
    quantidade: {type: Number, required: true, min: 0}, // Criando o campo "quantidade" ; 
    categoria: {type: mongoose.Schema.Types.ObjectId, ref : "Categoria", required: true} // Criando o campo "categoria" ; 
})

module.exports = mongoose.model("Produtos", produtoSchema); // Exportando o model de produtos ; 