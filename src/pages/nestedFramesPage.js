const {By} = require('selenium-webdriver');
const BaseForm = require('../framework/forms/baseForm')
const Label = require('../framework/elements/label');
const leftPanelForm = require('./forms/leftPanelForm');
const browser = require('../framework/browsers/browser');

class NestedFramesPage extends BaseForm{
    
    constructor(){
        super(new Label(By.xpath(`//*[@class="main-header" and text()="Nested Frames"]`), 'Header label nested frames'), 'Nested frames page');
        this._leftPanelForm = leftPanelForm;
    }

    get leftPanelForm(){
        return this._leftPanelForm;
    }

    #labelFrameBody = new Label(By.css('body'), 'Body');

    #parentFrameId = 'frame1';

    #childFrameIndex = 0;

    async getTextFromParentFrame(){
        await browser.switchToIframe(this.#parentFrameId);
        const textToCompare = await this.#labelFrameBody.getText();
        await browser.switchToPage();
        return textToCompare;
    }

    async getTextFromChildFrame(){
        await browser.switchToIframe(this.#parentFrameId);
        await browser.switchToIframe(this.#childFrameIndex);
        const textToCompare = await this.#labelFrameBody.getText();
        await browser.switchToPage();
        return textToCompare;
    }
}

module.exports = new NestedFramesPage();