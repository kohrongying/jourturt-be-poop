import { ddbDocClient } from './ddbDocClient.js';
import { DeleteCommand, GetCommand, PutCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";

const getItem = async (table, key) => {
    const params = {
        TableName: table,
        Key: key
    }
    return await ddbDocClient.send(new GetCommand(params))
}

const putItem = async (table, item) => {
    const params = {
        TableName: table,
        Item: item,
    }
    return await ddbDocClient.send(new PutCommand(params))
}

const deleteItem = async (table, key) => {
    const params = {
        TableName: table,
        Key: key
    }
    return await ddbDocClient.send(new DeleteCommand(params))
}

const queryTable = async (params) => {
    return await ddbDocClient.send(new QueryCommand(params))
}

export { getItem, putItem, deleteItem, queryTable };
