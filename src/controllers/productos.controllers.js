import Producto from "../database/model/producto.js";

export const leerPrueba = (req, res) => {
  res.send("Desde el backend del proyecto crudCafe");

};

export const crearProducto = async(req, res) => {
 try {
    //validar los datos para crear el producto
    //perdir al modelo Producto que genere uno nuevo
    const productoNuevo = new Producto(req.body);
    //guardo en la BD
    await productoNuevo.save();
    //envio una respuesta al front
    res.status(201).json({
        mensaje: "El producto fue creado correctamente"
    })
 } catch (error) {
    //envio una respuesta al front algo fallo
    console.error(error);
    res.status(500).json({
        mensaje:"Ocurrio un error, no se pudo crear el producto"
    })
 }
};

