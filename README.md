# DeerCrypto Shop

_Hola!_ 👋😄

_Este repositorio consiste en la realizacion de un proyecto final para el [Curso de Programación Backend](https://www.coderhouse.com/online/programacion-backend)
correspondiente a la [Carrera de Desarrollo FullStack](https://www.coderhouse.com/online/carrera-online-desarrollo-fullstack) de Coderhouse_

_En este caso tuve como objetivo desarrollar el Backend de un e-commerce utilizando un servidor con expressJs_

## Construido con 🛠️

_Tecnologías utilizadas para crear el proyecto_

* [![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=plastic&logo=html5&logoColor=white)](https://developer.mozilla.org/es/docs/Web/HTML)
* [![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=plastic&logo=css3&logoColor=white)](https://developer.mozilla.org/es/docs/Web/CSS)
* [![Javascript](https://img.shields.io/badge/JavaScript-323330?style=plastic&logo=javascript&logoColor=F7DF1E)](https://developer.mozilla.org/es/docs/Web/JavaScript)
* [![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=plastic&logo=node.js&logoColor=white)](https://nodejs.org/)
  * Dependencias:
    * [![bcrypt](https://img.shields.io/badge/bcrypt-v5.1.0-43853D)](https://github.com/kelektiv/node.bcrypt.js)
    * [![connect-mongo](https://img.shields.io/badge/connect--mongo-v4.6.0-43853D)](https://github.com/jdesboeufs/connect-mongo)
    * [![dotenv](https://img.shields.io/badge/dotenv-v16.0.3-43853D)](https://github.com/motdotla/dotenv)
    * [![ejs](https://img.shields.io/badge/ejs-v3.1.8-43853D)](https://github.com/mde/ejs)
    * [![express](https://img.shields.io/badge/express-v4.18.1-43853D)](https://github.com/expressjs/express)
      * [![compression](https://img.shields.io/badge/compression-v1.7.4-43853D)](https://github.com/expressjs/compression)
      * [![express-session](https://img.shields.io/badge/express--session-v1.17.3-43853D)](https://github.com/expressjs/session)
      * [![multer](https://img.shields.io/badge/multer-v1.4.5--lts.1-43853D)](https://github.com/expressjs/multer)
      * [![method-override](https://img.shields.io/badge/method--override-v3.0.0-43853D)](https://github.com/expressjs/method-override)
      * [![cookie-parser](https://img.shields.io/badge/cookie--parser-v1.4.6-43853D)](https://github.com/expressjs/cookie-parser)
    * [![firebase-admin](https://img.shields.io/badge/firebase--admin-v11.0.1-43853D)](https://github.com/firebase/firebase-admin-node)
    * [![mongoose](https://img.shields.io/badge/mongoose-v6.6.0-43853D)](https://github.com/Automattic/mongoose)
    * [![mongoose-sequence](https://img.shields.io/badge/mongoose--sequence-v5.3.1-43853D)](https://github.com/ramiel/mongoose-sequence)
    * [![nodemailer](https://img.shields.io/badge/nodemailer-v6.8.0-43853D)](https://github.com/nodemailer/nodemailer)
    * [![passport](https://img.shields.io/badge/passport-v0.6.0-43853D)](https://github.com/jaredhanson/passport)
      * [![passport-local](https://img.shields.io/badge/passport--local-v1.0.0-43853D)](https://github.com/jaredhanson/passport-local)
    * [![sharp](https://img.shields.io/badge/sharp-v0.31.2-43853D)](https://github.com/lovell/sharp)
    * [![socket.io](https://img.shields.io/badge/socket.io-v4.5.1-43853D)](https://github.com/socketio/socket.io)
    * [![twilio](https://img.shields.io/badge/twilio-v3.83.1-43853D)](https://github.com/twilio/twilio-node)
    * [![uuid](https://img.shields.io/badge/uuid-v9.0.0-43853D)](https://github.com/uuidjs/uuid)
    * [![winston](https://img.shields.io/badge/winston-v3.8.2-43853D)](https://github.com/winstonjs/winston)    

## Comenzando 🚀

_El repositorio se puede_ [forkear](https://github.com/mxcaamano/deer_crypto_shop-backend/fork) _para copiarlo en tu repositorio de GitHub._

_También es posible descargar el archivo **.Zip**, descomprimirlo, tenerlo en tu computadora, modificarlo con el IDE que desees._

_Para probarlo sugiero que ingreses a **deercryptoshop-backend-production.up.railway.app**_


## Deployment 📦

_El deployment fue realizado en railways en el siguiente link:_

https://deercryptoshop-backend-production.up.railway.app

### Atención ⚠
_Para una mejor experiencia durante la utilización de la appWeb sugiero utilizar las siguientes credenciales al momento de Loguearse::_

|Email|Clave|
|----------|:-------------:|
|mcaamano@deercrypto.com|mp123456|

_Este usuario posee el campo isAdmin = true en la base de datos. Con lo cual puede acceder a cualquier ruta y método:_

### Rutas ↪
_El frontend de la API REST está preparado para recibir el body y los parametros en cada una de las siguientes rutas con sus respectivos metodos:_

| Ruta   |      Método      |  Descripción |
|:---------|:------------:|:------|
|/login|GET|Muestra el formulario de login|
|/login|POST|Envia la información de los campos email y clave, si son correctos redirecciona a /productos, de lo contrario una pantalla de error|
|/login/error|GET|Muestra el mensaje de error de login|
|/|GET|Redirecciona a /productos|
|/productos|GET|Muestra los productos disponibles para añadir al carrito, es accesible por todos los usuarios, registrados o no, con diferente vista|
|/productos/:id|GET|Muestra el detalle de un producto segun el id ingresado, es accesible por todos los usuarios, registrados o no, con diferente vista|
|/productos/categorias/:category|GET|Muestra los productos segun la categoria ingresada, es accesible por todos los usuarios, registrados o no, con diferente vista|
|/productos|POST|Añade un producto a la base de datos con sus respectivas propiedades, solo pueden hacerlo usuarios cuyo field isAdmin sea true|
|/productos/:id|PUT|Modifica un producto de la base de datos segun su id, solo pueden hacerlo usuarios cuyo field isAdmin sea true|
|/productos/:id|DELETE|Elimina un producto de la base de datos segun su id, solo pueden hacerlo usuarios cuyo field isAdmin sea true|
|/productos/|DELETE|Elimina todos los productos de la base de datos, solo pueden hacerlo usuarios cuyo field isAdmin sea true|
|/carrito|GET|Muestra el carrito correspondiente al usuario de la sesión actual, si no existe un carrito lo crea vacío sin productos|
|/carrito|DELETE|Elimina el carrito|
|/carrito|PUT|Añade el producto seleccionado al carrito, si no existe un carrito lo crea añadiendo los productos|
|/carrito|POST|Envia el contenido del carrito a traves de un Email, un SMS y un Mensaje de Whatsapp. Crea una orden.|
|/carrito/:id|DELETE|Elimina un producto del carrito según su id de carrito|

## Autor ✒️

* **Martin Xavier Caamaño** [![GitHub](https://img.shields.io/badge/GitHub-100000?style=plastic&logo=github&logoColor=white)](https://github.com/mxcaamano) [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=plastic&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/mart%C3%ADn-xavier-caama%C3%B1o-b60432224)

## Agradecimientos 🎁 🥳

A los profesores de [Coderhouse](https://www.linkedin.com/school/coderhouse/):
* **Federico Osandon** (Backend) [![GitLab](https://img.shields.io/badge/GitLab-330F63?style=plastic&logo=gitlab&logoColor=white)](https://gitlab.com/federico-osandon) [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=plastic&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/federico-osandon-programador/)
* **Nicolas Seguro** (Desarrollo Web) [![GitHub](https://img.shields.io/badge/GitHub-100000?style=plastic&logo=github&logoColor=white)](https://github.com/NicolasSeguro) [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=plastic&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/nicolas-seguro/)
* **Santiago Avila** (Javascript) [![GitHub](https://img.shields.io/badge/GitHub-100000?style=plastic&logo=github&logoColor=white)](https://github.com/santiagoaviladev) [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=plastic&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/santiagoavila/)
* **Alex Marin Mendez** (ReactJS) [![GitHub](https://img.shields.io/badge/GitHub-100000?style=plastic&logo=github&logoColor=white)](https://github.com/alexmarinmendez) [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=plastic&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/alexmarinmendez/)
