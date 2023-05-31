const assertChai = require('chai').assert;
const config = require('../config/config.json');
const testData = require('../testData/testData.json');
const browser = require('../framework/browsers/browser');
const homePage = require('../pages/homePage');
const alertsFrameWindowsPage = require('../pages/alertsFrameWindowsPage');
const alertsPage = require('../pages/alertsPage');
const StringUtils = require('../framework/utils/stringUtils');
const nestedFramesPage = require('../pages/nestedFramesPage');
const framesPage = require('../pages/framesPage');
const elementsPage = require('../pages/elementsPage');
const webTablesPage = require('../pages/webTablesPage');
const registrationForm = require('../pages/forms/registrationForm');
const users = require('../testData/users.json');
const browserWindowsPage = require('../pages/browserWindowsPage');
const samplePage = require('../pages/samplePage');
const linksPage = require('../pages/linksPage');
const widgetsPage = require('../pages/widgetsPage');
const sliderPage = require('../pages/sliderPage');
const progressBarPage = require('../pages/progressBarPage');
const datePickerPage = require('../pages/datePickerPage');
const uploadAndDownloadPage = require('../pages/uploadAndDownloadPage');


describe('Userinterface suite', function(){

    beforeEach(async () =>{
        await browser.init();
    });

    afterEach(async () =>{
        // await browser.close();
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

    it.skip('Test case 4. Handles', async() =>{
        await browser.openUrl(config.startUrl);
        assertChai.isTrue(await homePage.isOpened(), 'Home page is not opened');
        homePage.clickAlertsFrameWindows();
        assertChai.isTrue(await alertsFrameWindowsPage.isOpened(), 'Alerts, Frame & Windows page is not opened');
        await alertsFrameWindowsPage.leftPanelForm.clickBrowserWindows();
        assertChai.isTrue(await browserWindowsPage.isOpened(), 'Browser windows page is not opened');
        await browserWindowsPage.clickNewTabButton();
        let windowHandles = await browser.getDriver().getAllWindowHandles();
        await browser.getDriver().switchTo().window(await windowHandles[1]);
        assertChai.isTrue(await samplePage.isOpened(), 'Sample page is not opened');
        await browser.closeWindow();
        await browser.getDriver().switchTo().window(await windowHandles[0]);
        assertChai.isTrue(await browserWindowsPage.isOpened(), 'Browser windows page is not opened');
        await browserWindowsPage.leftPanelForm.clickElements();
        await browserWindowsPage.leftPanelForm.clickLinks();
        assertChai.isTrue(await linksPage.isOpened(), 'Links page is not opened');
        await linksPage.clickHome();
        windowHandles = await browser.getDriver().getAllWindowHandles();
        await browser.getDriver().switchTo().window(await windowHandles[1]);
        assertChai.isTrue(await homePage.isOpened(), 'Home page is not opened');
        await browser.getDriver().switchTo().window(await windowHandles[0]);
        assertChai.isTrue(await linksPage.isOpened(), 'Links page is not opened');
    })

    it.skip('Test case 5. Slider, Progress bar', async() =>{
        await browser.openUrl(config.startUrl);
        assertChai.isTrue(await homePage.isOpened(), 'Home page is not opened');
        await homePage.clickWidgets();
        assertChai.isTrue(await widgetsPage.isOpened(), 'Widgets page is not opened');
        widgetsPage.leftPanelForm.clickSlider();
        assertChai.isTrue(await sliderPage.isOpened(), 'Slider page is not opened');
        const randomValue = StringUtils.getRandomIntInclusive(testData.MinValidSliderValue, testData.MaxValidSliderValue);
        await sliderPage.setSliderValueTo(randomValue);
        const sliderValue = await sliderPage.getSliderValue()
        assertChai.isTrue(randomValue === sliderValue, `Values do not match. Expected: ${randomValue}, Actual: ${sliderValue}`);
        sliderPage.leftPanelForm.clickProgressBar();
        assertChai.isTrue(await progressBarPage.isOpened(), 'Progress bar page is not opened');
        await progressBarPage.clickStartStopButton();
        await progressBarPage.clickStopWhenTheValueEqualsTo(testData.ProgressBarValue);
        const progressBarValue = await progressBarPage.getProgressBarValue();
        assertChai.isTrue((progressBarValue >= testData.ProgressBarValue - testData.ProgressBarMarginOfError)
            &&(progressBarValue <= testData.ProgressBarValue + testData.ProgressBarMarginOfError)
            , `Values do not match. Expected: ${testData.ProgressBarValue}, Actual: ${progressBarValue}`);
    })

    it.skip('Test case 6. Date picker', async() =>{
        await browser.openUrl(config.startUrl);
        assertChai.isTrue(await homePage.isOpened(), 'Home page is not opened');
        await homePage.clickWidgets();
        assertChai.isTrue(await widgetsPage.isOpened(), 'Widgets page is not opened');
        await widgetsPage.leftPanelForm.clickDatePicker();
        assertChai.isTrue(await datePickerPage.isOpened(), 'Date picker page is not opened');
        const currentDate = new Date();
        let dateFromSelectDate = StringUtils.cutFirstZero(await datePickerPage.getTextFromSelectDate());
        assertChai.isTrue(currentDate.toLocaleDateString() === dateFromSelectDate
            , `Values do not match. Expected: ${currentDate.toLocaleDateString()}, Actual: ${dateFromSelectDate}`);
        const currentDateFormated = currentDate.toLocaleDateString([], { month: 'long' }) + ' ' + 
            currentDate.toLocaleDateString([], { day: 'numeric' }) + ", "+ currentDate.toLocaleDateString("en-US", { year: 'numeric' })
            + " " + currentDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        const dateFromDateAndTime = await datePickerPage.getTextFromDateAndTime();
        assertChai.isTrue(currentDateFormated === dateFromDateAndTime
            , `Values do not match. Expected: ${currentDateFormated}, Actual: ${dateFromDateAndTime}`);
        const dateToPick = new Date(StringUtils.getNearestLeapYear(), testData.MonthToPick, testData.DateToPick)
        await datePickerPage.pickDate(dateToPick);
        dateFromSelectDate = StringUtils.cutFirstZero(await datePickerPage.getTextFromSelectDate());
        assertChai.isTrue(dateToPick.toLocaleDateString() === dateFromSelectDate
            , `Values do not match. Expected: ${dateToPick.toLocaleDateString()}, Actual: ${dateFromSelectDate}`);
    })

    it('Test case 7. Files. Uploading and downloading', async() =>{
        await browser.openUrl(config.startUrl);
        assertChai.isTrue(await homePage.isOpened(), 'Home page is not opened');
        await homePage.clickElements();
        assertChai.isTrue(await elementsPage.isOpened(), 'Elements page is not opened');
        await elementsPage.leftPanelForm.clickUploadAndDonload();
        assertChai.isTrue(await uploadAndDownloadPage.isOpened(), 'Elements page is not opened');

    })
})