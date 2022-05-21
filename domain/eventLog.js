import EventLogRepository from "../repository/eventLogRepository.js"

class EventLog {
    constructor(id, eventId, eventTs) {
        this.id = id
        this.eventId = eventId
        this.eventTs = eventTs
    }

    getSchemaKey() {
        return {
            Id: this.id,
            EventId: this.eventId,
        }
    }
}

export default EventLog;