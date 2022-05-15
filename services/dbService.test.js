import t from 'tap';

import { mockClient } from "aws-sdk-client-mock";
import { ddbDocClient } from './ddbDocClient.js';
const ddbMock = mockClient(ddbDocClient);

import { deleteItem, getItem, putItem, queryItems } from './dbService.js'
import { DeleteCommand, GetCommand, PutCommand, QueryCommand } from '@aws-sdk/lib-dynamodb'

t.beforeEach(() => {
    ddbMock.reset();
})

const TABLE_NAME = "test_table"
const USER_ID = '1'

t.test('get item', async t => {
    const eventDate = '2020-11-15T09:57:43.306Z'
    const params = {
        TableName: TABLE_NAME,
        Key: {
            'UserId': USER_ID,
            'EventDate': eventDate
        }
    }
    const expectedItem = {
        UserId: '1',
        EventDate: '2020-11-15T09:57:43.306Z',
        CreatedAt: '2020-11-15T09:57:43.306Z',
        Event: 'poop'
    }
    ddbMock
        .on(GetCommand)
        .resolves({
            Item: undefined
        })
        .on(GetCommand, params)
        .resolves({
            Item: expectedItem,
        });
    const item = await getItem(eventDate)
    t.test('check result', async t => t.strictSame(item.Item, expectedItem))

    t.end()
})

t.test('put item', async t => {
    const item = {
        UserId: '1',
        EventDate: '2020-11-15T09:57:43.306Z',
        CreatedAt: '2020-11-15T09:57:43.306Z',
        Event: 'poop'
    }
    const params = {
        TableName: TABLE_NAME,
        Item: item,
    }
    const expectedData = {
        data: {
            ConsumedCapacity: {
                CapacityUnits: 1,
                TableName: TABLE_NAME
            }
        }
    }
    ddbMock
        .on(PutCommand)
        .resolves({
            data: undefined
        })
        .on(PutCommand, params)
        .resolves(expectedData);
    const data = await putItem(item)
    t.test('check result', async t => t.strictSame(data, expectedData))

    t.end()
})


t.test('delete item', async t => {
    const eventDate = '2020-11-15T09:57:43.306Z'
    const params = {
        TableName: TABLE_NAME,
        Key: {
            'UserId': USER_ID,
            'EventDate': eventDate
        }
    }
    const expectedData = {
        data: {
            ConsumedCapacity: {
                CapacityUnits: 1,
                TableName: TABLE_NAME
            }
        }
    }
    ddbMock
        .on(DeleteCommand)
        .resolves({
            data: undefined
        })
        .on(DeleteCommand, params)
        .resolves(expectedData);
    const data = await deleteItem(eventDate)
    t.test('check result', async t => t.strictSame(data, expectedData))

    t.end()
})


t.test('query item', async t => {
    const startDate = '2020-11-15T09:57:43.306Z'
    const endDate = '2020-11-20T09:57:43.306Z'

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
    const expectedData = {
        data: {
            ConsumedCapacity: {
            },
            Count: 2,
            Items: [
                {
                    "SongTitle": {
                        S: "Call Me Today"
                    }
                }
            ],
            ScannedCount: 2
        }
    }
    ddbMock
        .on(QueryCommand)
        .resolves({
            data: undefined
        })
        .on(QueryCommand, params)
        .resolves(expectedData);
    const data = await queryItems(startDate, endDate)
    t.test('check result', async t => t.strictSame(data, expectedData))

    t.end()
})
