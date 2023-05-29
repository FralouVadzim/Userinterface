const {By} = require('selenium-webdriver');
const BaseForm = require('../../framework/forms/baseForm')
const Label = require('../../framework/elements/label');
const Button = require('../../framework/elements/button');
const elementNames = require('../elementNames/elementNames-en.json');

class leftPanelForm extends BaseForm{
    
    constructor(){
        super(new Label(By.className(`accordion`), 'Left panel'), 'Left panel form');
    }    

    #buttonAllerts = this.#getButtonByNameFromExpand(elementNames.buttonAlerts, elementNames.buttonAlertsFrameWindows);

    #buttonNestedFrames = this.#getButtonByNameFromExpand(elementNames.buttonNestedFrames, elementNames.buttonAlertsFrameWindows);

    #buttonFrames = this.#getButtonByNameFromExpand(elementNames.buttonFrames, elementNames.buttonAlertsFrameWindows);

    #buttonWebTables = this.#getButtonByNameFromExpand(elementNames.buttonWebTables, elementNames.buttonElements);

    #buttonBrowserWindows = this.#getButtonByNameFromExpand(elementNames.buttonBrowserWindows, elementNames.buttonAlertsFrameWindows);

    async clickAlerts(){
        return this.#buttonAllerts.click();
    }

    async clickNestedFrames(){
        return this.#buttonNestedFrames.click();
    }

    async clickFrames(){
        return this.#buttonFrames.click();
    }

    async clickWebTables(){
        return this.#buttonWebTables.click();
    }

    async clickBrowserWindows(){
        return this.#buttonBrowserWindows.click();
    }

    #getButtonByNameFromExpand(buttonName, expandName){
        return new Button(By.xpath(`//*[@class="header-text" and text()="${expandName}"]/ancestor::div[@class="element-group"]//*[text()="${buttonName}"]/ancestor::li`), `Button ${buttonName}`);
    }
}

module.exports = new leftPanelForm();