const express = require("express");
const routerApi = require('./routes');

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Hello crayola');
});

app.get('/route-new', (req, res) => {
    res.send('Hola soy una nueva ruta o endpoint');
});

routerApi(app);

app.listen(PORT, () => {
    console.log('Funciona en el puerto: ' + PORT);
})
