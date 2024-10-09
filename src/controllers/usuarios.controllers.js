import Usuario from "../database/model/usuario.js";
import bcrypt from 'bcrypt'

export const crearUsuario = async (req, res) => {
    try {
        const {email, password} = req.body;
        //encriptar el password
        //crear los saltos
        const saltos = bcrypt.genSaltSync(10);
        const passwordHasheado = bcrypt.hashSync(password,saltos)
        //creo el usuario en la BD
        const usuarioNuevo = new Usuario({email, password: passwordHasheado})
        await usuarioNuevo.save()
        res.status(201).json({
            mensaje:"El usuario fue creado correctamente"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            mensaje:"Ocurrio un error, no se pudo crear el usuario"
        })
    }
}
export const listarUsuarios = async (req, res) => {
    try {
        const arrayUsuarios = await Usuario.find()
        res.status(200).json(arrayUsuarios)
    } catch (error) {
        res.status(404).json({
            mensaje:"Ocurrio un error, no se encontraron los usuarios"
        })
    }
}
export const obtenerUsuario = async (req,res) => {
    try {
        const usuarioBuscado = await Usuario.findById(req.params.id)
        if (!usuarioBuscado) {
            return res.status(404).json({
                mensaje:"El usuario no fue encontrado"
            })
        }
        res.status(200).json(usuarioBuscado)
    } catch (error) {
        res.status(500).json({
            mensaje:"Ocurrio un error, no se pudo obtener el usuario"
        })
    }
}
export const borrarUsuario = async (req,res) => {
    try {
        const usuarioBuscado = await Usuario.findById(req.params.id)
        if (!usuarioBuscado) {
            return res.status(404).json({
                mensaje:"El usuario no fue encontrado"
            })
        }
        await Usuario.findByIdAndDelete(req.params.id)
        res.status(200).json({
            mensaje:"El usuario fue borrado"
        })
    } catch (error) {
        res.status(500).json({
            mensaje:"Ocurrio un error al intentar borrar un usuario"
        })
    }
}
export const editarUsuario = async (req,res) => {
    try {
        const usuarioBuscado = await Usuario.findById(req.params.id)
        if (!usuarioBuscado) {
            return res.status(404).json({
                mensaje:"El usuario no fue encontrado"
            })
        }
        await Usuario.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).json({
            mensaje:"El usuario fue editado correctamente"
        })
    } catch (error) {
        res.status(500).json({
            mensaje:"Ocurrio un error al intentar editar un usuario"
        })
    }
}