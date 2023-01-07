class UsersDto{
    constructor(user){
        this.email = user.email,
        this.password = product.password,
        this.name = user.name,
        this.address = user.addres,
        this.age = user.age,
        this.phone = user.phone,
        this.imgURL = user.imgURL,
        this.isAdmin = user.isAdmin
    }
}

module.exports = UsersDto