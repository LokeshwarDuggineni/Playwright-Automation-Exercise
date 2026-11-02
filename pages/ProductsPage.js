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
  }

  async verifyProducts() {
    await expect(this.productsList.first()).toBeVisible();
    console.log(`Total products = ${await this.productsList.count()}`);
    
  }

  async selectFirstProduct() {
    await this.productsList
      .first()
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
}

module.exports = { ProductsPage };
