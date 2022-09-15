const { ContenedorFirebase } = require('../../containers/ContenedorFirebase')

class CarritosDaoFirebase extends ContenedorFirebase{
    constructor(){
        super('carts')
    }
}

module.exports = CarritosDaoFirebase