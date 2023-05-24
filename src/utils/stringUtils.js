
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
}

module.exports = StringUtils;