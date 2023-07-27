const Boom = require('@hapi/boom');

// Middleware para registrar errores en la consola
function logErrors(err, req, res, next) {
  console.log(err);
  next(err);
};

// Middleware para manejar errores Boom y enviar una respuesta JSON con el código de estado y cuerpo proporcionados por Boom
function oomError(err, req, res, next) {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  }else
    next(err);
};

// Middleware para manejar errores generales (no Boom) y enviar una respuesta JSON con información del error
function errorHanlder(err, req, res, next) {
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
};



module.exports = { logErrors, errorHanlder, boomError };
