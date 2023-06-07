const Logger = require('../logging/logger');
const browser = require('../browsers/browser');
const BaseElement = require('./baseElement');

class CheckBox extends BaseElement{

    constructor(locator, name){
        super(locator, name);
    }

    async check(){
        Logger.logInfo(`Check "${this.name}"`);
        const el = await browser.getDriver().findElement(this.locator);
        if(!await el.isSelected()){
            return el.click();
        }else{
            Logger.logInfo(`"${this.name}" is already checked`);
        }
    }

    async uncheck(){
        Logger.logInfo(`Uncheck"${this.name}"`);
        const el = await browser.getDriver().findElement(this.locator);
        if(await el.isSelected()){
            return el.click();
        }else{
            Logger.logInfo(`"${this.name}" is already unchecked`);
        };
    }

    async isChecked(){
        Logger.logInfo(`Check that checkbox "${this.name} is checked"`);
        const el = await browser.getDriver().findElement(this.locator);
        let result = await el.isSelected();
        Logger.logInfo(`Result is ${result}`);
        return result;
    }
}

module.exports = CheckBox;