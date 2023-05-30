const {By} = require('selenium-webdriver');
const BaseForm = require('../framework/forms/baseForm')
const Label = require('../framework/elements/label');
const Button = require('../framework/elements/button');
const leftPanelForm = require('./forms/leftPanelForm');
const KeyBoardUtils = require('../framework/utils/keyboardUtils');

class SliderPage extends BaseForm{
    
    constructor(){
        super(new Label(By.xpath(`//*[@class="main-header" and text()="Slider"]`), 'Header label slider'), 'Slider page');
        this._leftPanelForm = leftPanelForm;
    }

    get leftPanelForm(){
        return this._leftPanelForm;
    }

    #buttonSlider = new Button(By.xpath('//input[@type="range"]'), 'Button slider')

    #attributeValue = 'defaultValue';

    async clickSlider(){
        return this.#buttonSlider.click();
    }

    async setSliderValueTo(expectedValue){
        await this.clickSlider();
        let sliderValue = await this.getSliderValue();
        if(expectedValue === sliderValue){
            return;
        }
        else{
            let action;
            if(expectedValue > sliderValue){
                action = async () => await KeyBoardUtils.clickRight();
                
            }
            else{
                action = async() => await KeyBoardUtils.clickLeft();
            }
            do{
                action();
                sliderValue = await this.getSliderValue();
            }while(expectedValue != sliderValue);
        }
        return
    }

    async getSliderValue(){
        const value = await this.#buttonSlider.getAttribute(this.#attributeValue)
        return Number(value);
    }
    
}

module.exports = new SliderPage();