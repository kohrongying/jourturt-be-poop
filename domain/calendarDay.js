import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc.js'
import timezone from 'dayjs/plugin/timezone.js'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.setDefault("Asia/Singapore")
class CalendarDay {
    constructor(timestamp) {
        this.timestamp = timestamp
        this.day = dayjs(timestamp)
    }

    startOfDay() {
        return this.day.utcOffset(8).startOf('date').valueOf();
    }
    
    endOfDay() {
        return this.day.utcOffset(8).endOf('date').valueOf();   
    }

}

export default CalendarDay;