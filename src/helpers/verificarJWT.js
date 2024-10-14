import jwt from "jsonwebtoken";

const verificarJWT = (req, res, next) => {
  try {
    console.log(req.header);
    const token = req.header("x-token");
    //no me enviaron el token?
    if (!token) {
      return res
        .status(401)
        .json({ mensaje: "No hay un token en la peticion" });
    }
    //el token si viene en el req
    const payload = jwt.verify(token, process.env.SECRET_JWT)
    console.log(payload)
    //continuo con la siguiente ejecucion por crearProd, borrarProd, editarProd
    next();
  } catch (error) {
    console.error('Error al verificar el token');
    switch(error.name){
        case 'JsonWebTokenError':
            return res.status(401).json({mensaje: 'Token invalido'});
        case 'TokenExpiredError':
            return res.status(401).json({mensaje: 'el token expiro'});
        case 'UnauthorizedError':
            return res.status(403).json({mensaje: 'No tiene los permisos suficientes para acceder al recurso'});
        default:
            return res.status(500).json({mensaje: 'Error al verificar el token'});
    }
  }
};

export default verificarJWT