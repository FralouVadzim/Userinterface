const {Key} = require('selenium-webdriver');
const browser = require("../browsers/browser");

class KeyBoardUtils{

    static async clickLeft(){
        await browser.getDriver().actions()
        .keyDown(Key.ARROW_LEFT)
        .keyUp(Key.ARROW_LEFT)
        .perform()
    }

    static async clickRight(){
        await browser.getDriver().actions()
        .keyDown(Key.ARROW_RIGHT)
        .keyUp(Key.ARROW_RIGHT)
        .perform()
    }
}

module.exports = KeyBoardUtils;