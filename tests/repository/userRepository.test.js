import Sinon from 'sinon';
import t from 'tap';
import UserRepository from '../../repository/userRepository.js';
import { ddbService } from '../../services/ddbService.js';
import { generateUser } from '../helper/factory.js';

t.test('get user', async t => {
    // given
    const { id, name, email, user } = generateUser()
    
    // mock 
    const ddbMock = Sinon.mock(ddbService)
    ddbMock.expects("getItem").once().returns({
        Item: {
            Id: id,
            Name: name,
            Email: email
        }
    })
    
    // when
    const found = await UserRepository.get(email)

    // then
    ddbMock.verify()
    ddbMock.restore()
    t.strictSame(found, user)
    t.end()
})
