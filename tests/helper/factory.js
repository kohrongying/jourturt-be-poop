import { v4 as uuidv4 } from 'uuid';
import User from '../../domain/user.js';

const generateUser = () => {
    const id = uuidv4()
    const names = ['alice', 'ben', 'turt']
    const name = names[Math.floor(Math.random()*names.length)];
    const user = new User(id, name)
    return { id, name, user }
}

export { generateUser }