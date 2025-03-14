const {mongoose} = require("mongoose");
const Produto = require("../model/Produto"); // Importando o model de produtos ; 
const Categoria = require("../model/Categoria"); // Importando o model de categorias ; 

const getProducts = async (req, res) => { // Função responsável por selecionar todos os produtos cadastrados no banco de dados ; 
    try {
        const produtos = await Produto.find().populate("categoria"); // Selecionando todos os produtos cadastrados no banco de dados e atribuindo a variável ;
        return res.status(200).json(produtos); // Retornando os produtos cadastrados ; 
    }
    catch (error) {
        console.log(error)
        res.status(500).json({message: "Erro ao selecionar os produtos cadastrados no banco de dados!"}); // Atribuindo a mensagem de erro ; 
    }
}

const addProduct = async (req, res) => { // Função responsável por adicionar um produto no banco de dados ; 
    try {
        let {nome, descricao, preco, quantidade, categoria} = req.body; // Recuperando os valores informados pelo usuário e atribuindo as variáveis ; 
        
        if(!nome, !descricao, !preco, !quantidade, !categoria) {return res.status(400).json({message: "Erro ao adicionar produto! Todos os campos são necessários!"})}; // Retornando mensagem de erro baseada na condição ;  
        if(isNaN(preco) || isNaN(quantidade)) {return res.status(400).json({message: "Erro ao adicionar produto! Quantidade e preço precisam ter valores válidos!"})} // Retornando mensagem de erro baseada na condição ;a 
        if(!mongoose.Types.ObjectId.isValid(categoria)) {return res.status(400).json({message: "Erro ao adicionar produto! O ID da categoria é inválido!"})}; // Retornando mensagem de erro baseada na condição ; 
        
        const categoriaExistente = await Categoria.findById(categoria); // Verificando se existe uma categoria com o ID informado ; 
        if(!categoriaExistente) {return res.status(400).json({message: "Erro ao adicionar produto, o produto precisa ter uma categoria obrigatoriamente!"})}; // Retornando a mensagem de erro baseada na condição ; 

        nome = nome.trim().toLowerCase(); // Excluindo os espaços em branco e transformando tudo em mínuscula ; 
        const produtoExistente = await Produto.findOne({nome}); // Verificando se no banco de dados existe um produto com o nome informado pelo usuário ; 
        if(produtoExistente) {return res.status(400).json({message: "Erro ao adicionar produto! Já existe um produto com o nome informado!"})}; // Caso exista um produto com o nome informado, retornando uma mensagem de erro ; 

        const novoProduto = await Produto.create({nome, descricao, preco, quantidade, categoria}); // Criando o novo produto e adicionando no banco de dados ; 

        if(novoProduto) { // Caso o novo produto tenha sido criado com sucesso ; 
            await Categoria.findByIdAndUpdate(categoria, {$push: {produtos: novoProduto._id}}); // Na categoria relacionada, vinculando o novo produto ao array existente ; 
            return res.status(201).json({message: `O produto: ${novoProduto.nome} foi adicionado com sucesso!`}); // Atribuindo a mensagem de sucesso ; 
        }
        else {
            return res.status(400).json({message: "Erro ao adicionar produto no banco de dados!"}); // Atribuindo a mensagem de erro ; 
        }
    }
    catch (error) {
        res.status(500).json({message: "Erro ao adicionar produto no banco de dados!"}); // Atribuindo a mensagem de erro ; 
    }
}

const deleteProduct = async (req, res) => { // Função responsável por deletar um produto no banco de dados ; 
    try {
        const {id} = req.params; // Recuperando o ID do produto a ser removido e atribuindo a variável ; 

        if(!id || !mongoose.Types.ObjectId.isValid(id)) {return res.status(400).json({message: "Erro ao deletar produto! O ID não possui um formato válido!"})}; // Atribuindo uma mensagem de erro baseada na condição ; 

        const removerProduto = await Produto.findByIdAndDelete(id); // Selecionando e deletando o produto com o ID informado ; 
        
        if(removerProduto) { // Caso o produto tenha sido removido ; 
            await Categoria.findByIdAndUpdate(removerProduto.categoria, {$pull: {produtos: removerProduto._id}}); // Na categoria relacionada, excluindo o ID do produto removido ; 
            return res.status(200).json({message: "Produto removido com sucesso!"}); // Atribuindo a mensagem de sucesso ; 
        }
        else {
            return res.status(400).json({message: "Erro ao deletar produto! Nao foi possível encontrar nenhum pedido com o ID informado"}); // Atribuindo a mensagem de erro ; 
        }
    }
    catch (error) {
        res.status(500).json({message: "Erro ao deletar produto no banco de dados!"}); // Atribuindo a mensagem de erro ;  
    }
}

const putProduct = async (req, res) => { // Função responsável por atualizar um produto no banco de dados ; 
    try {
        const {id} = req.params; // Recuperando o ID do produto a ser atualizado ; 
        let {nome, descricao, preco, quantidade, categoria} = req.body; // Recuperando os valores informados pelo usuário e atribuindo as variáveis ; 

        if(!nome, !descricao, !preco, !quantidade, !categoria) {return res.status(400).json({message: "Erro ao atualizar produto! Todos os campos são necessários!"})}; // Retornando mensagem de erro baseada na condição ;  
        if(isNaN(preco) || isNaN(quantidade)) {return res.status(400).json({message: "Erro ao atualizar produto! Quantidade e preço precisam ter valores válidos!"})} // Retornando mensagem de erro baseada na condição ;a 
        if(!mongoose.Types.ObjectId.isValid(categoria)) {return res.status(400).json({message: "Erro ao atualizar produto! O ID da categoria é inválido!"})}; // Retornando mensagem de erro baseada na condição ; 
    
        const categoriaExistente = await Categoria.findById(categoria); // Verificando se existe uma categoria com o ID informado ; 
        if(!categoriaExistente) {return res.status(400).json({message: "Erro ao atualizar produto, o produto precisa ter uma categoria obrigatoriamente!"})}; // Retornando a mensagem de erro baseada na condição ; 

        nome = nome.trim().toLowerCase(); // Excluindo os espaços em branco e transformando tudo em mínuscula ; 
        
        const idValido  = await Produto.findById(id); // Verificando se existe um produto com o ID informado ;
        if(!idValido) {return res.status(400).json({message: "Erro ao atualizar produto! O ID informado é inválido"})}; // Atribuindo a mensagem de erro baseado na condição ;  

        const produtoExistente = await Produto.findOne({nome}); // Verificando se no banco de dados existe um produto com o nome informado pelo usuário ; 
        if(produtoExistente && produtoExistente._id.toString() !== id) {return res.status(400).json({message: "Erro ao atualizar produto! Já existe um produto com o nome informado!"})}; // Caso exista um produto com o nome informado, retornando uma mensagem de erro ; 


        if(produtoExistente.categoria.toString() !== categoria) { // Verificando se a categoria a ser atualizada, é diferente da categoria cadastrada ; 
            await Categoria.findByIdAndUpdate(produtoExistente.categoria, {$pull: {produtos: produtoExistente._id}}); // Adicionando a nova categoria o produto relacionado ; 
            await Categoria.findByIdAndUpdate(categoria, {$push: {produtos: produtoExistente._id}}) // Removendo a nova categoria o produto relacionado ; 
        }
        
        const atualizarProduto = await Produto.findByIdAndUpdate(id, {nome, descricao, preco, quantidade , categoria}); // Atualizando o produto no banco de dados ; 
        const retornoUser = atualizarProduto ? res.status(200).json({message: "Produto atualizado com sucesso!"}) : res.status(404).json({message: "Erro ao atualizar produto!"}); // Atribuindo a mensagem de erro ou sucesso baseada na condição ; 
        return retornoUser;
    }
    catch (error) {
        res.status(500).json({message: "Erro ao atualizar produto no banco de dados!"}); // Atribuindo a mensagem de erro ; 
    }
}

const incrementProduct = async (req, res) => { // Função responsável por incrementar um produto no banco de dados ;  
    try {
        const {id} = req.params; // Recuperando o ID do produto a ser incrementado ;  
        let {quantidade} = req.body; // Recuperando a quantidade a ser incrementada ; 

        if(!id || !mongoose.Types.ObjectId.isValid(id)) {return res.status(400).json({message: "Erro ao incrementar produto! O ID informado é inválido!"})}; // Atribuindo a mensagem de erro baseada na condição  ; 
        if(!quantidade || quantidade < 0) {return res.status(400).json({message: "Erro ao incrementar produto! Quantidade passada é inválida!"})}; // Atribuindo a mensagem de erro baseada na condição ; 

        const produtoExistente = await Produto.findById(id); // Verificando se existe um produto cadastrado no banco de dados com o ID informado ; 
        if(!produtoExistente) {return res.status(400).json({message: "Erro ao incrementar quantidade! Não foi possível encontrar nenhum produto com o ID informado!"})}; // Atribuindo a mensagem de erro baseada na condição ; 

        produtoExistente.quantidade += quantidade ; // Incrementando o valor da quantidade no produto existente ; 

        await produtoExistente.save(); // Salvando a alteração no banco de dados ; 

        return res.status(200).json({message: "Produto incrementado com sucesso!"}); // Atribuindo a mensagem de sucesso! ;         
    }
    catch (error) {
        console.log(error)
        res.status(500).json({message: "Erro ao incrementar produto"}); // Atribuindo a mensagem de erro ; 
    }
}

const decrementProduct = async (req, res) => { // Função responsável por decrementar um produto no banco de dados ; 
    try {
        const {id} = req.params; // Recuperando o ID do produto a ser decrementada;  
        let {quantidade} = req.body; // Recuperando a quantidade a ser decrementada ; 

        if(!id || !mongoose.Types.ObjectId.isValid(id)) {return res.status(400).json({message: "Erro ao decrementar produto! O ID informado é inválido!"})}; // Atribuindo a mensagem de erro baseada na condição  ; 
        if(!quantidade || quantidade < 0) {return res.status(400).json({message: "Erro ao decrementar produto! Quantidade passada é inválida!"})}; // Atribuindo a mensagem de erro baseada na condição ; 

        const produtoExistente = await Produto.findById(id); // Verificando se existe um produto cadastrado no banco de dados com o ID informado ; 
        if(!produtoExistente) {return res.status(400).json({message: "Erro ao decrementar quantidade! Não foi possível encontrar nenhum produto com o ID informado!"})}; // Atribuindo a mensagem de erro baseada na condição ; 

        if(produtoExistente.quantidade - quantidade < 0) {return res.status(400).json({message: "Erro ao decrementar produto! A quantidade em estoque não pode ser inferior a 0!"})}; // Atribuindo a mensagem de erro baseada na condição ; 

        produtoExistente.quantidade -= quantidade; // Decrementando o valor da quantidade no produto existente ; 
        
        await produtoExistente.save(); // Salvando a alteração no banco de dados ; 
        return res.status(200).json({message: "Produto decrementado com sucesso!"}); // Atribuindo a mensagem de sucesso! ;         
    }
    catch(error) {
        console.log(error)
        res.status(500).json({message: "Erro ao decrementar produto"}); // Atribuindo a mensagem de erro
    }

}

module.exports = {getProducts, addProduct, deleteProduct, putProduct, incrementProduct, decrementProduct}; // Exportando as funções para serem usados no router ; 