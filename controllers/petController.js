const petModel = require("../models/petModel");

exports.crearMascota = async(req, res)=>{
    try{
      const{name, raza, age, description} = req.body;
      if (!name || !raza) {
        return res.status(400).json({ msg: 'Los campos name y raza son obligatorios' });
      }
      if (typeof age !== 'number') {
        return res.status(400).json({ msg: 'El campo age debe ser un número' });
      }
      const userId = req.usuario;
      console.log(userId);

      const mascota = new petModel({
        name, 
        raza,
        age,
        description,
        owner: userId,
      });
      
      await mascota.save();

      res.status(201).json({
        msg:'Mascota creada exitosamente',
        data:mascota,
      })

    }catch(error){
        console.error('Error al registrar mascota:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}
exports.modificarMascota = async (req, res)=>{
  try{
  
      const {name, age, description } = req.body;
     
      const mascotaId = req.params.id;
      //los campos que vaya a actualizat
      if(!name && !age & !description){
          res.status(400).json({msg:'Nada que actualizar'})
      }

      //Busco al usuario por id

      const mascota = await petModel.findById(mascotaId);

      if(!mascota){
          res.status(400).json({msg:'la Mascota no existe'})
      }

      //Actualizo los campos que se pasen
      if(name){
          mascota.name = name;
      }
      if(age){
         mascota.age = age;
      }

      if(description){
          mascota.description= description;
      }

      //Guardo los cambios

      await mascota.save();

      res.json({msg:'Mascota actualizado ok'})

  }catch(error) {
      console.error(error)
      res.status(500).json({msg: "Error en el servidor"})
  }
}


exports.eliminarMascota = async (req, res) => {
  try {
    const mascotaId = req.params.id;

    
    const mascota = await petModel.findById(mascotaId);
    if (!mascota) {
      return res.status(404).json({ msg: 'La mascota no existe' });
    }

    // Elimina el usuario
    await petModel.findByIdAndRemove(mascotaId);

    res.json({ msg: 'Mascota eliminada correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error en el servidor' });
  }
};

exports.listaMascotas = async (req, res) => {
  try {
    const mascota = await petModel.find();
    res.json(mascota);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error en el servidor' });
  }
};

exports.obtenerMascota = async (req, res) => {
  try {
    const mascotaId = req.params.id;
    const mascota = await petModel.findById(mascotaId);

    if (!mascota) {
      return res.status(404).json({ msg: 'La mascota no existe' });
    }

    res.json(mascota);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error en el servidor' });
  }
};