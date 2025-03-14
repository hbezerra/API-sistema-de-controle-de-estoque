const express = require("express"); // Importando a biblioteca "Express" ; 
const router = express.Router(); // Atribuindo a variável "router" uma instância de "Express Router" ; 
const categoriaController = require("../controller/CategoriaController"); // Importando o controller de categorias ; 
const WithAuth = require("../middleware/auth"); // Importando o moddleware; 

router.get("/categories", WithAuth, categoriaController.getCategories); // Rota do tipo GET ; 
router.post("/categories", WithAuth, categoriaController.addCategory); // Rota do tipo POST ; 
router.delete("/categories/:id", WithAuth, categoriaController.deleteCategory); // Rota do tipo DELETE ; 
router.put("/categories/:id", WithAuth, categoriaController.putCategory); // Rota do tipo PUT ; 

module.exports = router; // Exportando o router para ser utilizado no index ; 