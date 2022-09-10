const express = require('express');
const app = express();
const routerProducts = require('./routes/products.route');
const routerCarts = require('./routes/carts.route');

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, ()=>{
    console.log(`Escuchando en el puerto ${server.address().port}`)
})

// app.set('view engine', 'ejs')
// app.set('views', './views')

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api/productos', routerProducts);
app.use('/api/carritos', routerCarts);

// Error para rutas no validas
app.use(function(req, res) {
          res.json({
            error: {
              'name':'error',
              'status':404,
              'message':'Invalid Request',
              'statusCode':404,
              'stack':'http://localhost:8080/'
            },
             message: 'La ruta no existe'
          });
    });
