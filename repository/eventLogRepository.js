import { putItem, ddbService } from "../services/ddbService.js";
import { v4 as uuidv4 } from 'uuid';
import EventLog from "../domain/eventLog.js";

const TABLE_NAME = "ddb-last-poop-dev-event-logs"

const parseItem = (item) => {
    return new EventLog(
        item.Id, 
        item.EventId, 
        item.EventTimestamp
    )
}

const EventLogRepository = {
    add: async(eventId, timestamp) => {
        const item = {
            Id: uuidv4(),
            EventId: eventId,
            EventTimestamp: timestamp
        }
        await putItem(TABLE_NAME, item)
        return parseItem(item)
    },
    query: async(eventId, startTime, endTime) => {
        const params = {
            TableName: TABLE_NAME,
            ExpressionAttributeValues: {
                ':start': startTime,
                ':end': endTime,
                ':eventID': eventId
            },
            KeyConditionExpression: 'EventId = :eventID',
            FilterExpression: 'EventTimestamp between :start and :end'
        }
        const res = await ddbService.queryTable(params)
        return res.Items.map(item => parseItem(item))
    }
}

export default EventLogRepository;