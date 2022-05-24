import { v4 as uuidv4 } from 'uuid';
import User from '../../domain/user.js';
import Event from '../../domain/event.js';
import EventLog from '../../domain/eventLog.js';

const generateUser = () => {
    const id = uuidv4()
    const names = ['alice', 'ben', 'turt']
    const name = names[Math.floor(Math.random()*names.length)];
    const email = `${name}@gmail.com`
    const user = new User(id, name, email)
    return { id, name, email, user }
}

const generateEvent = (userID=null) => {
    const id = uuidv4()
    const userId = userID || uuidv4()
    const names = ['poop', 'food', 'exercise']
    const name = names[Math.floor(Math.random()*names.length)];
    const timestamp = new Date().getTime();
    const event = new Event(id, name, userId, timestamp)
    return { id, name, userId, timestamp, event }
}

const generateEventLog = () => {
    const id = uuidv4()
    const eventId = uuidv4()
    const timestamp = new Date().getTime();
    const eventLog = new EventLog(id, eventId, timestamp)
    return { id, eventId, timestamp, eventLog }
}

export { generateUser, generateEvent, generateEventLog }