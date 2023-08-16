const express = require("express");
const dotenv = require('dotenv');
const routerApi = require('./routers');
const { logErrors, errorHanlder, boomError }=require('./middlewares/error.handler')

dotenv.config();
const app = express();

// Parsear el valor de la variable de entorno MY_CONFIG
const config = JSON.parse(process.env.MY_CONFIG);
const PORT = config.port || 3000;
const hostname = config.hostname || 'localhost';

//Middleware que se utiliza para analizar el cuerpo de las solicitudes entrantes en formato JSON
app.use(express.json());

//Llama las rutas para hacer las peticiones
routerApi(app);

//Importacion de Middlewares para captar errores
app.use(logErrors)
app.use(boomError)
app.use(errorHanlder)

//Puerto que usamos he imprimimos
app.listen(PORT,hostname, () => {
    console.log(`Servidor escuchando en http://${hostname}:${PORT}`);
})
