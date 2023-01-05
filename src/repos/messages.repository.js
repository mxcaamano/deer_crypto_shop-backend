const MessagesDto = require('../dtos/messages.dto')

class MessagesRepository {
    constructor(dao){
        this.dao = dao
    }

    save = async(obj) => {
            let objDTO = new MessagesDto(obj)
            const created = await this.dao.save(objDTO) 
            return created;
    }

    getById = async(id) => {
            const found = await this.dao.getById(id);
            return found
    }

    getAll = async() => {
            const found = await this.dao.getAll();
            return found
    }

    deleteById = async(id) => {
            const deleted = await this.dao.deleteById(id)
            return deleted
    }

    deleteAll = async() => {
            const deleted = await this.dao.deleteAll()
            return deleted
    }

    getByEmail = async(email) => {
        const found = await this.dao.getByEmail(email);
        return found
    }
}

module.exports = { MessagesRepository }