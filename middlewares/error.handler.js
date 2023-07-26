const Boom = require('@hapi/boom');

// Middleware para registrar errores en la consola
function logErrors(err, req, res, next) {
  console.log(err);
  next(err);
};

// Middleware para manejar errores Boom y enviar una respuesta JSON con el código de estado y cuerpo proporcionados por Boom
function boomError(err, req, res, next) {
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

// Middleware para manejar el JSON vacío
function checkEmptyJSON(req, res, next) {
  if (Object.keys(req.body).length === 0) {
    throw Boom.badRequest('El JSON enviado está vacío');
  }
  next();
}

module.exports = { logErrors, errorHanlder, boomError, checkEmptyJSON };
