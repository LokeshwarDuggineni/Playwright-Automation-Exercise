
class ContactUsPage{
    constructor(page){
        this.contactUs = page.getByRole("link", {name:" Contact us"});
        this.name = page.getByPlaceholder("Name");
        this.email = page.getByPlaceholder("Email", {exact:"true"});
        this.subject = page.getByPlaceholder("Subject")
        this.message = page.getByPlaceholder("Your Message Here");
        this.chooseFile = page.locator("[name='upload_file']");
        this.submit = page.getByRole("button", {name:"Submit"});

    }

    async openContactUs(){
        await this.contactUs.click();
    }

    async fillContactForm(name, email, subject, message) {
    await this.name.fill(name);
    await this.email.fill(email);
    await this.subject.fill(subject);
    await this.message.fill(message);
}

    async uploadFile(filePath) {
    await this.chooseFile.setInputFiles(filePath);
}

async submitForm() {
    await this.submit.click();
}
}

module.exports = { ContactUsPage };