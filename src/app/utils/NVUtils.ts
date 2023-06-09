export namespace Utils {
    export interface Coordinates {
        x: number;
        y: number;
    }
    export function addZeros(num: number, length: number = 2) {
        if (length <= 0 || num.toString().length >= length) return num;
        let text = "";
        for(let i = 0;i < length - num.toString().length;i++) {
            text += '0';
        }
        return text += num;
    }
    
    export function randomChar(length: number) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for ( var i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }

    export function isEmpty(string: string | Array<String>): boolean {
        return (string == '' || string == '[]');
    }

    export function testMaximumStorage() {
        if (localStorage) {
            var i: number = 0;
            try {
                // Test up to 10 MB
                for (i = 250; i <= 10000; i += 250) {
                    localStorage.setItem('test', new Array((i * 1024) + 1).join('a'));
                }
            } catch (e) {
                localStorage.removeItem('test');
                console.log('Maximum size: ' + (i - 250).toString());
            }
        }
    }

    export class NVItems {

        constructor() {}
    }
}