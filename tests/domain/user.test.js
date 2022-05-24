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
