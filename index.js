const express = require('express');

const app = express();
const port = 3000;

app.get('/', (req,res)=>{
  res.send('Hola  Mundo!');
});

app.get('/nueva1', (req,res)=>{
  res.send('SOY LA RUTA NUMERO 1');
});

app.get('/nueva2', (req,res)=>{
  res.json({
    nombre:'David',
    edad: 23,
    empleo: 'dev'
  });
});


app.listen(port, ()=>{
  console.log('mi port' + port);
});
