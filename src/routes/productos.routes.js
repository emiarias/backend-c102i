import { Router } from "express";
import {
    borrarProducto,
  crearProducto,
  editarProducto,
  leerPrueba,
  listarProductos,
  obtenerProducto,
} from "../controllers/productos.controllers.js";
import { check } from "express-validator";
// app.get('/prueba', (req, res)=>{
//     // console.log('desde la funcion de prueba')
//     res.send('Desde el backend del proyecto crudCafe')
// })
const router = Router();
router.route("/prueba").get(leerPrueba);
router.route("/productos").post([
  check("nombreProducto").notEmpty()
],crearProducto).get(listarProductos);
router.route("/productos/:id").get(obtenerProducto).delete(borrarProducto).put(editarProducto);
export default router;
