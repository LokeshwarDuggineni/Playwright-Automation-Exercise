const { expect } = require("@playwright/test");

class ProductsPage {
  constructor(page) {
    this.page = page;
    this.productsList = page.locator(".product-image-wrapper");
    this.productInfo = page.locator(".product-information");
    this.productName = this.productInfo.locator("h2");
    this.productCategory = this.productInfo.locator("p").filter({hasText:"Category"});
    // this.productPrice = this.productInfo.locator("span").filter({hasText:"Rs."});
    this.productAvailability = this.productInfo.locator("p").filter({ hasText: "Availability:" });
    this.productCondition = this.productInfo.locator("p").filter({ hasText: "Condition:" });
    this.productBrand = this.productInfo.locator("p").filter({ hasText: "Brand:" });
    this.productPrice = this.productInfo.locator("span").filter({hasText: /^Rs\./});
    this.searchField = page.getByPlaceholder("Search Product");
    this.searchIcon = page.locator("#submit_search");
    this.continueShoppingBtn = page.getByText("Continue Shopping");
    this.viewCartBtn = page.getByText("View Cart", { exact: true });
    this.cartTable= page.locator("#cart_info_table");
    this.quantityField = page.locator("#quantity");
    this.addToCartBtn=page.getByRole("button", {name:"Add to cart"});
    this.headers =  this.cartTable.locator(".cart_menu td");

  }

  async verifyProducts() {
    await expect(this.productsList.first()).toBeVisible();
    console.log(`Total products = ${await this.productsList.count()}`);
    
  }

  async selectProduct(productIndex) {
    await this.productsList
      .nth(productIndex)
      .getByRole("link", { name: "View Product" })
      .click();
  }

  async verifyProductInfo() {
    await expect(this.productName).toBeVisible();
    await expect(this.productCategory).toBeVisible();
    await expect(this.productPrice.first()).toBeVisible();
    await expect(this.productAvailability).toBeVisible();
    await expect(this.productCondition).toBeVisible();
    await expect(this.productBrand).toBeVisible();

  }
 async getProductDetails() {
    const name = await this.productName.innerText();
    const category = (await this.productCategory.innerText()).replace("Category:", "").trim();
    const price = await this.productPrice.first().innerText();
    const availability = (await this.productAvailability.innerText()).replace("Availability:", "").trim();
    const condition = (await this.productCondition.innerText()).replace("Condition:", "").trim();
    const brand = (await this.productBrand.innerText()).replace("Brand:", "").trim();
    

    const productDetails = {
        name,
        category,
        price,
        availability,
        condition,
        brand
    };

    console.log(productDetails);
    return productDetails;
}
  async searchProduct(product){
    await this.searchField.fill(product);
    await this.searchIcon.click();

  }

  async verifyProductSearch(product){
    await this.productsList.first().waitFor();
      const count = await this.productsList.count();
            
      for (let i = 0; i < count; i++) {
        await expect(this.productsList.nth(i).locator(".productinfo")).toContainText(new RegExp(product, "i"))
        
      }
  }

  async addProductToCart(procuctIndex){

    const product = await this.productsList.nth(procuctIndex);
    await product.hover();
    await product.getByText("Add to cart").last().click();
  }

  async continueShopping(){
    await this.continueShoppingBtn.click();

  }

  async clickViewCart(){
    await this.viewCartBtn.click();
  }

  async verifyCart(){
    await expect(this.cartTable).toBeVisible();


    await expect(this.cartTable.getByRole("row").filter({hasText:"Blue Top"})).toBeVisible();
    await expect(this.cartTable.getByRole("row").filter({hasText:"Men Tshirt"})).toBeVisible();

  }

  async getProductPriceQuantity(product){
    const row= this.cartTable.getByRole("row").filter({hasText:product});

    const headers = await this.headers.allInnerTexts();
    const priceHeader = headers.findIndex(header => header.trim() === "Price");
    const quantityHeader = headers.findIndex(header => header.trim() === "Quantity")
    const totalHeader = headers.findIndex(header => header.trim() === "Total")

    const cells = row.getByRole("cell");


    const price = await cells.nth(priceHeader).innerText();
    const quantity =await cells.nth(quantityHeader).innerText();
    const total =await cells.nth(totalHeader).innerText();


    return {
      price,
      quantity,
      total
    }
  }

  async addProductWithQuantity(productIndex,quantity){
    await this.selectProduct(productIndex);
    await this.quantityField.fill(String(quantity));
    await this.addToCartBtn.click();
  }

  async verifyProductQuantity(quantity){
    const row= await this.cartTable.getByRole("row").last();
    const headers = await this.headers.allInnerTexts();
   const quantityHeader = headers.findIndex(header => header.trim() === "Quantity")
   expect(row.getByRole("cell").nth(quantityHeader)).toHaveText(String(quantity));

  }
}

module.exports = { ProductsPage };
