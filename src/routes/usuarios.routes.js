import { Router } from "express";
import validacionUsuario from "../helpers/validacionUsuario.js";
import { crearUsuario, listarUsuarios, login } from "../controllers/usuarios.controllers.js";


const usuarioRouter = Router();
usuarioRouter
  .route("/")
  .post([validacionUsuario], crearUsuario)
  .get(listarUsuarios);
usuarioRouter
  .route("/login")
  .post(login)

export default usuarioRouter;
