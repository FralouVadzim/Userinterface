const {By} = require('selenium-webdriver');
const BaseForm = require('../framework/forms/baseForm')
const Label = require('../framework/elements/label');
const Button = require('../framework/elements/button');
const leftPanelForm = require('./forms/leftPanelForm');
const KeyBoardUtils = require('../framework/utils/keyboardUtils');
const browser = require('../framework/browsers/browser');
const StringUtils = require('../framework/utils/stringUtils');

class ProgressBar extends BaseForm{
    
    constructor(){
        super(new Label(By.xpath(`//*[@class="main-header" and text()="Progress Bar"]`), 'Header label Progress Bar'), 'Progress Bar page');
        this._leftPanelForm = leftPanelForm;
    }

    get leftPanelForm(){
        return this._leftPanelForm;
    }

    #buttonStartStop = new Button(By.id('startStopButton'), 'Start and Stop button');

    #labelProgressBar = new Label(By.id('progressBar'), 'Progress bar');

    async clickStartStopButton(){
        this.#buttonStartStop.hover();
        return this.#buttonStartStop.click();
    }

    async clickStopWhenTheValueEqualsTo(value){
        while(await this.getProgressBarValue() != value){
            continue;
        }
        return this.clickStartStopButton();
    }

    async getProgressBarValue(){
        const value = await this.#labelProgressBar.getText();
        const number = StringUtils.getDigitsFromText(value);
        return number;
    }
}

module.exports = new ProgressBar();