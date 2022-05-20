class User {
    constructor(id, name) {
        this.id = id
        this.name = name
    }

    getSchemaKey() {
        return {
            Id: this.id,
            Name: this.name
        }
    }
}

export default User;