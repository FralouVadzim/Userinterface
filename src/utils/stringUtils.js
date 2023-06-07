export class StringUtils{

    static getDigitsFromText(text){
        return Number(text.replace(/\D+/g, ''));
    }

    static generateRandomString(len){
        let chrs = 'abdehkmnpswxzABDEFGHKMNPQRSTWXZ123456789';
        let str = '';
        for (var i = 0; i < len; i++) {
            var pos = Math.floor(Math.random() * chrs.length);
            str += chrs.substring(pos,pos+1);
        }
        return str;
    }

    static getRandomIntInclusive(min, max){
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    static cutFirstZero(string){
        return string.startsWith('0') ? string.slice(1) : string;
    };

    static getNearestLeapYear(){
        const date = new Date();
        for (let i = date.getFullYear(); i < date.getFullYear() + 5; i++){
            if(date.getMonth > 1 && i == date.getFullYear()){
                continue;
            }
            if ((0 == i % 4) && (0 != i % 100) || (0 == i % 400)) {
                return i;
            }
        }
    }
}