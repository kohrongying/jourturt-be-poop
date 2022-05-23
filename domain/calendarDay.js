import dayjs from 'dayjs'

class CalendarDay {
    constructor(timestamp) {
        this.timestamp = timestamp
        this.day = dayjs(timestamp)
    }

    startOfDay() {
        return this.day.startOf('date').valueOf();
    }
    
    endOfDay() {
        return this.day.endOf('date').valueOf();   
    }

}

export default CalendarDay;