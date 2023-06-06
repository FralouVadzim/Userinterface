const {By} = require('selenium-webdriver');
const Logger = require('../logging/logger');
const browser = require('../browsers/browser');
const timeouts = require('../configuration/timeouts.json');

class BaseForm{
    constructor(uniqueElement, name){
        this.uniqueElement = uniqueElement;
        this.name = name;
    }
    
    async isOpened(timeout = timeouts.timeoutSmall){
        Logger.logInfo(`Check that form '${this.name}' is opened`);
        if(timeout){            
            return this.uniqueElement.isElementLocatedAfterWait(timeout);
        }else{
            return this.uniqueElement.isPresent();
        }
    }

    async isClosed(){
        Logger.logInfo(`Check that form '${this.name}' is closed`);
        if(await this.uniqueElement.isElementLocatedAfterWait()){
            await this.uniqueElement.waitUntilElementIsBecomeStaleOrNotLocated();
        }
        return this.uniqueElement.isPresent();
    }

    // waitUntilFileExists(path, timeout=timeouts.timeoutMedium){
    //     Logger.logInfo(`Check if file '${path}' exists`);
    //     const result = Waits.checkIfFileExists(path, timeout);
    //     Logger.logInfo(`Result is ${result}`);
    //     return result;
    // }

    async _getListOfElementNames(locator){
        Logger.logInfo('Getting list of element names');
        let array = [];
        let listOfItems = await browser.getDriver().findElements(locator);
        for(let item of listOfItems){
            array.push(await item.getText());
        }
        return array;
    }

    async isElementWithTextPresent(text){
        Logger.logInfo(`Check that element with text "${text}" present`);
        let listOfElements = await browser.getDriver().findElements(By.xpath(`//*[contains(text(),"${text}")]`));
        const res =  listOfElements.length > 0;
        Logger.logInfo(`Result is ${res}`);
        return res;
    }
}

module.exports = BaseForm;