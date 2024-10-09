import { Router } from "express";
import validacionUsuario from "../helpers/validacionUsuario.js";
import { crearUsuario, listarUsuarios } from "../controllers/usuarios.controllers.js";


const usuarioRouter = Router();
usuarioRouter
  .route("/")
  .post([validacionUsuario], crearUsuario)
  .get(listarUsuarios);

export default usuarioRouter;
