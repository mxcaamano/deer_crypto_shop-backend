const express = require('express');
const { Router } = express;
const Contenedor = require("./contenedor");
const contenedor = new Contenedor('./productos.txt');
const contenedorCarritos = new Contenedor('./carritos.txt');
const app = express();
const routerProductos = Router();
const routerCarritos = Router();

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, ()=>{
    console.log(`Escuchando en el puerto ${server.address().port}`)
})

app.set('view engine', 'ejs')
app.set('views', './views')

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api/productos', routerProductos);
app.use('/api/carritos', routerCarritos);

// Variable de Permisos de Administrador
const isAdmin = true

// Endpoints routerProductos
routerProductos.get('/', async(req, res) => {
    const productos = await contenedor.getAll();
    productos 
    ? res.json(productos)
    : res.status(400).json({ error: 'No se encuentran productos' });
    // Lineas para implementar con el render
    // let state = null
    // productos ? state = true : state = false
    // res.render('pages/index', {listExist: state, list: productos} );
})

// Endpoint para implementar con render
// routerProductos.get('/add', async(req, res) => {
//     res.render('pages/form');
// })

routerProductos.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const producto = await contenedor.getById(id)
    producto 
    ? res.json(producto) 
    : res.status(400).json({ error: 'No se encuentra el producto' });
    // Lineas para implementar con el render
    // producto 
    // ? res.render('pages/product', {producto: producto}) 
    // : res.status(400).json({ error: 'No se encuentra el producto' });
})

routerProductos.post('/', async (req, res) => {
    if(isAdmin){
        const producto = req.body;
        producto.title && producto.price && !isNaN(producto.price) && producto.description && producto.thumbnail && producto.code && producto.stock && !isNaN(producto.stock)
        ? (producto.price = parseFloat(producto.price), res.json(await contenedor.save(producto)))
        : res.status(400).json({ error: 'Se requiere titulo, precio(debe ser numero), descripción, url de imagen, codigo y stock(debe ser numero)' });
    }
    else{
        res.status(403).json({ error: 'No posee privilegios para realizar esta operación' });
    }
})

routerProductos.put('/:id', async (req, res) => {
    if(isAdmin){
    const { id } = req.params
    const { title, price, description, thumbnail, code, stock  } = req.body
    title && price && !isNaN(price) && description && thumbnail && code && stock && !isNaN(stock)
    ? res.json(await contenedor.updateById({title, price, description, thumbnail, code, stock, id: parseInt(id), timestamp: Date.now()}))
    : res.status(400).json({ error: 'Se requiere titulo, precio(debe ser numero), descripción, url de imagen, codigo y stock(debe ser numero)' });
    }
    else{
        res.status(403).json({ error: 'No posee privilegios para realizar esta operación' });
    }
})

routerProductos.delete('/:id', async(req, res) => {
    if(isAdmin){
    const id = parseInt(req.params.id)
    await contenedor.getById(id)
    ? (await contenedor.deleteById(id),
    res.status(200).json({ message: 'Producto eliminado' }))     
    : res.status(400).json({ message: 'El producto no existe' })
    }
    else{
        res.status(403).json({ error: 'No posee privilegios para realizar esta operación' });
    }
})

// Endpoints routerCarrito

routerCarritos.post('/', async (req, res) => {
    const carrito = {productos: []}
    res.status(200).json({ message: 'Carrito creado' })
    res.json(await contenedorCarritos.save(carrito))
})

routerCarritos.delete('/:id', async(req, res) => {
    const id = parseInt(req.params.id)
    await contenedorCarritos.getById(id)
    ? (await contenedorCarritos.deleteById(id), 
    res.status(200).json({ message: 'Carrito eliminado' }))
    : res.status(400).json({ message: 'El carrito no existe' })
})

routerCarritos.get('/:id/productos', async (req, res) => {
    const id = parseInt(req.params.id)
    const carrito = await contenedorCarritos.getById(id)
    res.json(carrito.productos)
})

routerCarritos.post('/:id/productos', async (req, res) => {
    const id = parseInt(req.params.id)
    const { id_prod } = req.body
    const carrito = await contenedorCarritos.getById(id)
    const producto = await contenedor.getById(id_prod)
    producto 
    ? (producto.id = carrito.productos.length + 1, 
    carrito.productos.push(producto),
    res.status(200).json({ message: 'Producto añadido al carrito' }),
    res.json(await contenedorCarritos.updateById({timestamp: carrito.timestamp, productos: carrito.productos, id: parseInt(id)})))
    : res.status(400).json({ message: 'El producto no existe' }) 
})

routerCarritos.delete('/:id/productos/:id_prod', async (req, res) => {
    const id = parseInt(req.params.id)
    const id_prod = parseInt(req.params.id_prod)
    const carrito = await contenedorCarritos.getById(id)
    const producto = carrito.productos.find(p => p.id == id_prod)
    if(producto){
    const productosArr = carrito.productos.filter(p => p !== producto)
    res.status(200).json({ message: 'Producto eliminado del carrito' })
    res.json(await contenedorCarritos.updateById({timestamp: carrito.timestamp, productos: productosArr, id: parseInt(id)}))
    }
    else{
        res.status(400).json({ message: 'El producto seleccionado no existe en el carrito' })
    }
})

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
