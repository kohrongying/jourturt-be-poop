import EventRepository from '../repository/eventRepository.js'

class User {
    constructor(id, name, email) {
        this.id = id
        this.name = name
        this.email = email
    }

    async getEvents() {
        return await EventRepository.findByUser(this.id)
    }

    async getEventLogs(startTime, endTime) {
        const events = await this.getEvents()
        let eventLogs = []
        for (let event of events)  {
            const logs = await event.getLogsByDay(startTime, endTime)
            eventLogs = eventLogs.concat(logs)
        }
        return eventLogs
    }
}

export default User;