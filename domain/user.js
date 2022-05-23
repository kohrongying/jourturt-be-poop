import EventRepository from '../repository/eventRepository.js'

class User {
    constructor(id, name, email) {
        this.id = id
        this.name = name
        this.email = email
    }

    async getEvents() {
        return await EventRepository.query(this.id)
    }
}

export default User;