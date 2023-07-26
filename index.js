const express = require("express");
const routerApi = require('./routers');
const { logErrors, errorHanlder, boomError, checkEmptyJSON }=require('./middlewares/error.handler')

const app = express();

const PORT = 3001;

//Middleware que se utiliza para analizar el cuerpo de las solicitudes entrantes en formato JSON
app.use(express.json());

//Llama las rutas para hacer las peticiones
routerApi(app);

//Importacion de Middlewares para captar errores
app.use(logErrors)
app.use(boomError)
app.use(errorHanlder)

// Middleware personalizado para manejar el JSON vacío, solo aplicarlo a las rutas POST y PATCH
app.use('/api/v1/products', checkEmptyJSON);
app.use('/api/v1/users', checkEmptyJSON);
app.use('/api/v1/categories', checkEmptyJSON);
app.use('/api/v1/people', checkEmptyJSON);

//Puerto que usamos he imprimimos
app.listen(PORT, () => {
    console.log('Funciona en el puerto: ' + PORT);
})
