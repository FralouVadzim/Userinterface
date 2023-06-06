const {By} = require('selenium-webdriver');
const BaseForm = require('../framework/forms/baseForm')
const Label = require('../framework/elements/label');
const leftPanelForm = require('./forms/leftPanelForm');
const Button = require('../framework/elements/button');

class LinksPage extends BaseForm{
    
    constructor(){
        super(new Label(By.xpath(`//*[@class="main-header" and text()="Links"]`), 'Header label links'), 'Links page');
        this._leftPanelForm = leftPanelForm;
    }

    get leftPanelForm(){
        return this._leftPanelForm;
    }

    #buttonHome = new Button(By.id('simpleLink'), 'Home button');

    async clickHome(){
        return this.#buttonHome.click();
    }
}

module.exports = new LinksPage();