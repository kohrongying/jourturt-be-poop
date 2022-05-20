import t from 'tap';

import User from "../../domain/user.js"

t.test('get user schema', async t => {
    const uuid = "some-uuid"
    const name = "a name"
    const user = new User(uuid, name)
    
    const expectedSchema = {
        Id: uuid,
        Name: name
    }
    t.strictSame(user.getSchemaKey(), expectedSchema)

    t.end()
})

