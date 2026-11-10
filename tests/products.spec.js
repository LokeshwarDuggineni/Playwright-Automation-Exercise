const { sign } = require('node:crypto');
const {test, expect} = require('../fixtures/testFixtures');
const productData = require("../test-data/productData.json");
const userData= require("../test-data/registerUserData.json");
const { ProductsPage } = require('../pages/ProductsPage');

test.beforeEach(async({page})=>{
    await page.goto("https://www.automationexercise.com/");
})
test.beforeEach(async ({ page }) => {
    await page.route('**/*', async (route) => {
        const url = route.request().url();

        if (
            url.includes('doubleclick.net') ||
            url.includes('googlesyndication.com') ||
            url.includes('googleadservices.com')
        ) {
            await route.abort();
        } else {
            await route.continue();
        }
    });

    await page.goto('https://www.automationexercise.com/');
});
test("Test Case 8: Verify All Products and product detail page", async({page, productsPage, signupPage})=>{
    await signupPage.verifyHome();
    await signupPage.openProductsPage();
    await expect(page.getByText("ALL Products")).toBeVisible();
    await productsPage.verifyProducts();
    await productsPage.selectProduct(0);
    await expect(page).toHaveURL(/product_details/);
    await productsPage.verifyProductInfo();
    await productsPage.getProductDetails();
})

test("Test Case 9: Search Product", async({page, productsPage, signupPage})=>{
    await signupPage.verifyHome();
    await signupPage.openProductsPage();
    await expect(page).toHaveURL(/products/)
    await expect(page.getByText("ALL Products")).toBeVisible();
    await productsPage.verifyProducts();
    await productsPage.searchProduct(productData.product);
    await productsPage.verifyProductSearch(productData.product);
   
})

test("Test Case 12: Add Products in Cart", async ({productsPage, signupPage})=>{
    await signupPage.verifyHome();
    await signupPage.openProductsPage();
    await productsPage.addProductToCart(0);
    await productsPage.continueShopping();
    await productsPage.addProductToCart(1);
    await productsPage.clickViewCart();

    await productsPage.verifyCart();

    var productDetails = await productsPage.getProductPriceQuantity("Blue Top");
    expect(productDetails.price).toBe("Rs. 500")
    expect(productDetails.quantity).toBe("1")
    expect(productDetails.total).toBe("Rs. 500")

    productDetails= await productsPage.getProductPriceQuantity("Men Tshirt");
    expect(productDetails.price).toBe("Rs. 400")
    expect(productDetails.quantity).toBe("1")
    expect(productDetails.total).toBe("Rs. 400")

})

test("Test Case 13: Verify Product quantity in Cart", async ({productsPage, signupPage})=>{
    await signupPage.verifyHome();
    await signupPage.openProductsPage();
    await productsPage.addProductWithQuantity(0,4);
    await productsPage.clickViewCart();
    await productsPage.verifyProductQuantity(4);
})

test("Test Case 14: Place Order: Register while Checkout", async ({page,signupPage,productsPage})=>{
    await signupPage.verifyHome();
    await signupPage.openProductsPage();
    await productsPage.addProductWithQuantity(0,1);
    await productsPage.clickViewCart();
    await productsPage.verifyProductQuantity(1);
    await productsPage.clickProceedToCheckOut();
    await productsPage.clickRegisterLogin();
    await signupPage.startSignup(userData.name, `test${Date.now()}@gmail.com`);
    await signupPage.fillAccountInformation(userData);
    await signupPage.createAccount();

    await expect(page.getByText("Account Created!")).toBeVisible();
    await signupPage.clickContinue();

    await signupPage.verifyLoggedInUser(userData.name);
    await signupPage.openCart();
    await productsPage.clickProceedToCheckOut();
    await productsPage.verifyDeliveryAddress(userData);

    await productsPage.fillMessage();
    await productsPage.clickPlaceOrder();
    await productsPage.fillCardDetails(productData);
    await productsPage.payConfirmOrder();
    await signupPage.deleteAccount();
    await signupPage.clickContinue();
})

test("Test Case 17: Remove Products From Cart", async ({page, signupPage, productsPage})=>{
    await signupPage.verifyHome();
    await signupPage.openProductsPage();
    await productsPage.addProductToCart(0);
    await productsPage.clickViewCart();
    await productsPage.verifyRemoveProduct("Blue Top");

})

test("Test Case 18: View Category Products", async ({page, signupPage, productsPage })=>{
    await signupPage.verifyHome();
    await signupPage.openProductsPage();
    await productsPage.selectCategory("Women","Dress");
    await productsPage.selectCategory("Men","Tshirts")


})