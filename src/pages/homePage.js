const {By} = require('selenium-webdriver');
const BaseForm = require('../framework/forms/baseForm')
const Label = require('../framework/elements/label');
const Button = require('../framework/elements/button');
const elementNames = require('./elementNames/elementNames-en.json');

class HomePage extends BaseForm{
    
    constructor(){
        super(new Label(By.className('category-cards'), 'Cards label'), 'Home page');
    }

    #buttonAlertsFrameWindows = this.#getButtonByName(elementNames.buttonAlertsFrameWindows);

    #buttonElements = this.#getButtonByName(elementNames.buttonElements);

    #buttonWidgets = this.#getButtonByName(elementNames.buttonWidgets);

    async clickAlertsFrameWindows(){
        return this.#buttonAlertsFrameWindows.click();
    }

    async clickElements(){
        return this.#buttonElements.click();
    }

    async clickWidgets(){
        return this.#buttonWidgets.click();
    }

    #getButtonByName(name){
        return new Button(By.xpath(`//*[text()="${name}"]/ancestor::div[@class="card mt-4 top-card"]`), `Button ${name}`);
    }
}

module.exports = new HomePage();