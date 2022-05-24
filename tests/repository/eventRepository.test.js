
import Sinon from 'sinon';
import t from 'tap';
import EventRepository from '../../repository/eventRepository.js';
import { ddbService } from '../../services/ddbService.js';
import { generateEvent, generateUser } from '../helper/factory.js';

t.test('find events by user', async t => {
    // given
    const { id } = generateUser()
    const { id: eventId, name: eventName, timestamp, event } = generateEvent(id)
    const { id: eventId2, name: eventName2, timestamp: timestamp2, event: event2 } = generateEvent(id)

    // mock 
    const ddbMock = Sinon.mock(ddbService)
    ddbMock.expects("queryTable").once().returns({
        Items: [
            {
                Id: eventId,
                Name: eventName,
                UserId: id,
                CreatedAt: timestamp
            },
            {
                Id: eventId2,
                Name: eventName2,
                UserId: id,
                CreatedAt: timestamp2
            },
        ]
    })
    
    // when
    const found = await EventRepository.findByUser(id)

    // then
    ddbMock.verify()
    ddbMock.restore()
    t.strictSame(found, [event, event2])
    t.end()
})
