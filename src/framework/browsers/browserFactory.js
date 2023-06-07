require('chromedriver');
require('geckodriver');
const {Builder} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const firefox = require('selenium-webdriver/firefox');
const Logger = require('../logging/logger');
const browserConfig = require('../configuration/browserConfig.json');

class BrowserFactory{

    #chrome = 'chrome';

    #firefox = 'firefox';
    
    async getBrowser(){
        Logger.logInfo('Driver init');
        const browser = browserConfig.capabilities.browserName.toLowerCase();
        switch(browser){
            case this.#chrome:
                let chromeOptions = new chrome.Options();
                chromeOptions.addArguments(browserConfig.capabilities['goog:chromeOptions'].args);
                for(let pref of browserConfig.capabilities['goog:chromeOptions'].userPreferences){
                    chromeOptions.setUserPreferences(pref);
                }
                return new Builder().forBrowser(browser)
                    .setChromeOptions(chromeOptions)
                    .build();
                
            case this.#firefox:
                let firefoxOptions = new firefox.Options();
                for(let option of browserConfig.capabilities['moz:firefoxOptions'].args){
                    firefoxOptions.addArguments(option)
                }
                for(let pref of browserConfig.capabilities['moz:firefoxOptions'].userPreferences){
                    for(let key in pref){
                        firefoxOptions.setPreference(key, pref[key]);
                    }
                }        
                return new Builder().forBrowser(browser)
                    .setFirefoxOptions(firefoxOptions)
                    .build();

            default:
                Logger.logError('Unknown browser');
                throw new Error(`The specified browser '${browser}' is not defined`)
        }
    }
}

module.exports = new BrowserFactory();