const Comment = require('../models/commentModel');

// crear un comentario
exports.crearComentario = async (req, res) => {
    try {
        const { content } = req.body;
        const userId = req.usuario; // ID del usuario autenticado
        const alertId = req.params.alertId; // ID de la alerta relacionada
        if(!content){
            return res.status(400).json({msg: 'Debe ingresar el contenido'});
        }
        const comentario = new Comment({
            content,
            user: userId,
            alert: alertId
        });

        await comentario.save();

        res.status(201).json({
            msg: 'Comentario creado exitosamente',
            data: comentario
        });
    } catch (error) {
        console.error('Error al crear comentario:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// modificar un comentario
exports.actualizarComentario = async (req, res) => {
    try {
        const { content } = req.body;
        const commentId = req.params.id; // ID del comentario a modificar

        const comentario = await Comment.findById(commentId);

        if (!comentario){
            return res.status(404).json({ msg: 'Comentario no encontrado' });
        }

        //  si el usuario autenticado es el creador del comentario
        if (comentario.user.toString() !== req.usuario) {
            return res.status(403).json({ msg: 'No tienes permiso para modificar este comentario' });
        }

       comentario.content = content;
        await comentario.save();

        res.json({ msg: 'Comentario modificado exitosamente', data: comentario });
    } catch (error) {
        console.error('Error al modificar comentario:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

//  eliminar un comentario
exports.eliminarComentario = async (req, res) => {
    try {
        const commentId = req.params.id; // ID del comentario a eliminar

        const comentario = await Comment.findById(commentId);

        if (! comentario) {
            return res.status(404).json({ msg: 'Comentario no encontrado' });
        }

        //  usuario autenticado es el creador del comentario
        if ( comentario.user.toString() !== req.usuario) {
            return res.status(403).json({ msg: 'No tienes permiso para eliminar este comentario' });
        }

        await Comment.findByIdAndRemove(commentId);

        res.json({ msg: 'Comentario eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar comentario:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

//  listar comentarios relacionados con una alerta
exports.getComentarioDeAlerta = async (req, res) => {
    try {
        const alertId = req.params.alertId; // ID de la alerta

        const  comentario = await Comment.find({ alert: alertId }).populate('user', 'name'); 

        res.json( comentario);
    } catch (error) {
        console.error('Error al obtener comentarios:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};
