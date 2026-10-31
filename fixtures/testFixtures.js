const {test:base, expect}= require('@playwright/test')
const {SignupPage} = require('../pages/SignupPage');
const {ContactUsPage} = require("../pages/ContactUsPage")

const test= base.extend(
    {
    signupPage : async ({page}, use)=>{
        const signupPage= new SignupPage(page);
        use(signupPage)
    },
    contactUsPage : async({page}, use)=>{
        const contactUsPage = new ContactUsPage(page);
        use(contactUsPage);
    }
})

module.exports ={test, expect};