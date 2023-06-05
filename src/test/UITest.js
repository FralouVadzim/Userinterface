const assertChai = require('chai').assert;
const config = require('../config/config.json');
const testData = require('../testData/testData.json');
const browser = require('../framework/browsers/browser');
const homePage = require('../pages/homePage');
const card1Page = require('../pages/card1Page');
const card2Page = require('../pages/card2Page');
const card3Page = require('../pages/card3Page');
const UploadFile = require('../utils/uploadFile');


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
        await card1Page.selectDomainName();
        await card1Page.acceptTerms();
        await card1Page.clickNext();
        assertChai.isTrue(await card2Page.isOpened(), 'Card 2 page is not opened');
        await card2Page.clickUpload();
        await UploadFile.uploadImage();
        await card2Page.clickUnselectAll();
        await card2Page.selectInterests(testData.numberOfInterests);
        await card2Page.clickNext();
        assertChai.isTrue(await card3Page.isOpened(), 'Card 3 page is not opened');
    })

    it('Test case 2', async () =>{
        await browser.openUrl(config.startUrl);
        assertChai.isTrue(await homePage.isOpened(), 'Home page is not opened');
        await homePage.clickNextPageButton();
        assertChai.isTrue(await card1Page.isOpened(), 'Card 1 page is not opened');
        await card1Page.clickHideHelpForm();
        assertChai.isFalse(await card1Page.isHelpFormVisible(), 'Help form is not hidden');
    })

    it('Test case 3', async () =>{
        await browser.openUrl(config.startUrl);
        assertChai.isTrue(await homePage.isOpened(), 'Home page is not opened');
        await homePage.clickNextPageButton();
        assertChai.isTrue(await card1Page.isOpened(), 'Card 1 page is not opened');
        await card1Page.acceptCookies();
        assertChai.isFalse(await card1Page.isCookiesFormVisible(), 'Cookies form is visible');
    })

    it('Test case 4', async () =>{
        await browser.openUrl(config.startUrl);
        assertChai.isTrue(await homePage.isOpened(), 'Home page is not opened');
        await homePage.clickNextPageButton();
        assertChai.isTrue(await card1Page.isOpened(), 'Card 1 page is not opened');
        const timerValue = await card1Page.getTimerText();
        assertChai.isTrue(timerValue === testData.timersTime, `Timer values don't match.\nExpected:${testData.timersTime}\nActual:${timerValue}`);
    })
})