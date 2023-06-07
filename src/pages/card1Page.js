const {By} = require('selenium-webdriver');
const BaseForm = require('../framework/forms/baseForm')
const Label = require('../framework/elements/label');
const Button = require('../framework/elements/button');
const TextBox = require('../framework/elements/textBox');
const ComboBox = require('../framework/elements/comboBox');
const CheckBox = require('../framework/elements/checkBox');
const StringUtils = require('../framework/utils/stringUtils');
const config = require('../config/config.json');
const timeouts = require('../framework/configuration/timeouts.json')

class Card1Page extends BaseForm{

    constructor(){
        super(new Label(By.className('login-form'), 'Login form label'), 'Card1Page page');
    }

    #textboxPassword = new TextBox(By.xpath('//div[@class="login-form__field-row"]//input'), 'Password textBox');

    #textboxEmail = new TextBox(By.xpath('//input[@placeholder="Your email"]'), 'Email textBox');

    #textboxDomain = new TextBox(By.xpath('//input[@placeholder="Domain"]'), 'Domain textBox');
    
    #comboboxDomainName = new ComboBox(By.className('dropdown__field'), 'Domain name comboBox');

    #checkBoxTerms = new CheckBox(By.className('checkbox__label'), "CheckBox terms and conditions");

    #buttonNextPage = new Button(By.xpath('//*[@class="button--secondary"]'), "Button next");

    #domainNamesXpath = '//div[@class="dropdown__list-item"]';

    #email = StringUtils.generateRandomCapitalString(config.numberOfRandomCharsForEmail) + StringUtils.getRandomIntInclusive(0,9);

    #password = this.#email + StringUtils.generateRandomString(config.numberOfRandomCharsForPass);

    #buttonHideHelpFrom = new Button(By.xpath('//div[@class="align__cell u-right"]//button'), 'Hide help form button');

    #labelHelpFormTitle = new Label(By.className('help-form__title'), 'Help form title label');

    #buttonAcceptCookies = new Button(By.xpath('//button[contains(text(),"Not")]'), 'Accept cookies button');

    #labelTimer = new Label(By.className('timer'), 'Timer label');

    #labelDomainNames =  new Label(By.className('dropdown__list'), 'Domain names label');

    async getTimerText(){
        return this.#labelTimer.getText();
    }

    async isCookiesFormVisible(){
        return this.#buttonAcceptCookies.isPresent(false);
    }

    async acceptCookies(){
        await this.#buttonAcceptCookies.waitUntilElementIsVisible();
        await this.#buttonAcceptCookies.click();
        return this.#buttonAcceptCookies.waitUntilElementIsBecomeStaleOrNotLocated();
    }

    async isHelpFormVisible(){
        return this.#labelHelpFormTitle.isElementVisible(false);
    }

    async waitUntilHelpFormIsNotVisible(){
        return this.#labelHelpFormTitle.waitUntilElementIsNotVisible(timeouts.timeoutMedium);
    }

    async clickHideHelpForm(){
        return this.#buttonHideHelpFrom.click();
    }
    
    async clickNext(){
        return this.#buttonNextPage.click();
    }
    async acceptTerms(){
        return this.#checkBoxTerms.check();
    }

    async clickToDomainName(){
        return this.#comboboxDomainName.click();
    }

    async selectDomainName(){
        const domainNamesString =  await this.#labelDomainNames.getText();       
        const ListOfDomainNames = domainNamesString.split('\n');
        return this.#comboboxDomainName.clickItem(By.xpath(`${this.#domainNamesXpath}[${StringUtils.getRandomIntInclusive(1, ListOfDomainNames.length)}]`))
    }

    async clickToPassword(){
        return this.#textboxPassword.click();
    }

    async typePassword(){
        const textbox = this.#textboxPassword;
        await textbox.clear();
        return textbox.sendKeys(this.#password);
    }

    async clickToEmail(){
        return this.#textboxEmail.click();
    }

    async typeEmail(){
        let textbox = this.#textboxEmail;
        await textbox.clear();
        return textbox.sendKeys(this.#email);
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
}

module.exports = new Card1Page();