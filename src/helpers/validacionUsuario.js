import { check } from "express-validator";
import resultadoValidacion from "./resultadoValidacion.js";
const validacionUsuario = [
  check("email")
    .notEmpty()
    .withMessage("el email del usuario es un dato obligatorio")
    .matches(/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/)
    .withMessage("El email debe tener el formato de un correo valido nombre@mail.com")
    .isLength({
      min: 10,
      max: 100,
    })
    .withMessage("El mail debe contener como minimo 10 y como maximo 100"),
  check("password")
    .notEmpty()
    .withMessage("La contraseña es un dato obligatorio")
    .isLength({
      min: 8,
      max: 100,
    })
    .withMessage("La contraseña debe tener entre 8 y 100 caracteres")
    .matches(/^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/)
    .withMessage('La contraseña debe tener entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula, al menos una mayúscula y al menos un caracter no alfanumérico'),
    (req,res,next)=> resultadoValidacion(req,res,next)
];
export default validacionUsuario;
