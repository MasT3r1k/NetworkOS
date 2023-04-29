export namespace Utils {
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
}