
import Sinon from 'sinon';
import t from 'tap';
import EventLogRepository from '../../repository/eventLogRepository.js';
import { ddbService } from '../../services/ddbService.js';
import { generateEvent, generateEventLog } from '../helper/factory.js';

t.test('find events by user', async t => {
    // given
    const startTime = 1653235200000
    const endTime = 1653321599999
    const { id: eventId } = generateEvent()
    const { id: eventLogId, timestamp, eventLog } = generateEventLog(eventId)

    // mock 
    const ddbMock = Sinon.mock(ddbService)
    ddbMock.expects("queryTable").once().returns({
        Items: [
            {
                Id: eventLogId,
                EventId: eventId,
                EventTimestamp: timestamp,
            }
        ]
    })
    
    // when
    const found = await EventLogRepository.query(eventId, startTime, endTime)

    // then
    ddbMock.verify()
    ddbMock.restore()
    t.strictSame(found, [eventLog])
    t.end()
})
