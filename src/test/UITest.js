const assertChai = require('chai').assert;
const config = require('../config/config.json');
const testData = require('../testData/testData.json');
const browser = require('../framework/browsers/browser');
const homePage = require('../pages/homePage');
const alertsFrameWindowsPage = require('../pages/alertsFrameWindowsPage');
const alertsPage = require('../pages/alertsPage');
const StringUtils = require('../utils/stringUtils');


describe('Userinterface suite', function(){

    beforeEach(async () =>{
        await browser.init();
    });

    afterEach(async () =>{
        await browser.close();
    });

    it('Testcase 1', async () =>{        
        await browser.openUrl(config.startUrl);
        assertChai.isTrue(await homePage.isOpened(), 'Home page is not opened');
        homePage.clickAlertsFrameWindows();
        assertChai.isTrue(await alertsFrameWindowsPage.isOpened(), 'Alerts, Frame & Windows page is not opened');
        alertsFrameWindowsPage.leftPanelForm.clickAlerts();
        assertChai.isTrue(await alertsPage.isOpened(), 'Alerts page is not opened');
        await alertsPage.clickShowSimpleAlertButton();
        assertChai.isTrue(await browser.isAlertPresent(), 'Alert is not present');
        let textFromAlert = await browser.getTextFromAlert()
        assertChai.isTrue(await textFromAlert=== testData.alertText1,
            `Texts don't match.\nExpected: ${testData.alertText1}\nActual: ${await textFromAlert}`);
        await browser.acceptAlert();
        assertChai.isFalse(await browser.isAlertPresent(), 'Alert is present');
        await alertsPage.clickShowAlertWithConfirmButton();
        assertChai.isTrue(await browser.isAlertPresent(), 'Alert is not present');
        textFromAlert = await browser.getTextFromAlert();
        assertChai.isTrue(await textFromAlert === testData.alertText2,
             `Texts don't match.\nExpected: ${testData.alertText2}\nActual: ${await textFromAlert}`);
        await browser.acceptAlert();
        assertChai.isFalse(await browser.isAlertPresent(), 'Alert is present');
        const textFromLabelAfterAlertConfirmation = await alertsPage.getTextFromLabelAfterAlertConfirmation();
        assertChai.isTrue(await textFromLabelAfterAlertConfirmation === testData.textAfterAlertConfirmation,
            `Texts don't match.\nExpected: ${testData.textAfterAlertConfirmation}\nActual: ${await textFromLabelAfterAlertConfirmation}`);
        await alertsPage.clickShowAlertWithPromptButton();
        const randomString = StringUtils.generateRandomString(testData.numberOfCharsForRandomAlertString);
        assertChai.isTrue(await browser.isAlertPresent(), 'Alert is not present');
        textFromAlert = await browser.getTextFromAlert();
        assertChai.isTrue(await textFromAlert === testData.alertText3,
            `Texts don't match.\nExpected: ${testData.alertText3}\nActual: ${await textFromAlert}`);
        await browser.sendKeysToAlert(randomString);
        await browser.acceptAlert();
        const textFromLabelAfterPromptIntoAlert = await alertsPage.getTextFromLabelAfterPromptIntoAlert();
        assertChai.isTrue(await textFromLabelAfterPromptIntoAlert === `${testData.textAfterPromptIntoAlert}${randomString}`,
            `Texts don't match.\nExpected: ${testData.textAfterPromptIntoAlert}${randomString}\nActual: ${await textFromLabelAfterPromptIntoAlert}`);

    })

    it.skip('Testcase 2', async() =>{
    })

    it.skip('Testcase 3', async() =>{
    })
})