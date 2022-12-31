class OrdersDto{
    constructor(orders){
        this.items = orders.items
        this.total = orders.total
        this.date = orders.date
        this.state = orders.state
        this.buyer = orders.buyer
        this.orderN = orders.orderN
    }
}

module.exports = OrdersDto