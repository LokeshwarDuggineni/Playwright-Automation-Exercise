const {test, expect} = require('../fixtures/testFixtures');
const contactData = require("../test-data/contactUsData.json");

test.beforeEach(async({page})=>{
    await page.goto("https://www.automationexercise.com/");
})

test("Test Case 6: Contact Us Form", async({page,contactUsPage, signupPage })=>{
    await signupPage.verifyHome();
    await contactUsPage.openContactUs();
    await contactUsPage.fillContactForm(contactData.name, contactData.email, contactData.subject, contactData.name);
    await contactUsPage.uploadFile(contactData.file);
    await page.on("dialog", async (dialog)=>{
        console.log(dialog.message());
        await dialog.accept();
        
    })
        await contactUsPage.submitForm();


    await expect(page.locator("#contact-page").getByText("Success! Your details have been submitted successfully.")).toBeVisible();
})