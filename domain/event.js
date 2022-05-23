import EventLogRepository from '../repository/eventLogRepository.js'

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

    async getLogsByDay(calendarDay) {
        return await EventLogRepository.query(this.id, calendarDay.startOfDay(), calendarDay.endOfDay())
    }
}

export default Event;