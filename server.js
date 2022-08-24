const express = require('express');
const { Router } = express;
const Contenedor = require("./contenedor");
const contenedor = new Contenedor('./productos.txt');
const contenedorCarritos = new Contenedor('./carritos.txt');
const formatDate = require("./formatDate");
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

// Endpoints routerProductos
routerProductos.get('/', async(req, res) => {
    const productos = await contenedor.getAll();
    let state = null
    productos ? state = true : state = false
    res.render('pages/index', {listExist: state, list: productos} );
})

routerProductos.get('/add', async(req, res) => {
    res.render('pages/form');
})

routerProductos.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const producto = await contenedor.getById(id)
    producto 
    ? res.render('pages/product', {producto: producto}) 
    : res.status(400).json({ error: 'No se encuentra el producto' });
})

routerProductos.post('/', async (req, res) => {
    const producto = req.body;
    producto.title && producto.price && producto.thumbnail && !isNaN(producto.price)
    ? (producto.price = parseFloat(producto.price), res.json(await contenedor.save(producto)))
    : res.status(400).json({ error: 'Se requiere titulo, precio y url de imagen' });
})

routerProductos.put('/:id', async (req, res) => {
    const { id } = req.params
    const { title, price, thumbnail } = req.body
    title && price && thumbnail && !isNaN(price)
    ? res.json(await contenedor.updateById({title, price, thumbnail, id: parseInt(id)}))
    : res.status(400).json({ error: 'Se requiere titulo, precio y url de imagen' });
})

routerProductos.delete('/:id', async(req, res) => {
    await contenedor.deleteById(parseInt(req.params.id))
})

// Endpoints routerCarrito

routerCarritos.post('/', async (req, res) => {
    const carrito = {timestamp: Date.now(), productos: []}
    res.json(await contenedorCarritos.save(carrito))
})

routerCarritos.delete('/:id', async(req, res) => {
    await contenedorCarritos.deleteById(parseInt(req.params.id))
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
    producto.id = carrito.productos.length + 1
    carrito.productos.push(producto)
    res.json(await contenedorCarritos.updateById({timestamp: carrito.timestamp, productos: carrito.productos, id: parseInt(id)}))
})

routerCarritos.delete('/:id/productos/:id_prod', async (req, res) => {
    const id = parseInt(req.params.id)
    const id_prod = parseInt(req.params.id_prod)
    const carrito = await contenedorCarritos.getById(id)
    const productosArr = carrito.productos.filter(p => p.id !== id_prod)
    console.log(productosArr)
    res.json(await contenedorCarritos.updateById({timestamp: carrito.timestamp, productos: productosArr, id: parseInt(id)}))
})


