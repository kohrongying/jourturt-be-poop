import { putItem, queryTable } from "../services/ddbService.js";
import { v4 as uuidv4 } from 'uuid';
import Event from '../domain/event.js'

const TABLE_NAME = "ddb-last-poop-dev-events"

const parseItem = (item) => {
    return new Event(item.Id, item.Name, item.UserId, item.CreatedAt)
}

const EventRepository = {
    add: async(userId, name) => {
        const item = {
            Id: uuidv4(),
            UserId: userId,
            CreatedAt: new Date().getTime(),
            Name: name
        }
        await putItem(TABLE_NAME, item)
        return parseItem(item)
    },
    findByUser: async (userId) => {
        const params = {
            TableName: TABLE_NAME,
            ExpressionAttributeValues: {
                ':userID': userId,
            },
            KeyConditionExpression: 'UserId = :userID'
        }
        const res = await queryTable(params)
        return res.Items.map(item => parseItem(item))
    },
}

export default EventRepository;