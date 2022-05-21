import { putItem } from "../services/ddbService.js";

const TABLE_NAME = "ddb-last-poop-dev-event-logs"

class EventLogRepository {
    async add(id, eventId, timestamp) {
        const item = {
            Id: id,
            EventId: eventId,
            EventTimestamp: timestamp
        }
        return await putItem(TABLE_NAME, item)
    }
}

export default EventLogRepository;