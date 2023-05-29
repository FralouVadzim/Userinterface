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

    #parentFrameLocator = (By.id('frame1'));

    #childFrameLocator = (By.xpath('//iframe[@srcdoc="<p>Child Iframe</p>"]'));

    async getTextFromParentFrame(){
        await browser.switchToIframe(browser.getElement((this.#parentFrameLocator), "Parent frame"), "Parent frame");
        const element = await browser.getElement((By.css('body')), 'Body');
        const textToCompare = await element.getText();
        await browser.switchToPage();
        return textToCompare;
    }

    async getTextFromChildFrame(){
        await browser.switchToIframe(browser.getElement((this.#parentFrameLocator), "Parent frame"), "Parent frame");
        await browser.switchToIframe(browser.getElement((this.#childFrameLocator), "Child frame"), "Child frame");
        const element = await browser.getElement((By.css('body')), 'Body');
        const textToCompare = await element.getText();
        await browser.switchToPage();
        return textToCompare;
    }
}

module.exports = new NestedFramesPage();