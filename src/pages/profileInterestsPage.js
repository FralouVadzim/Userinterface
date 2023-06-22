const {By} = require('selenium-webdriver');
const BaseForm = require('../framework/forms/baseForm')
const Label = require('../framework/elements/label');
const Button = require('../framework/elements/button');
const CheckBox = require('../framework/elements/checkBox');
const StringUtils = require('../framework/utils/stringUtils');

class ProfileInterestsPage extends BaseForm{

    constructor(){
        super(new Label(By.className('avatar-and-interests__form'), 'Avatar and interests form label'), 'Card2Page page');
    }

    #buttonUpload = new Button(By.className('avatar-and-interests__upload-button'), 'Upload button');
    #checkBoxUselectAll = new CheckBox(By.xpath('//label[@for="interest_unselectall"]'), 'Unselect all checkbox');    
    #labelCheckBoxes = new Label(By.className('avatar-and-interests__interests-list'), "List of checkboxes");
    #buttonNext = new Button(By.xpath('//button[contains(text(),"Next")]'), 'Next button');
    #checkboxNameSelect = 'Select all';
    #checkboxNameUnselect = 'Unselect all';

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
        let interests = await this.#getRandomInterests(numberOfInterests);
        for(let interest of interests){
            const checkbox = this.#getCheckboxByName(interest)
            await checkbox.check()
        }
    }

    async #getRandomInterests(count){
        await this.#labelCheckBoxes.waitUntilElementIsVisible();
        const interests =  await this.#labelCheckBoxes.getText();       
        const checkBoxNames = interests.split('\n');
        if(count > checkBoxNames.length && count < 1){
            throw new Error("Unexpected number of interests")
        }
        let checkBoxes = [];
        while(count != 0){
            const randNumber = StringUtils.getRandomIntInclusive(0, checkBoxNames.length - 1);
            const checkbox = checkBoxNames[randNumber];
            if(checkbox === this.#checkboxNameSelect || checkbox === this.#checkboxNameUnselect || checkBoxes.includes(checkbox)){
                    continue;
            }
            checkBoxes.push(checkbox);
            count--;
        }
        return checkBoxes;
    }

    #getCheckboxByName(name){
        return new CheckBox(By.xpath(`//*[text()="${name}"]//ancestor::div[@class="avatar-and-interests__interests-list__item"]//label`), `${name} checkbox`);
    }
}

module.exports = new ProfileInterestsPage();