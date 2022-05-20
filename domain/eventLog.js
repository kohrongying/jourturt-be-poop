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

    formatItem() {
        return {
            ...this.getSchemaKey(),
            ...{ EventTimestamp: this.eventTs }
        }
    }
}

export default EventLog;