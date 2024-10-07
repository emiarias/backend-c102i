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
router
  .route("/productos")
  .post(
    [
      check("nombreProducto")
        .notEmpty()
        .withMessage("El nombre del producto es un dato obligatorio")
        .isLength({
          min: 2,
          max: 50,
        })
        .withMessage(
          "El nombre del producto debe contener como minimo 2 caracteres y como maximo 50 caracteres inclusive"
        ),
      check("precio")
        .notEmpty()
        .withMessage("El precio es un dato obligatorio")
        .isNumeric()
        .withMessage("El precio debe ser un número")
        .custom((valor) => {
          if (valor >= 50 && valor <= 20000) {
            return true;
          } else {
            throw new Error(
              "El precio debe estar entre $50 y $20000 inclusive"
            );
          }
        }),
      check("imagen")
        .notEmpty()
        .withMessage("La imagen es un dato obligatorio")
        .matches(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|gif|png)/)
        .withMessage(
          "La imagen debe ser una URL valida y terminar en alguna de las siguientes extensiones (jpg|jpeg|gif|png)"
        ),
      check("categoria")
        .notEmpty()
        .withMessage("La categoria es un dato obligatorio")
        .isIn(["Infusiones", "Batidos", "Dulce", "Salado"])
        .withMessage(
          "La categoria debe contener una de las siguientes opciones: Infusiones, Batidos, Dulce, Salado"
        ),
      // agregar validaciones de descripcion breve y amplia
    ],
    crearProducto
  )
  .get(listarProductos);
router
  .route("/productos/:id")
  .get(obtenerProducto)
  .delete(borrarProducto)
  .put(editarProducto);
export default router;
