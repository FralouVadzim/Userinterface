const {By} = require('selenium-webdriver');
const BaseForm = require('../framework/forms/baseForm')
const Label = require('../framework/elements/label');
const Button = require('../framework/elements/button');
const leftPanelForm = require('./forms/leftPanelForm');
const TextBox = require('../framework/elements/textBox');

class UploadAndDownloadPage extends BaseForm{
    
    constructor(){
        super(new Label(By.xpath(`//*[@class="main-header" and text()="Upload and Download"]`), 'Header label Upload and Download'), 'Upload and Download page');
        this._leftPanelForm = leftPanelForm;
    }

    get leftPanelForm(){
        return this._leftPanelForm;
    }

    #buttonDownload = new Button(By.id('downloadButton'), 'Download button');

    #textBoxUpload = new TextBox(By.id('uploadFile'), 'Upload textBox');

    #labelUploadedFile = new Label(By.id('uploadedFilePath'), 'Uploaded file path label')

    async clickDownload(){
        return this.#buttonDownload.click();        
    }

    async uploadFile(path){
        return this.#textBoxUpload.sendKeys(path);        
    }

    async getUploadedFilePath(){
        await this.#labelUploadedFile.waitUntilElementIsVisible();
        return this.#labelUploadedFile.getText();
    }    
}

module.exports = new UploadAndDownloadPage();