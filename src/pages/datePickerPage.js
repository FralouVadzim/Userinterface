const {By} = require('selenium-webdriver');
const BaseForm = require('../framework/forms/baseForm')
const Label = require('../framework/elements/label');
const leftPanelForm = require('./forms/leftPanelForm');
const Button = require('../framework/elements/button');
const TextBox = require('../framework/elements/textBox');
const ComboBox = require('../framework/elements/comboBox');

class DatePickerPage extends BaseForm{
    
    constructor(){
        super(new Label(By.xpath(`//*[@class="main-header" and text()="Date Picker"]`), 'Header label Date Picker'), 'Date Picker page');
        this._leftPanelForm = leftPanelForm;
    }

    get leftPanelForm(){
        return this._leftPanelForm;
    }

    #attributeValue = 'defaultValue';

    #textBoxSelectDate = new TextBox(By.id('datePickerMonthYearInput'), 'Select date textBox');

    #textBoxDateAndTime = new TextBox(By.id('dateAndTimePickerInput'), 'Date and time textBox');

    #labelDatePickerContainer = new Label(By.className('react-datepicker__month-container'), 'Date picker container label');

    #comboBoxYear = new ComboBox(By.className('react-datepicker__year-select'), 'Year comboBox')

    #comboBoxMonth = new ComboBox(By.className('react-datepicker__month-select'), 'Month comboBox')


    async getTextFromSelectDate(){
        const value = await this.#textBoxSelectDate.getAttribute(this.#attributeValue)
        return value;
    }

    async getTextFromDateAndTime(){
        const value = await this.#textBoxDateAndTime.getAttribute(this.#attributeValue)
        return value;
    }

    async pickDate(date){
        await this.#textBoxSelectDate.click();
        await this.#labelDatePickerContainer.waitUntilElementIsVisible();
        await this.#comboBoxYear.selectItemByVisibleText(date.getFullYear());
        await this.#comboBoxMonth.selectItemByVisibleText(date.toLocaleDateString([], { month: 'long' }));
        return this.#clickDate(date);
    }

    async #clickDate(date){
        let day = date.getDate()
        if(day < 10){
            day = `0${day}`
        }
        const button = new Button(By.xpath(`//*[@class="react-datepicker__day react-datepicker__day--0${day}"]`))
        return button.click();
    }
}

module.exports = new DatePickerPage();