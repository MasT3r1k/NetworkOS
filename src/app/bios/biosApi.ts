import { Calendar } from "../utils/calendarManager";

export namespace BiosApi {
    export function getTime() {
        return {
            format: Calendar.parseFormat,
            date: Calendar.getDate(),
            month: Calendar.getMonth(),
            year: Calendar.getFullYear(),
            hours: Calendar.getHours(),
            minutes: Calendar.getMinutes(),
            seconds: Calendar.getSeconds()
        }
    }
}