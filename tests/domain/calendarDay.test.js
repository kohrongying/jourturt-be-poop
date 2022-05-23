import t from 'tap';
import CalendarDay from '../../domain/calendarDay.js';


t.test('get start and end of day', async t => {

    const thisDay = new CalendarDay(1653301202680) // 2022-05-23T10:20:02.680Z
    t.strictSame(thisDay.startOfDay(), 1653235200000)
    t.strictSame(thisDay.endOfDay(), 1653321599999)
    t.end()
})