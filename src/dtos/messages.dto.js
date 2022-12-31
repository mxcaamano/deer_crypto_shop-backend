class MessagesDto{
    constructor(message){
        this.author = message.author
        this.text = message.text
    }
}

module.exports = MessagesDto