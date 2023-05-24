const {By} = require('selenium-webdriver');
const BaseForm = require('../framework/forms/baseForm')
const Label = require('../framework/elements/label');
const Button = require('../framework/elements/button');
const leftPanelForm = require('./forms/leftPanelForm');

class AlertsPage extends BaseForm{
    
    constructor(){
        super(new Label(By.id('javascriptAlertsWrapper'), 'Alerts form'), 'Alerts page');
        this._leftPanelForm = leftPanelForm;
    }

    #buttonShowSimpleAlert = new Button(By.id('alertButton'), 'Button show simple alert');

    #buttonShowAlertWithConfirm = new Button(By.id('confirmButton'), 'Button show alert with confirm');

    #buttonShowAlertWithPrompt = new Button(By.id('promtButton'), 'Button show alert with prompt');

    #labelAlertConfirmationResult = new Label(By.id('confirmResult'), 'Label alert confirmation result');

    #labelAlertPromptResult = new Label(By.id('promptResult'), 'Label alert prompt result');

    get leftPanelForm(){
        return this._leftPanelForm;
    }

    async clickShowSimpleAlertButton(){
        return this.#buttonShowSimpleAlert.click();
    }

    async clickShowAlertWithConfirmButton(){
        return this.#buttonShowAlertWithConfirm.click();
    }

    async clickShowAlertWithPromptButton(){
        return this.#buttonShowAlertWithPrompt.click();
    }

    async getTextFromLabelAfterAlertConfirmation(){
        return this.#labelAlertConfirmationResult.getText();
    }

    async getTextFromLabelAfterPromptIntoAlert(){
        return this.#labelAlertPromptResult.getText();
    }
}

module.exports = new AlertsPage();