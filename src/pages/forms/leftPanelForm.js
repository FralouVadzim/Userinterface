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

    #buttonLinks = this.#getButtonByNameFromExpand(elementNames.buttonLinks, elementNames.buttonElements);

    #buttonElementsExpand = this.#getButtonExpandByName(elementNames.buttonElements);

    #buttonSlider = this.#getButtonByNameFromExpand(elementNames.buttonSlider, elementNames.buttonWidgets);

    #buttonProgressBar = this.#getButtonByNameFromExpand(elementNames.buttonProgressBar, elementNames.buttonWidgets);

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

    async clickElements(){
        return this.#buttonElementsExpand.click();
    }

    async clickLinks(){
        await this.#buttonLinks.waitUntilElementIsVisible();
        return this.#buttonLinks.click();
    }

    async clickSlider(){
        return this.#buttonSlider.click();
    }

    async clickProgressBar(){
        const button = this.#buttonProgressBar;
        await button.scrollIntoView()
        return button.click();
    }

    #getButtonByNameFromExpand(buttonName, expandName){
        return new Button(By.xpath(`//*[@class="header-text" and text()="${expandName}"]/ancestor::div[@class="element-group"]//*[text()="${buttonName}"]/ancestor::li`), `Button ${buttonName}`);
    }

    #getButtonExpandByName(expandName){
        return new Button(By.xpath(`//*[text()="${expandName}"]/ancestor::div[@class="element-group"]`), `Button ${expandName}`);
    }
}

module.exports = new leftPanelForm();