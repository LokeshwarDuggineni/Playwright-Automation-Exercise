const {test, expect} = require('../fixtures/testFixtures');

test.beforeEach(async({page})=>{
    await page.goto("https://www.automationexercise.com/");
})
test("Test Case 8: Verify All Products and product detail page", async({page, productsPage, signupPage})=>{
    await signupPage.verifyHome();
    await signupPage.openProductsPage();
    await expect(page).toHaveURL(/products/)
    await expect(page.getByText("ALL Products")).toBeVisible();
    await productsPage.verifyProducts();
    await productsPage.selectFirstProduct();
    await expect(page).toHaveURL(/product_details/);
    await productsPage.verifyProductInfo();
    await productsPage.getProductDetails();
})