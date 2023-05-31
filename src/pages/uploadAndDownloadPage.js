const {By} = require('selenium-webdriver');
const BaseForm = require('../framework/forms/baseForm')
const Label = require('../framework/elements/label');
const Button = require('../framework/elements/button');
const leftPanelForm = require('./forms/leftPanelForm');
const KeyBoardUtils = require('../framework/utils/keyboardUtils');

class UploadAndDownloadPage extends BaseForm{
    
    constructor(){
        super(new Label(By.xpath(`//*[@class="main-header" and text()="Upload and Download"]`), 'Header label Upload and Download'), 'Upload and Download page');
        this._leftPanelForm = leftPanelForm;
    }

    get leftPanelForm(){
        return this._leftPanelForm;
    }
    
}

module.exports = new UploadAndDownloadPage();