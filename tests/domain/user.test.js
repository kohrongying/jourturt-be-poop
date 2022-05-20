import t from 'tap';

import { generateUser } from '../helper/factory.js'

t.test('get user schema', async t => {
    const { id, name, user } = generateUser()
    const expectedSchema = {
        Id: id,
        Name: name
    }
    t.strictSame(user.getSchemaKey(), expectedSchema)
    t.end()
})

