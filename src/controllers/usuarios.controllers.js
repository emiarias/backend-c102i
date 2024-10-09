import Usuario from "../database/model/usuario.js";


export const crearUsuario = async (req, res) => {
    try {
        const usuarioNuevo = new Usuario(req.body)
        //encriptar el password
        
        await usuarioNuevo.save()
        res.status(201).json({
            mensaje:"El usuario fue creado correctamente"
        })
    } catch (error) {
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