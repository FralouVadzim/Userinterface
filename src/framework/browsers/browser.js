require('chromedriver');
require('geckodriver');
const {until} = require('selenium-webdriver');
const Logger = require('../logging/logger');
const browserFactory = require('./browserFactory');
const config = require('../../config/config.json')

class Browser{
    #driver;
    
    async init(){
        this.#driver = await browserFactory.getBrowser();
    }

    async openUrl(url){
        Logger.logInfo(`Open url ${url}`);
        return this.#driver.get(config.startUrl);
      }
        
    async close(){
        Logger.logInfo('Close browser');
        return this.#driver.quit();
    }

    async closeWindow(){
        Logger.logInfo('Close window');
        return this.#driver.close();
    }
    
    getDriver(){
        return this.#driver;
    }

    async acceptAlert(){
        Logger.logInfo('Accept alert');
        this.waitUntilAlertIsPresent();
        return this.#driver.switchTo().alert().accept();
    }

    async dismissAlert(){
        Logger.logInfo('Dismiss alert');
        this.waitUntilAlertIsPresent();
        return this.#driver.switchTo().alert().dismiss();
    }

    async getTextFromAlert(){
        Logger.logInfo('Get text from alert');
        this.waitUntilAlertIsPresent();
        return this.#driver.switchTo().alert().getText();
    }

    async sendKeysToAlert(text){
        Logger.logInfo(`Send keys "${text}" to alert`);
        this.waitUntilAlertIsPresent();
        return this.#driver.switchTo().alert().sendKeys(text);
    }

    async isAlertPresent(){
        Logger.logInfo('Check that alert is present');
        try{
            await this.#driver.switchTo().alert();
            Logger.logInfo('Alert is present');
            return true;
        }catch{
            Logger.logInfo('Alert is not present');
            return false;
        }
    }

    async waitUntilAlertIsPresent(){
        this.#driver.wait(until.alertIsPresent);
    }

    // async getElement(locator, name){
    //     Logger.logInfo(`Getting element "${name}" with locator: ${locator}`);
    //     await this.#driver.wait(until.elementLocated(locator));
    //     return this.#driver.findElement(locator);
    // }

    async switchToIframe(attribute){
        Logger.logInfo(`Switching to iframe with attribute "${attribute}"`);
        await this.#driver.switchTo().frame(attribute);
    }

    async switchToPage(){
        Logger.logInfo('Switching to Page');
        await this.#driver.switchTo().defaultContent();
    }
}

module.exports = new Browser();