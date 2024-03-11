const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const verificarToken = require('../middleware/verificarToken');

// Ruta para crear un comentario
router.post('/:alertId/crear', verificarToken, commentController.crearComentario);

// Ruta para modificar un comentario
router.put('/:id', verificarToken, commentController.actualizarComentario);

// Ruta para eliminar un comentario
router.delete('/:id', verificarToken, commentController.eliminarComentario);

// Ruta para listar comentarios relacionados con una alerta
router.get('/:alertId/listar', commentController.getComentarioDeAlerta);

module.exports = router;
