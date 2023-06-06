const {By} = require('selenium-webdriver');
const BaseForm = require('../framework/forms/baseForm')
const Label = require('../framework/elements/label');

class SamplePage extends BaseForm{
    
    constructor(){
        super(new Label(By.id('sampleHeading'), 'Label sample header'), 'Sample page');
    }
}

module.exports = new SamplePage();