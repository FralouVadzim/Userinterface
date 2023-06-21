const assertChai = require('chai').assert;
const config = require('../config/config.json');
const testData = require('../testData/testData.json');
const browser = require('../framework/browsers/browser');
const homePage = require('../pages/homePage');
const loginPage = require('../pages/loginPage');
const profileInterestsPage = require('../pages/profileInterestsPage');
const personalDetailsPage = require('../pages/personalDetailsPage');
const UploadFile = require('../utils/uploadFile');
const StringUtils = require('../framework/utils/stringUtils')


describe('Userinterface suite', function(){

    const email = `${StringUtils.generateRandomCapitalString(config.numberOfRandomCharsForEmail)}${StringUtils.getRandomIntInclusive(0,9)}`;
    const password = `${email}${StringUtils.generateRandomString(config.numberOfRandomCharsForPass)}`;

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
        assertChai.isTrue(await loginPage.isOpened(), 'Login Page is not opened');
        await loginPage.clickToPassword();
        await loginPage.typePassword(password);
        await loginPage.clickToEmail();
        await loginPage.typeEmail(email);
        await loginPage.clickToDomain();
        await loginPage.typeDomain();
        await loginPage.selectDomainName();
        await loginPage.acceptTerms();
        await loginPage.clickNext();
        assertChai.isTrue(await profileInterestsPage.isOpened(), 'Profile interests page is not opened');
        await profileInterestsPage.clickUpload();
        await UploadFile.uploadImage();
        await profileInterestsPage.clickUnselectAll();
        await profileInterestsPage.selectInterests(testData.numberOfInterests);
        await profileInterestsPage.clickNext();
        assertChai.isTrue(await personalDetailsPage.isOpened(), 'Personal details page is not opened');
    })

    it('Test case 2', async () =>{
        await browser.openUrl(config.startUrl);
        assertChai.isTrue(await homePage.isOpened(), 'Home page is not opened');
        await homePage.clickNextPageButton();
        assertChai.isTrue(await loginPage.isOpened(), 'Login page is not opened');
        await loginPage.clickHideHelpForm();
        await loginPage.waitUntilHelpFormIsNotVisible();
        assertChai.isFalse(await loginPage.isHelpFormVisible(), 'Help form is not hidden');
    })

    it('Test case 3', async () =>{
        await browser.openUrl(config.startUrl);
        assertChai.isTrue(await homePage.isOpened(), 'Home page is not opened');
        await homePage.clickNextPageButton();
        assertChai.isTrue(await loginPage.isOpened(), 'Login page is not opened');
        await loginPage.acceptCookies();
        assertChai.isFalse(await loginPage.isCookiesFormVisible(), 'Cookies form is visible');
    })

    it('Test case 4', async () =>{
        await browser.openUrl(config.startUrl);
        assertChai.isTrue(await homePage.isOpened(), 'Home page is not opened');
        await homePage.clickNextPageButton();
        assertChai.isTrue(await loginPage.isOpened(), 'Login page is not opened');
        const timerValue = await loginPage.getTimerText();
        assertChai.equal(timerValue, testData.timersTime, `Timer values don't match.\nExpected:${testData.timersTime}\nActual:${timerValue}`);
    })
})