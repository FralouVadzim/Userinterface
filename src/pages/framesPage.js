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

    #frame1Locator = (By.id('frame1'));

    #frame2Locator = (By.id('frame2'));

    async getTextFromFrame1(){
        await browser.switchToIframe(browser.getElement((this.#frame1Locator), 'Frame 1'), 'Frame 1"');
        const element = await browser.getElement((By.css('body')), 'Body');
        const textToCompare = await element.getText();
        await browser.switchToPage();
        return textToCompare;
    }

    async getTextFromFrame2(){
        await browser.switchToIframe(browser.getElement((this.#frame2Locator), 'Frame 2'), 'Frame 2"');
        const element = await browser.getElement((By.css('body')), 'Body');
        const textToCompare = await element.getText();
        await browser.switchToPage();
        return textToCompare;
    }
}

module.exports = new FramesPage();