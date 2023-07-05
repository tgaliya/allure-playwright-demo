import { test, expect } from '@playwright/test';
import AllTestResultLog from '../testResults';
import { sendMail } from '../SendMail';

interface AllTestResultLog {
  SrNo: string;
  Module: string;
  Status: string;
  Path: string;
}

test('@playwrightTest VIA Flow Testing from Login till Logout', async ({ page }) => {
  //-----------------------------------------Login Module---------------------------------------------
  await page.goto('https://qa-via.outamationlabs.com/via-ui');
  await page.waitForTimeout(1500);
  console.log('\nLogin:');
  await page.locator("button[label='Login']").click();
  await page.waitForTimeout(1500);
  const blanklogininfotoaster: boolean = await page.locator('p-toastitem').isVisible();
  if (blanklogininfotoaster === true) {
    await expect
      .soft(page.locator('p-toastitem'))
      .toContainText('Please fill all the required values!');
    await page.waitForTimeout(3000);
  } else {
    console.log('Error: Blank Login toaster message missing!');
  }
  await page.locator("button[label='Verify my account']").click();
  await page.waitForTimeout(1500);
  const blankotptoaster: boolean = await page.locator('p-toastitem').isVisible();
  if (blankotptoaster === true) {
    await expect.soft(page.locator('p-toastitem')).toContainText('Please enter OTP!');
    await page.waitForTimeout(3000);
  } else {
    console.log('Error: Blank OTP toaster message missing!');
    await page.waitForTimeout(3000);
  }
  await page.locator("input[type='tel']").first().type('1', { delay: 50 });
  await page.locator("input[type='tel']").nth(1).type('2', { delay: 50 });
  await page.locator("input[type='tel']").nth(2).type('3', { delay: 50 });
  await page.locator("input[type='tel']").nth(3).type('4', { delay: 50 });
  await page.locator("input[type='tel']").nth(4).type('5', { delay: 50 });
  await page.locator("input[type='tel']").last().type('6', { delay: 50 });
  await Promise.all([
    page.waitForURL('https://qa-via.outamationlabs.com/via-ui/#/app/dashboard'),
    page.locator("button[label='Verify my account']").click(),
  ]);
  if (page.url().includes('app/dashboard')) {
    const result = {
      SrNo: '1',
      Module: 'Login',
      Status: 'Pass',
    };
    console.log('User Login Successful');
    AllTestResultLog.push(result);
  } else {
    const result = {
      SrNo: '1',
      Module: 'Login',
      Status: 'Fail',
    };
    console.log('User Login Failed');
    AllTestResultLog.push(result);
  }
});

test.only('@playwrightLoginTest VIA Flow Testing from Login till Logout', async ({ page }) => {
  //-----------------------------------------Login Module---------------------------------------------
  await page.goto('https://qa-via.outamationlabs.com/via-ui');
  await page.waitForTimeout(1500);
  console.log('\nLogin:');
  await page.waitForTimeout(1500);
  await page.locator("input[type='submit']").click();
  await expect
    .soft(page.locator('div#usernameError'))
    .toContainText('Enter a valid email address, phone number, or Skype name.');
  await page.waitForTimeout(1500);
  await page.locator("input[type='email']").fill('tushar.galiya@outamation.com');
  await page.waitForTimeout(1500);
  await page.locator("input[type='submit']").click();
  await page.waitForTimeout(3000);
  await page.locator("input[type='submit']").click();
  await expect.soft(page.locator('div#passwordError')).toContainText('Please enter your password.');
  await page.waitForTimeout(1500);
  await page.locator("input[type='password']").fill('Pramukh@1');
  await page.waitForTimeout(1500);
  await page.locator("input[type='submit']").click();
  await Promise.all([
    page.waitForURL('https://qa-via.outamationlabs.com/via-ui/#/app/dashboard'),
    page.locator("input[type='submit']").click(),
  ]);
  if (page.url().includes('app/dashboard')) {
    const result = {
      SrNo: '1',
      Module: 'Login',
      Status: 'Pass',
      Path: 'Login',
    };
    console.log('User Login Successful');
    AllTestResultLog.push(result);
  } else {
    const result = {
      SrNo: '1',
      Module: 'Login',
      Status: 'Fail',
      Path: 'Login',
    };
    console.log('User Login Failed');
    AllTestResultLog.push(result);
  }
  // const blanklogininfotoaster: boolean = await page.locator('p-toastitem').isVisible();
  // if (blanklogininfotoaster === true) {
  //   await expect
  //     .soft(page.locator('p-toastitem'))
  //     .toContainText('Please fill all the required values!');
  //   await page.waitForTimeout(3000);
  // } else {
  //   console.log('Error: Blank Login toaster message missing!');
  // }
  // await page.locator("button[label='Verify my account']").click();
  // await page.waitForTimeout(1500);
  // const blankotptoaster: boolean = await page.locator('p-toastitem').isVisible();
  // if (blankotptoaster === true) {
  //   await expect.soft(page.locator('p-toastitem')).toContainText('Please enter OTP!');
  //   await page.waitForTimeout(3000);
  // } else {
  //   console.log('Error: Blank OTP toaster message missing!');
  //   await page.waitForTimeout(3000);
  // }
  // await page.locator("input[type='tel']").first().type('1', { delay: 50 });
  // await page.locator("input[type='tel']").nth(1).type('2', { delay: 50 });
  // await page.locator("input[type='tel']").nth(2).type('3', { delay: 50 });
  // await page.locator("input[type='tel']").nth(3).type('4', { delay: 50 });
  // await page.locator("input[type='tel']").nth(4).type('5', { delay: 50 });
  // await page.locator("input[type='tel']").last().type('6', { delay: 50 });
  // await Promise.all([
  //   page.waitForURL('https://qa-via.outamationlabs.com/via-ui/#/app/dashboard'),
  //   page.locator("button[label='Verify my account']").click(),
  // ]);
  // if (page.url().includes('app/dashboard')) {
  //   const result = {
  //     SrNo: '1',
  //     Module: 'Login',
  //     Status: 'Pass',
  //   };
  //   console.log('User Login Successful');
  //   AllTestResultLog.push(result);
  // } else {
  //   const result = {
  //     SrNo: '1',
  //     Module: 'Login',
  //     Status: 'Fail',
  //   };
  //   console.log('User Login Failed');
  //   AllTestResultLog.push(result);
  // }
});

test.afterAll(async () => {
  console.log('\nAFTER TESTS');
  await sendMail();
});
