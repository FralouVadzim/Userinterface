require('chromedriver');
require('geckodriver');
const {Builder,until} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const firefox = require('selenium-webdriver/firefox');
const config = require('../../config/config.json');
const Logger = require('../logging/logger');
const browserConfig = require('../configuration/browserConfig.json');

class Browser{
    #driver;
    
    async init(){
        Logger.logInfo('Driver init');
        let chromeOptions = new chrome.Options();
        let firefoxOptions = new firefox.Options();
        chromeOptions.addArguments(browserConfig.capabilities['goog:chromeOptions'].args);
        for(let pref of browserConfig.capabilities['goog:chromeOptions'].userPreferences){
            chromeOptions.setUserPreferences(pref);
        }
        for(let option of browserConfig.capabilities['moz:firefoxOptions'].args){
            firefoxOptions.addArguments(option)
        }
        for(let pref of browserConfig.capabilities['moz:firefoxOptions'].userPreferences){
            for(let key in pref){
                firefoxOptions.setPreference(key, pref[key]);
            }
        }        
        this.#driver = await new Builder().forBrowser(browserConfig.capabilities.browserName)
            .setChromeOptions(chromeOptions)
            .setFirefoxOptions(firefoxOptions)
            .build();
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

    async getElement(locator, name){
        Logger.logInfo(`Getting element "${name}" with locator: ${locator}`);
        await this.#driver.wait(until.elementLocated(locator));
        return this.#driver.findElement(locator);
    }

    async switchToIframe(frameElement, name){
        Logger.logInfo(`Switching to iframe "${name}"`);
        await this.#driver.switchTo().frame(frameElement);
    }

    async switchToPage(){
        Logger.logInfo('Switching to Page');
        await this.#driver.switchTo().defaultContent();
    }
}

module.exports = new Browser();