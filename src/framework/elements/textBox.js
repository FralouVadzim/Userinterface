const BaseElement = require('./baseElement');
const Logger = require('../logging/logger');
const browser = require('../browsers/browser');

class TextBox extends BaseElement{

    constructor(locator, name){
        super(locator, name);
    }

    async sendKeys(text){
        Logger.logInfo(`Fill text "${text}" into "${this.name}"`);
        const el = await browser.getDriver().findElement(this.locator);
        return el.sendKeys(text);
    }

    async clear(){
        Logger.logInfo(`Clearing "${this.name}"`);
        const el = await browser.getDriver().findElement(this.locator);
        return el.clear();
    }
}

module.exports = TextBox;