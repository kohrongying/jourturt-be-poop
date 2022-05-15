import { ddbDocClient } from './ddbDocClient.js';
import { DeleteCommand, GetCommand, PutCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";

const USER_ID = '1'
const TABLE_NAME = "table"

const getItem = async (eventDate) => {
    const params = {
        TableName: TABLE_NAME,
        Key: {
            'UserId': USER_ID,
            'EventDate': eventDate
        }
    }
    return await ddbDocClient.send(new GetCommand(params))
}

const putItem = async (item) => {
    const params = {
        TableName: TABLE_NAME,
        Item: item,
    }
    try {
        return await ddbDocClient.send(new PutCommand(params))
    } catch (err) {
        return err
    }
}

const deleteItem = async (eventDate) => {
    const params = {
        TableName: TABLE_NAME,
        Key: {
            'UserId': USER_ID,
            'EventDate': eventDate
        }
    }
    try {
        return await ddbDocClient.send(new DeleteCommand(params))
    } catch (err) {
        return err
    }
}

const queryItems = async (startDate, endDate) => {
    const params = {
        TableName: TABLE_NAME,
        ExpressionAttributeValues: {
            ':start': startDate,
            ':end': endDate,
            ':user': USER_ID
        },
        KeyConditionExpression: 'UserId = :user',
        FilterExpression: 'CreatedAt between :start and :end'
    }
    try {
        return await ddbDocClient.send(new QueryCommand(params))
    } catch (err) {
        return err
    }
}

export { getItem, putItem, deleteItem, queryItems };


