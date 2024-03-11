
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verificarToken = require('../middleware/verificarToken');

// registrar un nuevo usuario
router.post('/registro', userController.crear);

//Token usuario
router.post('/auth',userController.authUser);

//Actualizar usuario
router.put('/:id',userController.actualizar);

//Eliminar usuario
router.delete('/:id',userController.eliminar);

// Ruta para listar todos los usuarios
router.get('/', userController.listar);

// Ruta para obtener un usuario por su ID

router.get('/:id', userController.obtenerUsuario);


module.exports = router;



