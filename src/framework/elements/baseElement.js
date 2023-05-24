const {until} = require('selenium-webdriver');
const Logger = require('../logging/logger');
const browser = require('../browsers/browser');
const timeouts = require('../configuration/timeouts.json');

class BaseElement{

    constructor(locator, name){
        this.locator = locator;
        this.name = name;
    }

    async isPresent(timeout = timeouts.timeoutSmall){
        Logger.logInfo(`Check that element '${this.name}' is present`);
        await browser.getDriver().wait(until.elementLocated(this.locator), timeout);
        const el = await browser.getDriver().findElements(this.locator);
        const res =  el.length > 0;
        Logger.logInfo(`Result is ${res}`);
        return res;
    }

    async waitUntilElementIsVisible(timeout = timeouts.timeoutSmall){           
        await this.isPresent();
        Logger.logInfo(`Wait until element '${this.name}' is visible`); 
        const el = await browser.getDriver().findElement(this.locator);
        return browser.getDriver().wait(until.elementIsVisible(el), timeout);
    }

    async waitUntilElementIsEnabled(timeout = timeouts.timeoutSmall){           
        await this.isPresent();
        Logger.logInfo(`Wait until element '${this.name}' is enabled`); 
        const el = await browser.getDriver().findElement(this.locator);
        return browser.getDriver().wait(until.elementIsEnabled(el), timeout);
    }

    async click(){
        Logger.logInfo(`Click by element '${this.name}'`);
        const el = await browser.getDriver().findElement(this.locator);
        return el.click();
    }

    async getText(){
        Logger.logInfo(`Get text from element '${this.name}'`);
        const el = await browser.getDriver().findElement(this.locator);
        return el.getText();
    }

    async hover(){
        Logger.logInfo(`Hover on element '${this.name}'`);
        const el = await browser.getDriver().findElement(this.locator);
        return browser.getDriver().actions().move({origin:el}).perform();
    }
}

module.exports = BaseElement;