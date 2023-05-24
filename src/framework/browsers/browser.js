require('chromedriver');
require('geckodriver');
const {Builder,until} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const firefox = require('selenium-webdriver/firefox');
const config = require('../../config/config.json');
const Logger = require('../logging/logger');

class Browser{
    #driver;
    
    async init(){
        Logger.logInfo('Driver init');        
        this.#driver = await new Builder().forBrowser(config.browser)
            .setChromeOptions(new chrome.Options().addArguments(config.capabilities.args))
            .build();
    }

    async openUrl(url){
        Logger.logInfo(`Open url ${url}`);
        return this.#driver.get(config.startUrl);
      }
        
    async close(){
        Logger.logInfo('Close browser');
        this.#driver.quit();
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
}

module.exports = new Browser();