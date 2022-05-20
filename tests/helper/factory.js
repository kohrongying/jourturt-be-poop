import { v4 as uuidv4 } from 'uuid';
import User from '../../domain/user.js';
import Event from '../../domain/event.js';

const generateUser = () => {
    const id = uuidv4()
    const names = ['alice', 'ben', 'turt']
    const name = names[Math.floor(Math.random()*names.length)];
    const user = new User(id, name)
    return { id, name, user }
}

const generateEvent = () => {
    const id = uuidv4()
    const userId = uuidv4()
    const names = ['poop', 'food', 'exercise']
    const name = names[Math.floor(Math.random()*names.length)];
    const timestamp = new Date().getTime();
    const event = new Event(id, name, userId, timestamp)
    return { id, name, userId, timestamp, event }
}

export { generateUser, generateEvent }