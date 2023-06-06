const {By} = require('selenium-webdriver');
const BaseForm = require('../framework/forms/baseForm')
const Label = require('../framework/elements/label');
const leftPanelForm = require('./forms/leftPanelForm');

class AlertsFrameWindowsPage extends BaseForm{
    
    constructor(){
        super(new Label(By.xpath(`//*[@class="main-header" and text()="Alerts, Frame & Windows"]`), `Header label Alerts, Frame & Windows`), 'Alerts, Frame & Windows page');
        this._leftPanelForm = leftPanelForm;
    }

    get leftPanelForm(){
        return this._leftPanelForm;
    }
}

module.exports = new AlertsFrameWindowsPage();