import Sinon from 'sinon';
import t from 'tap';
import EventLogRepository from '../../repository/eventLogRepository.js';
import EventRepository from '../../repository/eventRepository.js';
import { generateEvent, generateEventLog, generateUser } from '../helper/factory.js';

t.test('get events', async t => {
    // given
    const { id, name, email, user } = generateUser()
    const { event } = generateEvent()
    // mock 
    const eventRepositoryMock = Sinon.mock(EventRepository)
    eventRepositoryMock.expects('findByUser').once().withArgs(id).returns([event])
    
    // when
    const found = await user.getEvents()

    // then
    eventRepositoryMock.verify()
    eventRepositoryMock.restore()
    t.strictSame(found, [event])
    t.end()
})

t.test('get event logs', async t => {
    // given
    const { id, user } = generateUser()
    const { id: eventId, event } = generateEvent()
    const { id: eventId2, event: event2 } = generateEvent()
    
    const { eventLog } = generateEventLog()
    const { eventLog: eventLog2 } = generateEventLog()

    const startTime = 1653235200000
    const endTime = 1653321599999
    
    // mock 
    const eventRepositoryMock = Sinon.mock(EventRepository)
    eventRepositoryMock.expects('findByUser').once().withArgs(id)
        .returns([event, event2])
    const eventLogRepositoryMock = Sinon.mock(EventLogRepository)
    eventLogRepositoryMock.expects('query').once().withArgs(eventId, startTime, endTime)
        .returns([eventLog])
    eventLogRepositoryMock.expects('query').once().withArgs(eventId2, startTime, endTime)
        .returns([eventLog2])
    
        // when
    const found = await user.getEventLogs(startTime, endTime)

    // then
    eventRepositoryMock.verify()
    eventRepositoryMock.restore()
    eventLogRepositoryMock.verify()
    eventLogRepositoryMock.restore()
    t.strictSame(found, [eventLog, eventLog2])
    t.end()
})