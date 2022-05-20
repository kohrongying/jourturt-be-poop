class Event {
    constructor(id, name, userId, createdAt) {
        this.id = id
        this.name = name
        this.userId = userId
        this.createdAt = createdAt
    }

    getSchemaKey() {
        return {
            Id: this.id,
            UserId: this.userId,
        }
    }
}

export default Event;