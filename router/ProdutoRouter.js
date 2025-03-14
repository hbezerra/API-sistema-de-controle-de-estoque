const express = require("express"); // Importando a biblioteca "Express" ; 
const router = express.Router(); // Atribuindo a variável "router" uma instância de "Express Router" ; 
const produtoController = require("../controller/ProdutoController"); // Importando o controller de produtos ; 
const WithAuth = require("../middleware/auth"); // Importando o moddleware; 

router.get("/products", WithAuth, produtoController.getProducts); // Rota do tipo GET ; 
router.post("/products", WithAuth, produtoController.addProduct); // Rota do tipo POST ; 
router.delete("/products/:id", WithAuth, produtoController.deleteProduct); // Rota do tipo DELETE ; 
router.put("/products/:id", WithAuth, produtoController.putProduct); // Rota do tipo PUT ; 
router.put("/products/increment/:id", WithAuth, produtoController.incrementProduct); // Rota do tipo PUT ; 
router.put("/products/decrement/:id", WithAuth, produtoController.decrementProduct); // Rota do tipo PUT ; 


module.exports = router; // Exportando o router para ser utilizado no index ; 