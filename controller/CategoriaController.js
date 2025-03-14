const mongoose = require("mongoose");
const Categoria = require("../model/Categoria"); // Importando o model de categoria ; 
const Produto = require("../model/Produto"); // Importando o model de produto ; 

const slugify = require("slugify"); // Importando a biblioteca "Slugify" 

const getCategories = async (req, res) => { // Função responsável por selecionar todas as categorias cadastradas no banco de dados ; 
    try {
        const categorias = await Categoria.find(); // Selecionando todas as categorias cadastradas no banco de dados e atribuindo a variável ; 
        return res.status(500).json(categorias); // Retornando todas as categorias cadastradas no banco de dados ; 
    }
    catch (error) {
        res.status(500).json({message: "Erro ao selecionar as categorias cadastradas no banco de dados!"}); // Atribuindo a mensagem de erro ; 
    }
}

const addCategory = async (req, res) => { // Função responsável por adicionar uma categoria no banco de dados ; 
    try {
        let {nome} = req.body; // Recuperando o nome da categoria do corpo da requisição e atribuindo a variável ; 

        nome = nome.trim().toLowerCase(); // Eliminando espaços em brancos e trasformando tudo em minúsculas ; 

        if(!nome) {return res.status(400).json({message: "Erro ao adicionar categoria! O nome não pode estar vazio!"})}; // Caso o nome informado seja nulo ou undefined, atribuindo a mensagem de erro ; }

        const categoriaExistente = await Categoria.findOne({ nome}); // Verificando se existe no banco de dados uma categoria já existente com o nome informado pelo usuário ; 
        if(categoriaExistente) {return res.status(400).json({message: "Erro ao adicionar categoria! Já existe uma categoria com o nome informado!"})}; // Caso exista a categoria, atribuir a mensagem de erro ;  

        const novaCategoria = await Categoria.create({ // Criando a categoria no banco de dados ; 
            nome, 
            slug: slugify(nome)
        }); 

        const retornoUser = novaCategoria ? res.status(201).json({message: `A categoria: '${novaCategoria.nome}', foi adicionada com sucesso!`}) : res.status(500).json({message: "Erro ao adicionar categoria no banco de dados!"}); // Atribuindo a mensagem de erro ou sucesso baseada na condição ; 
        return retornoUser;
    }
    catch (error) {
        res.status(500).json({message: "Erro ao adicionar categoria no banco de dados!"}); // Atribuindo a mensagem de erro ; 
    }
}

const deleteCategory = async (req, res) => { // Função responsável por deletar uma categoria no banco de dados baseada no seu ID ; 
    try {
        
        const {id} = req.params; // Recuperando o ID da categoria a ser excluída passada como parâmetro ; 
    
        if(!id || !mongoose.Types.ObjectId.isValid(id)) { return res.status(400).json({message: "Erro ao deletar categoria! O ID informado é inválido!"})}  // Caso o ID seja inválido, atribuindo a mensagem de erro ; 

        const produtoVinculado = await Produto.findOne({categoria: id}); // Verificando se existe um produto vinculado a essa categoria para impedir remoção ; 
        if(produtoVinculado) {return res.status(400).json({message: "Erro ao excluir categoria! A um produto vinculado a essa categoria"})}; // Atribuindo a mensagem de erro ; 

        const categoriaExcluida = await Categoria.findByIdAndDelete(id); // Procurando a categoria pelo ID e deletando caso o ID seja válido ; 
        const retornoUser = categoriaExcluida ? res.status(200).json({message: "Categoria excluída com sucesso!"}) : res.status(400).json({message: "Erro ao excluir categoria. Não foi possível encontrar nenhuma categoria com o ID informado!"}); // Atribuindo a mensagem de erro ou sucesso baseado na condição ; 
        return retornoUser;
    }
    catch (error) {
        res.status(500).json({message: "Erro ao deletar categoria!"}); // Atribuindo a mensagem de erro ; 
    }
}

const putCategory = async (req, res) => { // Função responsável por atualizar uma categoria no banco de dados ; 
    try {
        const {id} = req.params; // Recuperando o ID da categoria e atribuindo a variável ; 
        let {nome} = req.body; // Recuperando o novo nome e atribuindo a variável ; 

        if(!id || !mongoose.Types.ObjectId.isValid(id)) {return res.status(400).json({message: "Erro ao atualizar categoria! O ID informado é inválido!"})}; // Caso o ID seja inválido, atribuindo a mensagem de erro ; 
        if(!nome) {return res.status(400).json({message: "Erro ao atualizar categoria! O nome não pode ser nulo"})}; // Caso o nome seja nulo ou undefined, retornando a mensagem de erro ; 
    
        nome = nome?.trim().toLowerCase(); // Eliminando espaços em brancos e trasformando tudo em minúsculas ; 

        const categoriaExistente = await Categoria.findOne({nome}); // Verificando se existe no banco de dados uma categoria já existente com o nome informado pelo usuário ; 
        if(categoriaExistente) {return res.status(400).json({message: "Erro ao atualizar categoria! Já existe uma categoria com o nome informado!"})}; // Caso exista a categoria, atribuir a mensagem de erro ;  
    
        const categoriaAtualizada = await Categoria.findByIdAndUpdate(id, {nome, slug: slugify(nome)}); // Atualizando a categoria no banco de dados ; 
        const retornoUser = categoriaAtualizada ? res.status(200).json({message: "Categoria atualizada com sucesso!"}) : res.status(400).json({message: "Erro ao atualizar categoria no banco de dados! Não foi possível encontrar nenhuma categoria com o ID informado"}); // Atribuindo a mensagem de erro ou sucesso baseada na condição ; 
        return retornoUser;
    }
    catch (error) {
        res.status(500).json({message: "Erro ao atualizar categoria!"}); // Atribuindo a mensagem de erro ; 
    }
}

module.exports = {getCategories, addCategory, deleteCategory, putCategory} ; // Exportando as funções para serem utilizadas pelo router ; 