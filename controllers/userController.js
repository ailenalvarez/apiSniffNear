
const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require ('jsonwebtoken');
require('dotenv').config();
const secretKey = process.env.SECRET_KEY;
const salt = 10;
exports.authUser= async(req , res)=>{
    const {email, password}= req.body;
    //verifico que el usuario exista
    
    const usuario = await userModel.findOne({email});
    if(!usuario){
        res.status(400).json({msg:'El usuario no existe'})
    }

    
    const passwordValido = await bcrypt.compare( password, usuario.password );
    if (!passwordValido){
        res.status(400).json({msg:'Password invalido'})
    }

    const token = jwt.sign({ usuario: usuario._id }, secretKey, { expiresIn: '1h' });
    res.status(201).json({
        msg:'Autenticacion ok',
        token
    })
}
exports.crear = async( req, res ) => {
    try {
       
        const {name, email, password} = req.body
        const passHash = await bcrypt.hash(password ,salt);
        //Verifico si el usuario ya existe
        const existeUser = await userModel.findOne({ email });
        if (existeUser) {
        return res.status(400).json({ msg: 'El correo ya está registrado' });
        }
        
        const newUser = new userModel({
            name,
            email,
            password: passHash 
          });
      
          // Guarda el usuario en la base de datos
          await newUser.save();
        
          res.status(201).json({ message: 'Usuario registrado exitosamente' });
        } catch (error) {
          console.error('Error al registrar usuario:', error);
          res.status(500).json({ message: 'Error interno del servidor' });
        }
};

exports.actualizar = async (req, res)=>{
    try{
        //QUE ES LO QUE PUEDE ACTUALIZAR EL USUARIO?
        const {name, email, password} = req.body;
        //Tengo que saber cual es el usuario que voy a actualizar
        const userId = req.params.id;
       
        if(!name && !email & !password){
            res.status(400).json({msg:'Nada que actualizar'})
        }

        //Busco al usuario por id

        const usuario = await userModel.findById(userId);

        if(!usuario){
            res.status(400).json({msg:'El usuario no existe'})
        }

        //Actualizo los campos que se pasen
        if(name){
            usuario.name = name;
        }
        if(email){
            usuario.email = email;
        }

        if(password){
            usuario.password = password;
        }

        //Guardo los cambios

        await usuario.save();

        res.json({msg:'Usuario actualizado ok'})

    }catch(error) {
        console.error(error)
        res.status(500).json({msg: "Error en el servidor"})
    }
}

exports.eliminar = async (req, res) => {
    try {
      const userId = req.params.id;
  
      // Verifica si el usuario existe
      const usuario = await userModel.findById(userId);
      if (!usuario) {
        return res.status(404).json({ msg: 'El usuario no existe' });
      }
  
      // Elimina el usuario
      await userModel.findByIdAndRemove(userId);
  
      res.json({ msg: 'Usuario eliminado correctamente' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Error en el servidor' });
    }
  };

exports.listar = async (req, res) => {
    try {
      const usuarios = await userModel.find();
      res.json(usuarios);
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Error en el servidor' });
    }
  };

exports.obtenerUsuario = async (req, res) => {
    try {
      const userId = req.params.id;
      const usuario = await userModel.findById(userId);
  
      if (!usuario) {
        return res.status(404).json({ msg: 'El usuario no existe' });
      }
  
      res.json(usuario);
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Error en el servidor' });
    }
  };
  
  
