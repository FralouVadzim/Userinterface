const {By} = require('selenium-webdriver');
const BaseForm = require('../framework/forms/baseForm')
const Label = require('../framework/elements/label');
const Button = require('../framework/elements/button');
const leftPanelForm = require('./forms/leftPanelForm');

class BrowserWindowsPage extends BaseForm{
    
    constructor(){
        super(new Label(By.xpath(`//*[@class="main-header" and text()="Browser Windows"]`), 'Header label Browser Windows'), 'Browser windows page');
        this._leftPanelForm = leftPanelForm;
    }

    get leftPanelForm(){
        return this._leftPanelForm;
    }

    #buttonNewTab = new Button(By.id('tabButton'), 'New tab button');

    async clickNewTabButton(){
        return this.#buttonNewTab.click();
    }
}

module.exports = new BrowserWindowsPage();