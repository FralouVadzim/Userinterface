const {By} = require('selenium-webdriver');
const BaseForm = require('../framework/forms/baseForm')
const Label = require('../framework/elements/label');
const Button = require('../framework/elements/button');
const leftPanelForm = require('./forms/leftPanelForm');

class WebTablesPage extends BaseForm{
    
    constructor(){
        super(new Label(By.xpath(`//*[@class="main-header" and text()="Web Tables"]`), 'Header label web tables'), 'Web tables page');
        this._leftPanelForm = leftPanelForm;
    }

    get leftPanelForm(){
        return this._leftPanelForm;
    }

    #addButton = new Button(By.id('addNewRecordButton'), "Add button");

    #gridLabel = new Label(By.className('rt-tbody'), 'Grid label');

    #recordLocator = '//*[@title="Delete"]/ancestor::div[@class="rt-tr-group"]';

    async clickAddButton(){
        return this.#addButton.click();
    }

    async getGridText(){
        return this.#gridLabel.getText();
    }

    async isAddButtonVisible(){
        return this.#addButton.isElementVisible(false);
    }

    async getNumberOfRecords(){
        const listWithRecord = await this._getListOfElementNames(By.xpath(this.#recordLocator));
        return listWithRecord.length;
    }

    async clickDeleteRowForUserWithEmail(email){
        const buttonDelete = new Button(By.xpath(`//div[contains(text(),"${email}")]/ancestor::div[@class="rt-tr-group"]//*[@title="Delete"]`), 'Delete button');
        return buttonDelete.click();
    }
}

module.exports = new WebTablesPage();