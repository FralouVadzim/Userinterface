const {until} = require('selenium-webdriver');
const Logger = require('../logging/logger');
const browser = require('../browsers/browser');
const timeouts = require('../configuration/timeouts.json');

class BaseElement{

    constructor(locator, name){
        this.locator = locator;
        this.name = name;
    }

    async isPresent(){
        Logger.logInfo(`Check that element '${this.name}' is present`);
        const el = await browser.getDriver().findElements(this.locator);
        const res =  el.length > 0;
        Logger.logInfo(`Result is ${res}`);
        return res;
    }

    async isElementLocatedAfterWait(timeout = timeouts.timeoutFindItem){   
        Logger.logInfo(`Check that element '${this.name}' located`);
        let res;
        try{
            res = Boolean(await browser.getDriver().wait(until.elementLocated(this.locator), timeout))
            Logger.logInfo(`Result is ${res}`);
        }catch{
            res = false;
            Logger.logInfo(`Result is ${res}`);
        }
        return res;
    }

    async isElementVisible(withWait = true, timeout = timeouts.timeoutSmall){
        Logger.logInfo(`Check that form '${this.name}' is visible`);
        let element;
        let result;
        try{
            if(withWait){
                element = await this.waitUntilElementIsVisible(timeout);
            }else{
                element = await browser.getDriver().findElement(this.locator);
            }
            result = await element.isDisplayed();
            Logger.logInfo(`Result is ${await result}`);
            return result;

        }catch(err){
            if(err.name === 'NoSuchElementError'){
                result = false;
                Logger.logInfo(`Result is ${result}`);
                return result;
            }
            throw new Error(`Error ${err.name}. Message: ${err.message}`);   
        }
    }

    async waitUntilElementIsVisible(timeout = timeouts.timeoutSmall){           
        await this.isElementLocatedAfterWait(timeout);
        Logger.logInfo(`Wait until element '${this.name}' is visible`); 
        const el = await browser.getDriver().findElement(this.locator);
        return browser.getDriver().wait(until.elementIsVisible(el), timeout);
    }

    async waitUntilElementIsBecomeStaleOrNotLocated(timeout = timeouts.timeoutSmall){
        Logger.logInfo(`Wait until element '${this.name}' becomes stale or not located`);
        try{
            return browser.getDriver().wait(until.stalenessOf(await browser.getDriver().findElement(this.locator)), timeout);
        }catch(err){
            if(err.name === 'NoSuchElementError'){
                Logger.logInfo(`Unable to locate element: '${this.name}'`);
                return;
            }
            throw new Error(`Error ${err.name}. Message: ${err.message}`);            
        }
    }

    async waitUntilElementIsEnabled(timeout = timeouts.timeoutSmall){
        await this.isElementLocatedAfterWait();
        Logger.logInfo(`Wait until element '${this.name}' is enabled`); 
        const el = await browser.getDriver().findElement(this.locator);
        return browser.getDriver().wait(until.elementIsEnabled(el), timeout);
    }

    async waitUntilElementIsNotVisible(timeout = timeouts.timeoutSmall){
        Logger.logInfo(`Wait until element '${this.name}' is not visible`); 
        const el = await browser.getDriver().findElement(this.locator);
        return browser.getDriver().wait(until.elementIsNotVisible(el), timeout);
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
    
    async scrollIntoView(){
        Logger.logInfo(`Scrolling into view element '${this.name}'`);
        const el = await browser.getDriver().findElement(this.locator);
        return browser.getDriver().executeScript('arguments[0].scrollIntoView();', el);
    }

    async getElement(){
        Logger.logInfo(`Getting element "${this.name}" with locator: ${this.locator}`);
        await browser.getDriver().wait(until.elementLocated(this.locator));
        return browser.getDriver().findElement(this.locator);
    }

    async getAttribute(attributeName){
        Logger.logInfo(`Gettig attribute ${attributeName} for element '${this.name}'`);
        const el = await browser.getDriver().findElement(this.locator);
        const value = await el.getAttribute(attributeName);
        Logger.logInfo(`The value is: ${value}`);
        return value;
    }
}

module.exports = BaseElement;