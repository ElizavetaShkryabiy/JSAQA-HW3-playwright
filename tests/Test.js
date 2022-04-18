
 //Тест 1. Успешная авторизация
const {test, expect} = require('@playwright/test');
const config = {
  headless: false,
  timeout: 30000,
  globalTimeout: 600000,
  reporter: 'list',
  testDir: './tests',
};

test.describe('two tests', () => {

test('Успешная авторизация', async({page}) => {
  const {User} = require("../user.js")
  const userInstance = new User()
  let login =  userInstance.login;
  let password = userInstance.password;
  await page.goto('https://netology.ru/?modal=sign_in');
  await page.click('[name="email"]');   
  await page.fill('[placeholder="Email"]', login);    
  await page.click('[name="password"]');
  await page.fill('[placeholder="Пароль"]', password);
  await page.click('[data-testid="login-submit-btn"]');
  expect(page.url()).toBe('https://netology.ru/profile');
  await page.$(h2, {hasText: 'Мои курсы и профессии'});
  await context.close();
  await browser.close();    
});

//Тест 2. Неуспешная авторизация
test('Неуспешная авторизация', async({page}) => {
  await page.goto('https://netology.ru/?modal=sign_in');
  await page.click('[name="email"]');   
  await page.fill('[placeholder="Email"]', "login@mail.ru");    
  await page.click('[name="password"]');
  await page.fill('[placeholder="Пароль"]', "password");
  await page.click('[data-testid="login-submit-btn"]');
  await expect(page.$('[data-testid="login-error-hint"]', {hasText: 'Вы ввели неправильно логин или пароль'}));  
  await context.close();
  await browser.close();    
});

})