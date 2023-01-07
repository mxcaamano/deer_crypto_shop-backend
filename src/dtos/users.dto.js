class UsersDto{
    constructor(user){
        this.email = user.email,
        this.password = user.password,
        this.name = user.name,
        this.address = user.address,
        this.age = user.age,
        this.phone = user.phone,
        this.imgURL = user.imgURL,
        this.isAdmin = user.isAdmin
    }
}

module.exports = UsersDto