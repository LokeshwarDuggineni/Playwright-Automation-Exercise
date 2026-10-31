const {test, expect} = require('../fixtures/testFixtures');
const userData = require("../test-data/registerUserData.json");

test.beforeEach(async({page})=>{
    await page.goto("https://www.automationexercise.com/");
})

test("Test Case 1: Register User", async ({ page, signupPage }) => {

  await expect(page.getByRole("link", { name: " Home" })).toBeVisible();

  await signupPage.openSignupPage();

  await expect(page.getByText("New User Signup!")).toBeVisible();

  await signupPage.startSignup(userData.name, `test${Date.now()}@example.com`);

  await expect(page.getByText("Enter Account Information")).toBeVisible();
  await signupPage.fillAccountInformation(userData);

  await signupPage.createAccount();

  await expect(page.getByText("Account Created!")).toBeVisible();


  await page.getByRole("link", { name: "Continue" }).click();
  await expect(page.locator("b")).toContainText("Test");
  await page.getByRole("link", { name: " Delete Account" }).click();
  await expect(page.getByText("Account Deleted!")).toBeVisible();
});


test("Test Case 2: Login User with correct email and password", async ({page,signupPage})=>{
    await signupPage.verifyHome();    
    await signupPage.openSignupPage();
       
    await signupPage.login(userData.validEmail, userData.validPassword);
    await signupPage.verifyLoggedInUser(userData.name)
})

test("Test Case 3: Login User with incorrect email and password", async ({page, signupPage})=>{
    await signupPage.verifyHome();
    await signupPage.openSignupPage();
    await signupPage.login(userData.invalidEmail, userData.invalidPassword);
    await expect(page.getByText("Your email or password is incorrect!")).toBeVisible();

})

test("Test Case 4: Logout User", async ({page,signupPage})=>{
    await signupPage.verifyHome();    
    await signupPage.openSignupPage();
       
    await signupPage.login(userData.validEmail, userData.validPassword);
    await signupPage.verifyLoggedInUser(userData.name)
    await signupPage.logout();
    await expect(page.getByText("Login to your account")).toBeVisible();
})

test("Test Case 5: Register User with existing email", async ({page, signupPage})=>{
    await signupPage.verifyHome();
    await signupPage.openSignupPage();
    await signupPage.startSignup(userData.name, userData.validEmail);
    await expect(page.getByText("Email Address already exist!")).toBeVisible();
    
})
