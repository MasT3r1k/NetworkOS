import { Calendar } from "../utils/calendarManager";
import { Bios } from "./bios";

export namespace BiosApi {
    export function getTime() {
        return {
            date: Calendar.getDate(),
            month: Calendar.getMonth(),
            year: Calendar.getFullYear(),
            hours: Calendar.getHours(),
            minutes: Calendar.getMinutes(),
            seconds: Calendar.getSeconds()
        }
    }
}