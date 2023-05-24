const Logger = require('../logging/logger');
const browser = require('../browsers/browser');

class BaseForm{
    constructor(uniqueElement, name){
        this.uniqueElement = uniqueElement;
        this.name = name;
    }
    
    async isOpened(){
        Logger.logInfo(`Check that page '${this.name}' is opened`);
        return this.uniqueElement.isPresent();
    }

    async _getListOfElementNames(locator){
        Logger.logInfo(`Getting list of element names`);
        let array = [];
        let listOfItems = await browser.getDriver().findElements(locator);
        for(let item of listOfItems){
            array.push(await item.getText());
        }
        return array;
    }
}

module.exports = BaseForm;