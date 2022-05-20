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
    try {
        return await ddbDocClient.send(new PutCommand(params))
    } catch (err) {
        return err
    }
}

export { getItem, putItem };


