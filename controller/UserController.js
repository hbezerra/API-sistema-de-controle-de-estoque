const mongoose = require("mongoose"); // Importando a biblioteca "mongoose"; 
const User = require("../Model/User"); // Importando o model de usuário ; 
const jwt = require("jsonwebtoken"); // Importando o JsonWebToken ; 

require('dotenv').config();
const secret = process.env.JWT_SECRET; 

const register = async (req, res) => { // Função responsável por registrar um usuário no banco de dados ; 
    try {
        const {name, email, password} = req.body; // Recuperando os valores e atribuindo as variáveis ; 

        if(!name || !email || !password) { // Caso os dados informados pelo usuário sejam inválidos ; 
            return res.status(400).json({message: "Erro ao adicionar usuário no banco de dados! Verifique os campos e tente novamente"}); // Atribuindo a mensagem de erro ; 
        }

        email = email.trim().toLowerCase(); // Remove espaços extras e converte para mínusculas ; 

        const userExistente = await User.findOne({email}); // Selecionando um usuário no banco de dados com o e-mail informado pelo usuário ; 
        if(userExistente) { // Caso o usuário exista ; 
            return res.status(400).json({message: "Erro ao adicionar usuário! Já existe um usuário cadastrado com o e-mail informado"}); // Atribuindo a mensagem de erro ; 
        }

        const user = new User({name, email, password}); // Criando o novo usuário ; 
        
        const newUser = await user.save(); 
        const retornoUser = newUser ? res.status(200).json(user) : res.status(400).json({message: "Erro ao salvar usuário no banco de dados!"}); // Atribuindo a mensagem de sucesso ou erro ; 
        return retornoUser;
    }   
    catch (error) {
        console.log(error)
        res.status(500).json({message: "Erro ao registrar usuário no banco de dados"}); // Atribuindo a mensagem de erro ; 
    }
}

const login = async (req, res) => { // Função responsável pelo login do usuário ; 
    try {
        const {email, password} = req.body; // Recuperando o email e senha do usuário e atribuindo as variáveis ; 
        
        email = email.trim().toLowerCase(); // Remove espaços extras e converte para mínusculas ; 

        let userExistente = await User.findOne({email}); // Verificando se existe um usuário com o email informado ; 
        if(!userExistente) return res.status(401).json({error: "Email ou senha incorretos"}); // Atribuindo a mensagem de erro ; 

        userExistente.isCorrectPassword(password, (err, same) => {
            if(!same) return res.status(401).json({error: "Email ou senha incorretos"}); // Atribuindo a mensagem de erro ; 
            // Gerando o token JWT ; 
            const token = jwt.sign({email}, secret , {expiresIn: "30d"});
            res.json({userExistente, token});
        } )
    }
    catch(error) {
        res.status(500).json({message: "Erro ao fazer o login do usuário!"}); // Atribuindo a mensagem de erro ; 
    }
}

module.exports = {register, login}; // Exportando as funções para serem utilizadas no router ; 