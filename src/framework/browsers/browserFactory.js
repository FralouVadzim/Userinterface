require('chromedriver');
require('geckodriver');
const {Builder} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const firefox = require('selenium-webdriver/firefox');
const Logger = require('../logging/logger');
const browserConfig = require('../configuration/browserConfig.json');

class BrowserFactory{
    
    async getBrowser(){
        Logger.logInfo('Driver init');
        switch(browserConfig.capabilities.browserName.toLowerCase()){
            case "chrome":
                let chromeOptions = new chrome.Options();
                chromeOptions.addArguments(browserConfig.capabilities['goog:chromeOptions'].args);
                for(let pref of browserConfig.capabilities['goog:chromeOptions'].userPreferences){
                    chromeOptions.setUserPreferences(pref);
                }
                return await new Builder().forBrowser(browserConfig.capabilities.browserName)
                    .setChromeOptions(chromeOptions)
                    .build();
                
            case "firefox":
                let firefoxOptions = new firefox.Options();
                for(let option of browserConfig.capabilities['moz:firefoxOptions'].args){
                    firefoxOptions.addArguments(option)
                }
                for(let pref of browserConfig.capabilities['moz:firefoxOptions'].userPreferences){
                    for(let key in pref){
                        firefoxOptions.setPreference(key, pref[key]);
                    }
                }        
                return await new Builder().forBrowser(browserConfig.capabilities.browserName)
                    .setFirefoxOptions(firefoxOptions)
                    .build();

            default:
                Logger.logError('Unknown browser');
        }
    }
}

module.exports = new BrowserFactory();