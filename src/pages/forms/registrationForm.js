const {By} = require('selenium-webdriver');
const BaseForm = require('../../framework/forms/baseForm')
const Label = require('../../framework/elements/label');
const TextBox = require('../../framework/elements/textBox');
const Button = require('../../framework/elements/button');
const Logger = require('../../framework/logging/logger')

class RegistrationForm extends BaseForm{
    
    constructor(){
        super(new Label(By.id(`registration-form-modal`), 'Header label registration form'), 'Registation form');
    }

    #textBoxFirstName = new TextBox(By.id('firstName'), 'First name textBox');

    #textBoxLastName = new TextBox(By.id('lastName'), 'LastName textBox');

    #textBoxUserEmail = new TextBox(By.id('userEmail'), 'UserEmail textBox');

    #textBoxAge = new TextBox(By.id('age'), 'Age textBox');

    #textBoxSalary = new TextBox(By.id('salary'), 'Salary textBox');

    #textBoxDepartment = new TextBox(By.id('department'), 'Department textBox');

    #buttonSubmit = new Button(By.id('submit'), 'Submit button');

    async fillForm(userNumber, firstName, lastName, email, age, salary, department){
        Logger.logInfo(`Filling form for user ${userNumber}`);
        await this.#textBoxFirstName.sendKeys(firstName);
        await this.#textBoxLastName.sendKeys(lastName);
        await this.#textBoxUserEmail.sendKeys(email);
        await this.#textBoxAge.sendKeys(age);
        await this.#textBoxSalary.sendKeys(salary);
        return this.#textBoxDepartment.sendKeys(department);
    }

    async clickSubmitButton(){
        return this.#buttonSubmit.click();
    }    
}

module.exports = new RegistrationForm();