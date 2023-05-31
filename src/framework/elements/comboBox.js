const {until, Select} = require('selenium-webdriver');
const Logger = require('../logging/logger');
const browser = require('../browsers/browser');
const BaseElement = require('./baseElement');
const timeouts = require('../configuration/timeouts.json');

class ComboBox extends BaseElement{

    constructor(locator, name){
        super(locator, name);
    }

    async clickItem(itemLocator, timeout = timeouts.timeoutSmall){
        Logger.logInfo(`Open popup "${this.name}"`);
        const comboBox = await browser.getDriver().findElement(this.locator);
        await comboBox.click();
        await browser.getDriver().wait(until.elementLocated(itemLocator), timeout);
        const item = await browser.getDriver().findElement(itemLocator);
        Logger.logInfo(`Select item`);
        return item.click();
    }

    async selectItemByVisibleText(name){
        Logger.logInfo(`Open popup "${this.name}"`);
        const comboBox = await browser.getDriver().findElement(this.locator);
        await comboBox.click();
        const select = new Select(comboBox);
        Logger.logInfo(`Select item ${name}`);
        await select.selectByVisibleText(name);
        return comboBox.click();
    }
}

module.exports = ComboBox;