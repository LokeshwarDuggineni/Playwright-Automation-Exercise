const { expect } = require("@playwright/test");

class SignupPage {
    constructor(page) {
        this.page = page;

        this.signupLoginLink = page.getByRole('link', {
            name: 'Signup / Login'
        });

        this.signupName = page.locator('[data-qa="signup-name"]');
        this.signupEmail = page.locator('[data-qa="signup-email"]');
        this.signupButton = page.getByRole('button', {
            name: 'Signup'
        });

        this.password = page.locator('[data-qa="password"]');
        this.firstName = page.locator('[data-qa="first_name"]');
        this.lastName = page.locator('[data-qa="last_name"]');
        this.address = page.locator('[data-qa="address"]');
        this.state = page.locator('[data-qa="state"]');
        this.city = page.locator('[data-qa="city"]');
        this.zipcode = page.locator('[data-qa="zipcode"]');
        this.mobileNumber = page.locator('[data-qa="mobile_number"]');

        this.createAccountButton = page.getByRole('button', {
            name: 'Create Account'
        });

        this.loginEmail = page.locator("[data-qa='login-email']");
        this.loginPassword = page.locator("[data-qa='login-password']");
        this.loginBtn = page.locator("[data-qa='login-button']");
        this.home= page.getByRole("link", { name: " Home" });
        this.logoutBtn = page.getByRole("link",{name:" Logout"});
        this.testcasesPage = page.locator(".navbar-nav").getByRole("link",{name:" Test Cases"});

    }

    async openSignupPage() {
        await this.signupLoginLink.click();
    }

    async startSignup(name, email) {
        await this.signupName.fill(name);
        await this.signupEmail.fill(email);
        await this.signupButton.click();
    }

    async fillAccountInformation(data) {
        await this.page.locator("input[value='Mr']").check();
        await this.password.fill(data.password);

        await this.page.locator("select[name='days']")
            .selectOption(data.day);
        await this.page.locator("select[name='months']")
            .selectOption(data.month);
        await this.page.locator("select[name='years']")
            .selectOption(data.year);

        await this.page.locator("input[name='newsletter']").check();
        await this.page.getByLabel(
            'Receive special offers from our partners!'
        ).check();

        await this.firstName.fill(data.firstName);
        await this.lastName.fill(data.lastName);
        await this.address.fill(data.address);
        await this.state.fill(data.state);
        await this.city.fill(data.city);
        await this.zipcode.fill(data.zipcode);
        await this.mobileNumber.fill(data.mobileNumber);
    }

    async createAccount() {
        await this.createAccountButton.click();
    }

    async login(email,password){
        await expect(this.page.getByText("Login to your account")).toBeVisible();
        await this.loginEmail.fill(email);
        await this.loginPassword.fill(password);
        await this.loginBtn.click();
    }

    async verifyHome(){
        await expect(this.home).toBeVisible();
        }

    async verifyLoggedInUser(name){
        await expect(this.page.getByText(` Logged in as ${name}`)).toBeVisible();
    }

    async logout(){
        await this.logoutBtn.click();
    }

    async openTestCases(){
        await this.testcasesPage.click();
    }
}

module.exports = { SignupPage };
