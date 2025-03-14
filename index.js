// IMPORT DE BIBLIOTECAS ; 
const express = require("express"); // Importando a biblioteca "Express" ;
const bodyParser = require("body-parser"); // Importando a biblioteca "Body-parser"; 


// IMPORT DE ARQUIVOS ; 
const db = require("./database/db"); // Importando a conexão com o banco de dados ; 
const categoriaRouter = require("./router/CategoriaRouter"); // Importando o router de categorias ;
const produtoRouter = require("./router/ProdutoRouter"); // Importando o router de produtos ;
const userRouter = require("./router/UserRouter"); // Importando o router de usuário ; 

// UTILIZAÇÃO DE BIBLIOTECAS ; 
const app = express(); // Atribuindo a variável "app" uma instância de "Express" ; 
app.use(bodyParser.json()); // Fazendo com que o corpo das requisições sejam lidos como JSON ; 

app.use("/", userRouter); // Utilizando o router de usuários ; 
app.use("/api", categoriaRouter); // Utilizando o router de categorias ; 
app.use("/api", produtoRouter); // Utilizando o router de produtos ; 


// SERVIDOR ; 
const PORT = 3000; // Atribuindo a variável a porta no qual o servidor será rodado ; 
app.listen(PORT, () => { // Iniciando o servidor ; 
    console.log(`Servidor iniciado! Localhost:${PORT}`); // Atribuindo a mensagem de sucesso ; 
})