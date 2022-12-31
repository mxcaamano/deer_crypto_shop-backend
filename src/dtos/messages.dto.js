class MessagesDto{
    constructor(message){
        this.author = message.author
        this.date = message.date
        this.text = message.text
    }
}

module.exports = MessagesDto