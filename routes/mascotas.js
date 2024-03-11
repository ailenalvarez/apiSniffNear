const express = require('express');
const router = express.Router();
const verificarToken = require('../middleware/verificarToken');
const petController = require('../controllers/petController');
//Crear mascota
 router.use(verificarToken);

router.post('/registro',verificarToken, petController.crearMascota);
router.put('/:id',verificarToken,petController.modificarMascota);
router.delete('/:id',verificarToken ,petController.eliminarMascota);
router.get('/:id',verificarToken,petController.obtenerMascota);
router.get('/',verificarToken,petController.listaMascotas);

module.exports = router;