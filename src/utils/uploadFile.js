const path = require("path");
const {keyboard, Key, clipboard} = require("@nut-tree/nut-js");
const config = require('../config/config.json');

class UploadFile{

    static async uploadImage(){
        const filePathpath = path.join(path.dirname(__dirname), config.uploadFilePath);
        await clipboard.setContent(filePathpath)
        await keyboard.pressKey(Key.LeftControl, Key.V);
        await keyboard.releaseKey(Key.LeftControl, Key.V);
        await keyboard.pressKey(Key.Enter);
        await keyboard.releaseKey(Key.Enter);
    }
}

module.exports = UploadFile;