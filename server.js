const express = require('express');
const app = express();
const { Server: IOServer } = require('socket.io');
require('dotenv').config();
const config = require('./config');
const cluster = require('cluster');
const compression = require('compression')
const logger = require('./src/utils/logger')
const MongoStore =  require('connect-mongo')

// Sesiones, cookies y Passport
const passport = require('passport');
require('./src/utils/passport.config');
const cookieParser = require('cookie-parser');
app.use(cookieParser(config.SECRET))
const session = require('express-session');

//Sesion
app.use(
    session({
      secret: config.SECRET,
      resave: true,
      saveUninitialized: true,
      store: MongoStore.create({ mongoUrl: process.env.DBURL, mongoOptions: {useNewUrlParser: true, useUnifiedTopology: true} }),
      cookie: {
        maxAge: 6000000,
      },
    })
  );

//Compression con gzip
app.use(compression())

//Server
let server
const PORT = process.env.PORT || config.PORT;
const MODE = process.env.MODE || config.MODE;
const { CPUqty } = require('./src/routes/info.router');

if(MODE === 'cluster' && cluster.isPrimary){
    logger.info(PORT, MODE);
    logger.info(`Master ${process.pid} is running`);
    for (let i = 0; i < CPUqty ; i++) {
      cluster.fork();
    }
    cluster.on('exit', (worker, code, signal) => {
      logger.info(`Worker ${worker.process.pid} died`);
    });
  }   
else {
    server = app.listen(PORT, () =>{
    logger.info(`Port: ${PORT}, Mode: ${MODE}`)
    MODE === 'cluster' && logger.info(`Worker ${process.pid} started`)
    })
  }


//App

app.set('view engine', 'ejs')
app.set('views', './views')

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(passport.initialize())
app.use(passport.session())

//Rutas
const routes = require('./src/routes/index.router');
const methodOverride = require("method-override");
app.use(methodOverride('_method'));
app.use(routes);

//WebSockets
const io = new IOServer(server)
const socketMsgs = require('./src/controllers/socketMsgs.controller');
io.on('connection', socketMsgs);