const {By} = require('selenium-webdriver');
const BaseForm = require('../../framework/forms/baseForm')
const Label = require('../../framework/elements/label');
const Button = require('../../framework/elements/button');
const elementNames = require('../elementNames/elementNames-en.json');

class AlertsFrameWindows extends BaseForm{
    
    constructor(){
        super(new Label(By.className(`accordion`), 'Left panel'), 'Left panel form');
    }    

    #buttonAllerts = this.#getButtonByNameFromExpand(elementNames.buttonAlerts, elementNames.buttonAlertsFrameWindows);

    clickAlerts(){
        return this.#buttonAllerts.click();
    }

    #getButtonByNameFromExpand(buttonName, expandName){
        return new Button(By.xpath(`//*[@class="header-text" and text()="${expandName}"]/ancestor::div[@class="element-group"]//*[text()="${buttonName}"]/ancestor::li`), `Button ${buttonName}`);
    }
}

module.exports = new AlertsFrameWindows();