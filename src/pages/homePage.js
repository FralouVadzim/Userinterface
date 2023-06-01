const {By} = require('selenium-webdriver');
const BaseForm = require('../framework/forms/baseForm')
const Label = require('../framework/elements/label');
const Button = require('../framework/elements/button');

class HomePage extends BaseForm{

    constructor(){
        super(new Label(By.className('start__paragraph'), 'Welcome text label'), 'Home page');
    }

    #buttonNextPage = new Button(By.className('start__link'), 'Next page button');

    async clickNextPageButton(){
        return this.#buttonNextPage.click();
    }
}

module.exports = new HomePage();