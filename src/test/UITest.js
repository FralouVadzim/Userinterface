const assertChai = require('chai').assert;
const config = require('../config/config.json');
const testData = require('../testData/testData.json');
const browser = require('../framework/browsers/browser');
const homePage = require('../pages/homePage');
const card1Page = require('../pages/card1Page');


describe('Userinterface suite', function(){

    beforeEach(async () =>{
        await browser.init();
    });

    afterEach(async () =>{
        await browser.close();
    });

    it('Test case 1', async () =>{
        await browser.openUrl(config.startUrl);
        assertChai.isTrue(await homePage.isOpened(), 'Home page is not opened');
        await homePage.clickNextPageButton();
        assertChai.isTrue(await card1Page.isOpened(), 'Card 1 page is not opened');
        await card1Page.clickToPassword();
        await card1Page.typePassword();
        await card1Page.clickToEmail();
        await card1Page.typeEmail();
        await card1Page.clickToDomain();
        await card1Page.typeDomain();
    })
})