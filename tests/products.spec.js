const {test, expect} = require('../fixtures/testFixtures');
const productData = require("../test-data/productData.json")

test.beforeEach(async({page})=>{
    await page.goto("https://www.automationexercise.com/");
})
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