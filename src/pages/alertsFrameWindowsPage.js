const {By} = require('selenium-webdriver');
const BaseForm = require('../framework/forms/baseForm')
const Label = require('../framework/elements/label');
const elementNames = require('./elementNames/elementNames-en.json');
const leftPanelForm = require('./forms/leftPanelForm');

class AlertsFrameWindowsPage extends BaseForm{
    
    constructor(){
        super(new Label(By.xpath(`//*[@class="main-header" and text()="${elementNames.buttonAlertsFrameWindows}"]`), 'Header label'), 'Alerts, Frame & Windows page');
        this._leftPanelForm = leftPanelForm;
    }

    get leftPanelForm(){
        return this._leftPanelForm;
    }
}

module.exports = new AlertsFrameWindowsPage();