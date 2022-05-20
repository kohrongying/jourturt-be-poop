import { ddbDocClient } from './ddbDocClient.js';
import { DeleteCommand, GetCommand, PutCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";

const getItem = async (table, key) => {
    const params = {
        TableName: table,
        Key: key
    }
    return await ddbDocClient.send(new GetCommand(params))
}

export { getItem };


