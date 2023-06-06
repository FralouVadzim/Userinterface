const {By} = require('selenium-webdriver');
const BaseForm = require('../framework/forms/baseForm')
const Label = require('../framework/elements/label');
const leftPanelForm = require('./forms/leftPanelForm');
const browser = require('../framework/browsers/browser');

class FramesPage extends BaseForm{
    
    constructor(){
        super(new Label(By.xpath(`//*[@class="main-header" and text()="Frames"]`), 'Header label frames'), 'Frames page');
        this._leftPanelForm = leftPanelForm;
    }

    get leftPanelForm(){
        return this._leftPanelForm;
    }

    #frame1Id = 'frame1';

    #frame2Id = 'frame2';

    #labelFrameBody = new Label(By.css('body'), 'Body');


    async getTextFromFrame1(){
        return this.#swithToFrameAndGetTextFromLabel(this.#frame1Id, this.#labelFrameBody);
    }

    async getTextFromFrame2(){
        return this.#swithToFrameAndGetTextFromLabel(this.#frame2Id, this.#labelFrameBody);
    }

    async #swithToFrameAndGetTextFromLabel(frameAttribute, element){
        await browser.switchToIframe(frameAttribute);
        const textToCompare = await element.getText();
        await browser.switchToPage();
        return textToCompare;
    }
}

module.exports = new FramesPage();