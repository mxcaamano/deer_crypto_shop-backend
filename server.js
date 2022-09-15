const express = require('express');
const app = express();
const routerProducts = require('./src/routes/products.route');
const routerCarts = require('./src/routes/carts.route');

const connectMongo = require('./src/db/mongoDB/connection');
// const connectFire = require('./src/db/firebase/connection');

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, ()=>{
    console.log(`Escuchando en el puerto ${server.address().port}`)
})

connectMongo();
// connectFire();

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
