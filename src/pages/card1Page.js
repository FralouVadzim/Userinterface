const {By} = require('selenium-webdriver');
const BaseForm = require('../framework/forms/baseForm')
const Label = require('../framework/elements/label');
const Button = require('../framework/elements/button');
const TextBox = require('../framework/elements/textBox');
const ComboBox = require('../framework/elements/comboBox');
const StringUtils = require('../framework/utils/stringUtils');
const config = require('../config/config.json');

class Card1Page extends BaseForm{

    constructor(){
        super(new Label(By.className('login-form'), 'Login form label'), 'Card1Page page');
    }

    #textboxPassword = new TextBox(By.xpath('//div[@class="login-form__field-row"]//input'), 'Password textBox');

    #textboxEmail = new TextBox(By.xpath('//input[@placeholder="Your email"]'), 'Email textBox');

    #textboxDomain = new TextBox(By.xpath('//input[@placeholder="Domain"]'), 'Domain textBox');
    
    #comboboxDomainName = new ComboBox(By.className('dropdown__field'), 'Domain name comboBox');

    #domainNamesLocator = (By.className('dropdown__list-item'))
    

    async clickToDomainName(){
        return this.#comboboxDomainName.click();
    }

    async clickToPassword(){
        return this.#textboxPassword.click();
    }

    async typePassword(){
        let textbox = this.#textboxPassword
        await textbox.clear();
        const password = StringUtils.generateRandomString(config.numberOfRandomCharsForPass);
        return textbox.sendKeys(password);
    }

    async clickToEmail(){
        return this.#textboxEmail.click();
    }

    async typeEmail(){
        let textbox = this.#textboxEmail
        await textbox.clear();
        const password = StringUtils.generateRandomString(config.numberOfRandomCharsForEmail);
        return textbox.sendKeys(password);
    }

    async clickToDomain(){
        return this.#textboxDomain.click();
    }

    async typeDomain(){
        let textbox = this.#textboxDomain
        await textbox.clear();
        const password = StringUtils.generateRandomString(config.numberOfRandomCharsForDomain);
        return textbox.sendKeys(password);
    }

    async #getRandomDomainName(){
        let domains = await this._getListOfElementNames(this.#domainNamesLocator);
        await domains.shift();
        return domains[StringUtils.getRandomIntInclusive(0, domains.length)];
    }

}

module.exports = new Card1Page();