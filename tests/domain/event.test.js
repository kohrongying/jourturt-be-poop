import Sinon from 'sinon';
import t from 'tap';
import EventLogRepository from '../../repository/eventLogRepository.js';
import { generateEvent, generateEventLog } from '../helper/factory.js';

t.test('get event logs by day', async t => {
    // given
    const { id, event } = generateEvent()
    const { eventLog } = generateEventLog()
    const startTime = 1653235200000
    const endTime = 1653321599999
    
    // mock 
    const eventLogRepositoryMock = Sinon.mock(EventLogRepository)
    eventLogRepositoryMock.expects('query').once().withArgs(id, startTime, endTime)
        .returns([event])

    // when
    const found = await event.getLogsByDay(startTime, endTime)

    // then
    eventLogRepositoryMock.verify()
    eventLogRepositoryMock.restore()
    t.strictSame(found, [event])
    t.end()
})