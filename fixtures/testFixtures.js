const {test:base, expect}= require('@playwright/test')
const {SignupPage} = require('../pages/SignupPage');
const {ContactUsPage} = require("../pages/ContactUsPage")
const {ProductsPage} = require("../pages/ProductsPage")

const test= base.extend(
    {
    signupPage : async ({page}, use)=>{
        const signupPage= new SignupPage(page);
        use(signupPage)
    },
    contactUsPage : async({page}, use)=>{
        const contactUsPage = new ContactUsPage(page);
        use(contactUsPage);
    },
    productsPage: async ({page}, use)=>{
        const productsPage = new ProductsPage(page);
        use(productsPage);
    }
})

module.exports ={test, expect};