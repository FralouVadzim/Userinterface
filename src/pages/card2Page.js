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
    
    #labelCheckBoxes = new Label(By.className('avatar-and-interests__interests-list'), "List of checkboxes");

    #buttonNext = new Button(By.xpath('//button[contains(text(),"Next")]'), 'Next button');

    #checkboxNameSelect = 'Select all';

    #checkboxNameUnselect = 'Unelect all';

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
            
            const randNumber = StringUtils.getRandomIntInclusive(0, checkBoxes.length - 1);
            const checkbox = checkBoxes[randNumber];
            if(checkbox.name === this.#checkboxNameSelect || checkbox.name === this.#checkboxNameUnselect || await checkbox.element.isChecked()){
                continue;
            }
            await checkbox.element.check();
            checkBoxes.splice(randNumber, 1);
            numberOfInterests--;
        }
    }

    async #getCheckBoxes(){
        await this.#labelCheckBoxes.waitUntilElementIsVisible();
        const interests =  await this.#labelCheckBoxes.getText();       
        const checkBoxNames = interests.split('\n');
        let checkBoxes = [];
        for(let name of checkBoxNames){
            checkBoxes.push({name: name, element: new CheckBox(By.xpath(`//*[text()="${name}"]//ancestor::div[@class="avatar-and-interests__interests-list__item"]//label`), `${name} checkbox`)})
        }
        return checkBoxes;
    }
}

module.exports = new Card2Page();