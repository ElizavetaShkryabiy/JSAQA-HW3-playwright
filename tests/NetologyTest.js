const { test, expect } = require("@playwright/test");
const user = require("../user")

const {chromium} = require ('playwright');

(async() => {
    const browser = await chromium.launch({
        headless: false,
        slowMo: 5000,
        devtools: true
    });    
    const page = await browser.newPage("https://netology.ru");
    page.goto('https://netology.ru/?modal=sign_in');   
    await page.isVisible('[data-testid="profile-personal-info-avatar-popup"]');
    await page.click('[placeholder="Email"]');    
    await page.fill('[placeholder="Email"]', validUser.getLogin);
    // Click [placeholder="Пароль"]
    await page.click('[placeholder="Пароль"]');
    // Fill [placeholder="Пароль"]
    await page.fill('[placeholder="Пароль"]', validUser.getPassword);
    // Click [data-testid="login-submit-btn"]
    await page.click('[data-testid="login-submit-btn"]');

    
    browser.close();
})()

