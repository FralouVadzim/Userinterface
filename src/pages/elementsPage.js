const {By} = require('selenium-webdriver');
const BaseForm = require('../framework/forms/baseForm')
const Label = require('../framework/elements/label');
const Button = require('../framework/elements/button');
const leftPanelForm = require('./forms/leftPanelForm');

class ElementsPage extends BaseForm{
    
    constructor(){
        super(new Label(By.xpath(`//*[@class="main-header" and text()="Elements"]`), 'Header label elements'), 'Elements page');
        this._leftPanelForm = leftPanelForm;
    }

    get leftPanelForm(){
        return this._leftPanelForm;
    }
}

module.exports = new ElementsPage();