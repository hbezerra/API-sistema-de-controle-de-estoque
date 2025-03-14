# 📦 Sistema de Controle de Estoque

Este repositório contém a implementação do back-end de um sistema de controle de estoque, desenvolvido com **Node.js**, **Express** e **MongoDB**. O sistema gerencia produtos e categorias, permitindo operações de **CRUD** (criação, leitura, atualização e exclusão) e o ajuste de quantidades dos produtos (incremento e decremento).

---

## 📂 Entidades

- **📦 Produtos**: Cada produto possui informações como **nome, descrição, preço, quantidade** e uma referência à categoria correspondente.  
- **📁 Categorias**: Cada categoria possui um **nome** e armazena uma lista de produtos associados.  

---

## 🚀 Tecnologias Utilizadas

- 🟢 **Node.js** – Ambiente de execução JavaScript para o back-end  
- ⚡ **Express** – Framework para criação de APIs RESTful  
- 🗄️ **MongoDB + Mongoose** – Banco de dados NoSQL e ODM para gerenciamento dos dados  
- 🔐 **JSON Web Token (JWT)** – (Se aplicável) para autenticação e segurança das rotas  
- 🛠 **Outras Dependências** – Outras bibliotecas utilizadas no projeto (ex.: **cors, dotenv**, etc.)  

---

## 🛠 Funcionalidades Implementadas

✅ **CRUD de produtos**: criação, listagem, atualização e remoção de produtos  
✅ **CRUD de categorias**: gerenciamento das categorias e associação com produtos  
✅ **Incremento e decremento da quantidade de produtos no estoque**  
✅ **Associação entre produtos e categorias** (ao criar, atualizar ou remover um produto, a referência na categoria é atualizada automaticamente)  
🔒 **(Opcional)** Autenticação e autorização para rotas protegidas, se necessário  

---

<h3>⚙️ Instalação e Execução</h3>
<pre>
# Clone o repositório
git clone https://github.com/hbezerra/API-sistema-de-controle-de-estoque

# Acesse o diretório do projeto
cd API-Sistema-de-controle-de-estoque

# Instale as dependências
npm install

# Execute o servidor
node index.js
</pre>

<h3>📬 Contato</h3>
<ul>
    <li>Email: <a href="mailto:hbezerradev@gmail.com">hbezerradev@gmail.com</a></li>
</ul>

