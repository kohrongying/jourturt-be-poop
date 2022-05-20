import t from 'tap';

import { mockClient } from "aws-sdk-client-mock";
import { ddbDocClient } from '../../services/ddbDocClient.js';
const ddbMock = mockClient(ddbDocClient);

import { getItem } from '../../services/ddbService.js'
import { DeleteCommand, GetCommand, PutCommand, QueryCommand } from '@aws-sdk/lib-dynamodb'
import { generateUser, generateEvent } from '../helper/factory.js'

t.beforeEach(() => {
    ddbMock.reset();
})

t.test('get user', async t => {
    // given
    const TABLE_NAME = "users"
    const { id, name, user } = generateUser()

    const params = {
        TableName: TABLE_NAME,
        Key: user.getSchemaKey()
    }
    ddbMock
        .on(GetCommand)
        .resolves({
            Item: undefined
        })
        .on(GetCommand, params)
        .resolves({
            '$metadata': {
                httpStatusCode: 200,
                requestId: 'M29ONP01OBQHC4MQ4V2MCERU07VV4KQNSO5AEMVJF66Q9ASUAAJG',
                extendedRequestId: undefined,
                cfId: undefined,
                attempts: 1,
                totalRetryDelay: 0
            },
            ConsumedCapacity: undefined,
            Item: { Id: id, Name: name }
        });
    const item = await getItem(TABLE_NAME, user.getSchemaKey())
    t.test('check result', async t => t.strictSame(item.Item, user.getSchemaKey()))

    t.end()
})


t.test('get event', async t => {
    // given
    const TABLE_NAME = "events"
    const { id, name, userId, timestamp, event } = generateEvent()

    const params = {
        TableName: TABLE_NAME,
        Key: event.getSchemaKey()
    }
    ddbMock
        .on(GetCommand)
        .resolves({
            Item: undefined
        })
        .on(GetCommand, params)
        .resolves({
            '$metadata': {
                httpStatusCode: 200,
                requestId: 'M29ONP01OBQHC4MQ4V2MCERU07VV4KQNSO5AEMVJF66Q9ASUAAJG',
                extendedRequestId: undefined,
                cfId: undefined,
                attempts: 1,
                totalRetryDelay: 0
            },
            ConsumedCapacity: undefined,
            Item: { Id: id, Name: name, CreatedAt: timestamp, UserId: userId }
        });
    const item = await getItem(TABLE_NAME, event.getSchemaKey())
    t.test('check result', async t => t.strictSame(item.Item, { Id: id, Name: name, CreatedAt: timestamp, UserId: userId }))

    t.end()
})