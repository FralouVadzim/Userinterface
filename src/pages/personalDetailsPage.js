const {By} = require('selenium-webdriver');
const BaseForm = require('../framework/forms/baseForm')
const Label = require('../framework/elements/label');

class Card3Page extends BaseForm{

    constructor(){
        super(new Label(By.className('personal-details'), 'Personal detales form label'), 'Card3Page page');
    }
}

module.exports = new Card3Page();