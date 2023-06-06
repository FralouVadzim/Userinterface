const {By} = require('selenium-webdriver');
const BaseForm = require('../framework/forms/baseForm')
const Label = require('../framework/elements/label');
const leftPanelForm = require('./forms/leftPanelForm');

class WidgetsPage extends BaseForm{
    
    constructor(){
        super(new Label(By.xpath(`//*[@class="main-header" and text()="Widgets"]`), 'Header label widgets'), 'Widgets page');
        this._leftPanelForm = leftPanelForm;
    }

    get leftPanelForm(){
        return this._leftPanelForm;
    }    
}

module.exports = new WidgetsPage();