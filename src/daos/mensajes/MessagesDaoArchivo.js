const ContenedorArchivo = require('../../containers/ContenedorArchivo')

class MenssagesDaoArchivo extends ContenedorArchivo{
    constructor(){
        super('./src/db/messages.txt')
    }
}

module.exports = MenssagesDaoArchivo