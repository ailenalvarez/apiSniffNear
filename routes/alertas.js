const express = require('express');
const router = express.Router();
const alertController = require('../controllers/alertController');
const verificarToken = require('../middleware/verificarToken');
router.use(verificarToken);
// Crear una nueva alerta
router.post('/crear', verificarToken, alertController.crearAlerta);

// Modificar una alerta por su ID
router.put('/:id', verificarToken, alertController.modificarAlerta);

// Eliminar una alerta por su ID
router.delete('/:id', verificarToken, alertController.eliminarAlerta);

// Listar todas las alertas
router.get('/', verificarToken, alertController.listarAlertas);

// Listar una alerta por su ID
router.get('/:id', verificarToken, alertController.obtenerAlertaPorId);

module.exports = router;
