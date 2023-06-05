const {By} = require('selenium-webdriver');
const BaseForm = require('../framework/forms/baseForm')
const Label = require('../framework/elements/label');
const Button = require('../framework/elements/button');
const CheckBox = require('../framework/elements/checkBox');
const StringUtils = require('../framework/utils/stringUtils');

class Card2Page extends BaseForm{

    constructor(){
        super(new Label(By.className('avatar-and-interests__form'), 'Avatar and interests form label'), 'Card2Page page');
    }

    #buttonUpload = new Button(By.className('avatar-and-interests__upload-button'), 'Upload button');

    #checkBoxUselectAll = new CheckBox(By.xpath('//label[@for="interest_unselectall"]'), 'Unselect all checkbox');

    #buttonNext = new Button(By.xpath('//button[contains(text(),"Next")]'), 'Next button');

    async clickNext(){
        return this.#buttonNext.click();
    }

    async clickUpload(){
        return this.#buttonUpload.click();
    }

    async clickUnselectAll(){
        await this.#checkBoxUselectAll.scrollIntoView();
        return this.#checkBoxUselectAll.click();
    }

    async selectInterests(numberOfInterests){
        let checkBoxes = await this.#getCheckBoxes();
        while(numberOfInterests > 0){
            
            const randNumber = StringUtils.getRandomIntInclusive(0, checkBoxes.length);
            const checkbox = await checkBoxes[randNumber];
            const checkboxText = await checkbox.getText()
            if(await checkbox.isChecked() || checkboxText === "Select all" || checkboxText === "Unselect all"){
                continue;
            }
            await checkbox.check();
            numberOfInterests--;
        }
    }

    async #getCheckBoxes(){
        const checkBoxNames = await this._getListOfElementNames(By.className('avatar-and-interests__interests-list__item'));        
        let checkBoxes = [];
        for(let name of checkBoxNames){
            checkBoxes.push(new CheckBox(By.xpath(`//*[text()="${name}"]//ancestor::div[@class="avatar-and-interests__interests-list__item"]//label`), `${name} checkbox`));
        }
        return checkBoxes;
    }



}

module.exports = new Card2Page();