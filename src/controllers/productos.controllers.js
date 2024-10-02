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

export const listarProductos = async(req, res)=>{
    try {
        //pedirle a la BD la collection de productos
        const productos = await Producto.find()
        //enviar en la respuesta la lista de productos
        res.status(200).json(productos);
    } catch (error) {
        //enviar un mensaje de error
        console.error(error);
        res.status(404).json({
            mensaje:"Ocurrio un error, no se encontraron los productos"
        })
    }
}
export const obtenerProducto = async(req, res)=>{
    try {
        //extraer de la solicitud el id
        console.log(req.params.id)
        //pedirle a la BD que busque ese producto que tiene tal id
        const productoBuscado = await Producto.findById(req.params.id);
        //agregar una respuesta adicional cuando productoBuscado es null ---
        if(!productoBuscado){
            return res.status(404).json({mensaje: 'El producto no fue encontrado'})
        }
        //enviar en la respuesta el producto
        console.log(productoBuscado)
        res.status(200).json(productoBuscado)
    } catch (error) {
        //enviar un mensaje de error
        console.error(error);
        res.status(500).json({
            mensaje:"Ocurrio un error, no se pudo obtener el producto"
        })
    }
}