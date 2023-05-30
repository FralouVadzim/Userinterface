
class StringUtils{

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
}

module.exports = StringUtils;