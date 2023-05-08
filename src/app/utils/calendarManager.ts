import { Utils } from "./NVUtils";

class CalendarClass {
    public time: Date = new Date();
    public offset: number = 0;
    constructor(offset?: number) {
        this.offset = offset || 0;
        setInterval(() => {
            let _temp = new Date().getTime();
            this.time = new Date(_temp + this.offset);
        }, 1000)
    }

    public getDays = (month: number, year?: number): number => {
        month = (month === 0) ? month = 1 : month;
        year = (year) ? year : this.getFullYear();
        return new Date(year, month, 0).getDate();
    }

    public getFullYear = () => {
        return this.time.getFullYear();
    }

    public getMonth = (): number => {
        return this.time.getMonth() + 1;
    }

    public getDate = (): number => {
        return this.time.getDate();
    }

    public getHours = (): number => {
        return this.time.getHours();
    }

    public getMinutes = (): string | number => {
        return Utils.addZeros(this.time.getMinutes(), 2);
    }

    public getSeconds = (): string | number => {
        return Utils.addZeros(this.time.getSeconds(), 2);
    }

    public getCalendar = (): Record<string, any> => {
        //! TODO: Work in Progress 
        return {
            rows: 5,  // Rows of days in calendar
            data: [[], [], [], [], []]  // Days per days every row 
        }
    }

}

export let Calendar: CalendarClass = new CalendarClass();

// export namespace Calendar {
//     export let offset: number = 0;
//     let date: Date = new Date();
//     setInterval(() => {
//         let time = new Date().getTime();
//         date = new Date(time + offset);
//     }, 1000)
//     export function getDays(month: number, year?: number) {
//         month = (month === 0) ? month = 1 : month;
//         year = (year) ? year : date.getFullYear();
//         return new Date(year, month, 0).getDate();
//     }

//     export function getMonth() {
//         return (date.getMonth() + 1);
//     }

//     export function getDate() {
//         return date.getDate();
//     }
    
//     export function setDate(offset: number): void {
//         Calendar.offset = offset;
//         let time = new Date().getTime();
//         date = new Date(time + offset);
//     }

//     export function getYear() {
//         return date.getFullYear();
//     }

//     export function getHours() {
//         return date.getHours();
//     }

//     export function getMinutes() {
//         return Utils.addZeros(date.getMinutes(), 2);
//     }

//     export function getSeconds() {
//         return Utils.addZeros(date.getSeconds(), 2);
//     }

//     export function getCalendar(month: number, year?: number) {
//         // TODO: DODĚLAT DLE RETURNU lol xd
//         return {
//             rows: 5,  // Rows of days in calendar
//             data: [[], [], [], [], []]  // Days per days every row 
//         }
//     }
// }