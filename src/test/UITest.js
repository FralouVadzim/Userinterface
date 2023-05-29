const assertChai = require('chai').assert;
const config = require('../config/config.json');
const testData = require('../testData/testData.json');
const browser = require('../framework/browsers/browser');
const homePage = require('../pages/homePage');
const alertsFrameWindowsPage = require('../pages/alertsFrameWindowsPage');
const alertsPage = require('../pages/alertsPage');
const StringUtils = require('../utils/stringUtils');
const nestedFramesPage = require('../pages/nestedFramesPage');
const framesPage = require('../pages/framesPage');
const elementsPage = require('../pages/elementsPage');
const webTablesPage = require('../pages/webTablesPage');
const registrationForm = require('../pages/forms/registrationForm');
const users = require('../testData/users.json');
const browserWindowsPage = require('../pages/browserWindowsPage');


describe('Userinterface suite', function(){

    beforeEach(async () =>{
        await browser.init();
    });

    afterEach(async () =>{
        await browser.close();
    });

    it.skip('Test case 1. Alerts', async () =>{        
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

    it.skip('Test case 2. Iframe', async() =>{
        await browser.openUrl(config.startUrl);
        assertChai.isTrue(await homePage.isOpened(), 'Home page is not opened');
        homePage.clickAlertsFrameWindows();
        assertChai.isTrue(await alertsFrameWindowsPage.isOpened(), 'Alerts, Frame & Windows page is not opened');
        await alertsFrameWindowsPage.leftPanelForm.clickNestedFrames();
        assertChai.isTrue(await nestedFramesPage.isOpened(), 'Nested Frames page is not opened');
        const textFromParentFrame = await nestedFramesPage.getTextFromParentFrame();
        const textFromChildFrame = await nestedFramesPage.getTextFromChildFrame();
        assertChai.isTrue(await textFromParentFrame === testData.parentFrametext,
            `Texts don't match.\nExpected: ${testData.parentFrametext}\nActual: ${await textFromParentFrame}`);
        assertChai.isTrue(await textFromChildFrame === testData.childIFrametext,
            `Texts don't match.\nExpected: ${testData.childIFrametext}\nActual: ${await textFromChildFrame}`);
        await nestedFramesPage.leftPanelForm.clickFrames();
        assertChai.isTrue(await framesPage.isOpened(), 'Frames page is not opened');
        const textFromFrame1 = await framesPage.getTextFromFrame1();
        const textFromFrame2 = await framesPage.getTextFromFrame2();
        assertChai.isTrue(await textFromFrame1 === await textFromFrame2,
            `Texts don't match.\nExpected: ${await textFromFrame1}\nActual: ${await textFromFrame2}`);        
    })
    

    users.forEach(({userNumber, firstName, lastName, email, age, salary, department}) => {
        it.skip(`Test case 3. Tables. User ${userNumber}`, async() =>{
            await browser.openUrl(config.startUrl);
            assertChai.isTrue(await homePage.isOpened(), 'Home page is not opened');
            await homePage.clickElements();
            assertChai.isTrue(await elementsPage.isOpened(), 'Elements page is not opened');
            await elementsPage.leftPanelForm.clickWebTables();
            assertChai.isTrue(await webTablesPage.isOpened(), 'Web Tables page is not opened');
            await webTablesPage.clickAddButton();
            assertChai.isTrue(await registrationForm.isOpened(), 'Registration form is not opened');
            await registrationForm.fillForm(userNumber, firstName, lastName, email, age, salary, department);
            await registrationForm.clickSubmitButton();
            assertChai.isFalse(await registrationForm.isClosed(), 'Registration form is opened');
            const tableDataBeforeRemove = await webTablesPage.getGridText();
            assertChai.isTrue(await tableDataBeforeRemove.includes(firstName), `Table doesn't include first name "${firstName}" for user ${userNumber}`);
            assertChai.isTrue(await tableDataBeforeRemove.includes(lastName), `Table doesn't include last name "${lastName}" for user ${userNumber}`);
            assertChai.isTrue(await tableDataBeforeRemove.includes(email), `Table doesn't include email "${email}" for user ${userNumber}`);
            assertChai.isTrue(await tableDataBeforeRemove.includes(age), `Table doesn't include age "${age}" for user ${userNumber}`);
            assertChai.isTrue(await tableDataBeforeRemove.includes(salary), `Table doesn't include salary "${salary}" for user ${userNumber}`);
            assertChai.isTrue(await tableDataBeforeRemove.includes(department), `Table doesn't include department "${firstName}" for user ${userNumber}`);
            const numberOfRecordsBeforeRemove = await webTablesPage.getNumberOfRecords();
            await webTablesPage.clickDeleteRowForUserWithEmail(email);
            const numberOfRecordsAfterRemove = await webTablesPage.getNumberOfRecords();
            assertChai.isTrue(numberOfRecordsBeforeRemove != numberOfRecordsAfterRemove, 'Number of records in table has not changed');
            const tableDataAfterRemove = await webTablesPage.getGridText();
            assertChai.isFalse(await tableDataAfterRemove.includes(email), `Table includes record for user ${userNumber}`);
        })
    })

    it(`Test case 4. Handles`, async() =>{
        await browser.openUrl(config.startUrl);
        assertChai.isTrue(await homePage.isOpened(), 'Home page is not opened');
        homePage.clickAlertsFrameWindows();
        assertChai.isTrue(await alertsFrameWindowsPage.isOpened(), 'Alerts, Frame & Windows page is not opened');
        await alertsFrameWindowsPage.leftPanelForm.clickBrowserWindows();
        assertChai.isTrue(await browserWindowsPage.isOpened(), 'Browser windows page is not opened');
        await browserWindowsPage.clickNewTabButton();
    })
})