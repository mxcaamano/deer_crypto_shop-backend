const express = require('express');
const app = express();
// const { Router } = express
// const Products = require('./models/products.model.js')
// const router = Router();
const routerProducts = require('./src/routes/products.route');
const routerCarts = require('./src/routes/carts.route');

const connectDB = require('./src/db/mongoDB/connection');

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, ()=>{
    console.log(`Escuchando en el puerto ${server.address().port}`)
})

connectDB()

// app.set('view engine', 'ejs')
// app.set('views', './views')

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api/productos', routerProducts);
app.use('/api/carritos', routerCarts);

// router.get('/', async (req, res) => {
//   let producto = new Products({
    // title: "Placa de video AMD ASRock Challenger Radeon RX 6700 Series RX 6700 XT RX6700XT CLD 12GO OC Edition 12GB",
    // price: 482,
    // description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis corporis inventore maxime tempore ipsum magnam, asperiores molestias sed quisquam laboriosam nobis pariatur, placeat consequatur labore reprehenderit fugiat voluptates autem sunt.",
    // thumbnail: "https://http2.mlstatic.com/D_NQ_NP_2X_925228-MLA49727654203_042022-F.webp",
    // code: "34820172",
    // stock: 25,
    // timestamp: 1661391123830
//   })
//   await producto.save()
//   res.send('Hello World')
// })

// app.use('/api/prueba', router)

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
