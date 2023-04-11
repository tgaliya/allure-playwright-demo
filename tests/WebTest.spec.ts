import { test, expect } from '@playwright/test';
test.beforeEach(async({page}) =>
{
    //-------------------------------------------Login Module-------------------------------------------
    let username = "Via";
    let password = "Via@12345";
    let wpassword = "Via@123";
    await page.goto("https://qa-via.outamationlabs.com/via-ui");
    await page.locator("button[label='Login']").click();
    const blanklogininfotoaster: boolean = await page.locator("p-toastitem").isVisible();
    if (blanklogininfotoaster === true) 
    {
        await expect(page.locator("p-toastitem")).toContainText("Please fill all the required values!");  
        await page.waitForTimeout(3000);
    } 
    else
    {
        console.log("Error: Blank Login toaster message missing!");
    }
    await page.locator("input[placeholder='Username']").fill(username);
    await page.locator("input[placeholder='Password']").fill(wpassword);
    expect.soft(wpassword.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)).toBeFalsy();
    await page.locator("input[placeholder='Password']").clear();
    await page.locator("input[placeholder='Password']").fill(password);
    expect.soft(wpassword.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/));
    await page.locator("input[placeholder='Password']").press('Tab');
    await page.locator("button[label='Login']").click();
    await page.locator("button[label='Verify my account']").click();
    await page.waitForTimeout(1500);
    const blankotptoaster: boolean = await page.locator("p-toastitem").isVisible();
    if (blankotptoaster === true) 
    {
        await expect(page.locator("p-toastitem")).toContainText("Please enter OTP!");  
        await page.waitForTimeout(3000);
    } 
    else 
    {
        console.log("Error: Blank OTP toaster message missing!");
    }
    await page.locator("input[type='tel']").first().type("1");
    await page.locator("input[type='tel']").nth(1).type("2");
    await page.locator("input[type='tel']").nth(2).type("3");
    await page.locator("input[type='tel']").nth(3).type("4");
    await page.locator("input[type='tel']").nth(4).type("5");
    await page.locator("input[type='tel']").last().type("6");
    await Promise.all([
        page.waitForURL("https://qa-via.outamationlabs.com/via-ui/#/app/user-management/dashboard"),
        page.locator("button[label='Verify my account']").click()
    ]);
    if(page.url().includes("user-management/dashboard"))
    {
        console.log("User Login Successful");
    }
    else
    {   
        console.log("User Login Failed");
    }
});
let userdetails: string[] = ['awilliams@gmail.com', 'Alex','Williams','S','010-771-8510',
'B.A', 'I.T'];
let wuserdetails: string[] = ["awilliams@gmail-com","+1 571-789-1001","4390","(567) 026-5681"];
let entitydetails: string[] = ['Cipher Technologies', '3410 Sant mariot Road','Chicago','Illinois',
'61607-7613','312-660-9190','+1','771-123-4560','+1','010-771-8510','awilliams@gmail.com'];
let wentitydetails: string[] = ["4390","+1 571-789-1001","(567) 026-5681","awilliams@gmail-com",];
let clientdetails: string[] = ['Cipher Technologies','CTPL','3410 Sant mariot Road','Birmingham',
'Alabama','61607-7613','312-660-9190','+1','771-123-4560','+1','010-771-8510','awilliams@gmail.com'];
let wclientdetails: string[] = ["4390","+1 571-789-1001","(567) 026-5681","awilliams@gmail-com",];
test('@ViaFlowTesting @Regression Via Flow Testing: Login, User Management & Administration Module',async ({page})=>
{
    //-------------------------------User Management: Creating New User---------------------------------
    await page.locator("div[aria-label='User Management']").click(); //clicking on side menu bar of User Management
    await page.locator("div[aria-label='Create User']").click(); //clicking on Create User button
    await page.waitForTimeout(1500);
    expect.soft(page.url().includes("via-ui/#/app/user-management/create-user")).toBeTruthy();
    await page.locator("p-button[label='Save & Close']").click();
    const UserInfoSubmittoaster: boolean = await page.locator("p-toastitem").isVisible();
    if (UserInfoSubmittoaster === true) 
    {
        await expect(page.locator("p-toastitem")).toContainText("Please fill all the required values!");  
        await page.waitForTimeout(3000);
    } 
    else 
    {
        console.log("Error: Blank User Information toaster message missing!");
        await page.waitForTimeout(3000);
    }
    await page.locator("#email").fill(wuserdetails[0]);
    expect.soft(wuserdetails[0].match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)).toBeFalsy();
    await page.locator("#email").clear();
    await page.locator("#email").fill(userdetails[0]);
    expect.soft(userdetails[0]).toMatch(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
    await page.locator("#firstName").fill(userdetails[1]);
    await page.locator("#lastName").fill(userdetails[2]);
    await page.locator("#middleInitial").type(userdetails[3]);
    await page.locator("#phoneNumber").fill(wuserdetails[1]);
    expect.soft(wuserdetails[1].match(/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/)).toBeFalsy();
    await page.locator("#phoneNumber").clear();
    await page.locator("#phoneNumber").fill(userdetails[4]);
    expect.soft(userdetails[4]).toMatch(/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/);
    await page.locator("#title").fill(userdetails[5]);
    await page.locator("#department").fill(userdetails[6]);
    await page.locator('p-dropdown span.p-dropdown-label').nth(1).click();
    await page.locator("li[aria-label='Florida']").click();
    await page.locator('p-dropdown span.p-dropdown-label').nth(2).click();
    await page.locator("li[aria-label='Miami-Dade']").click();
    await page.locator("button span.pi-calendar").click();
    await page.locator("td.p-datepicker-today.ng-star-inserted").click(); //selecting current date
    console.log(await page.locator("span.p-calendar .p-inputtext").textContent());
    await page.locator("text=Read Only").click();
    expect.soft(page.locator("text=Read Only").isChecked).toBeTruthy();
    await page.locator(".p-dropdown").last().click();
    await page.locator("li[aria-label='None']").click();
    await page.locator("text=Save & Close").click();
    const PrivilegeInfoSubmittoaster: boolean = await page.locator("p-toastitem").isVisible();
    if (PrivilegeInfoSubmittoaster === true) 
    {
        await expect(page.locator("p-toastitem")).toContainText("Please fill all the required values!");  
        await page.waitForTimeout(3000);
    } 
    else 
    {
        console.log("Error: Adding new user (Success) toaster message missing!");
        await page.waitForTimeout(3000);
    }
    //-------------------------------Adminstration: Creating New Entity---------------------------------
    await page.locator("div[aria-label='Administration']").click(); //clicking on side menu bar of Administration
    await page.locator("div[aria-label='Add Entity']").click(); //clicking on Add Entity button
    await page.waitForTimeout(1500);
    if (page.url().includes("app/admin/entity/create")) 
    {
        console.log("Privilege Set Up Successfull - User Creation - Completed");
    } 
    else 
    {
        console.log("Privilege Set Up Unsuccessfull - User Creation - Failed");
    }
    expect.soft(page.url().includes("admin/entity/create")).toBeTruthy();
    await page.locator("text=Submit").click();
    const blankEntityCreationtoaster: boolean = await page.locator("p-toastitem").isVisible();
    if (blankEntityCreationtoaster === true) 
    {
        await expect(page.locator("p-toastitem")).toContainText("Please fill all the required values!");  
        await page.waitForTimeout(3000);
    } 
    else 
    {
        console.log("Error: Blank Entity Creation toaster message missing!");
        await page.waitForTimeout(3000);
    }
    await page.locator("p-dropdown div.p-dropdown").nth(1).click();
    await page.locator("li[aria-label='User']").click();
    await page.locator('p-dropdown span.p-dropdown-label').nth(1).textContent();
    await page.locator("#companyName").fill(entitydetails[0]);
    await page.locator("#address").fill(entitydetails[1]);
    await page.locator("#city").fill(entitydetails[2]);
    await page.locator("p-dropdown div.p-dropdown").last().click();
    await page.locator("li[aria-label='Illinois']").click();
    await page.locator('p-dropdown span.p-dropdown-label').last().textContent();
    await page.locator("#zip").type(wentitydetails[0]);
    expect.soft(wentitydetails[0].match(/(^\d{5}$)|(^\d{5}-\d{4}$)/)).toBeFalsy();
    await page.locator("#zip").clear();
    await page.locator("#zip").type(entitydetails[4]);
    await page.locator("#phoneNumber").type(wentitydetails[1]);
    expect.soft(wentitydetails[1].match(/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/)).toBeFalsy();
    await page.locator("#phoneNumber").clear();
    await page.locator("#phoneNumber").type(entitydetails[5]);
    await page.locator("#phoneExt").fill(entitydetails[6]);
    await page.locator("#alternatePhoneNumber").fill(wentitydetails[2]);
    expect.soft(wentitydetails[2].match(/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/)).toBeFalsy();
    await page.locator("#alternatePhoneNumber").clear();
    await page.locator("#alternatePhoneNumber").fill(entitydetails[7]);
    await page.locator("#alternatePhoneExt").fill(entitydetails[8]);
    await page.locator("#faxNumber").fill(entitydetails[9]);
    await page.locator("#email").fill(wentitydetails[3]);
    expect.soft(wentitydetails[3].match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)).toBeFalsy();
    await page.locator("#email").clear();
    await page.locator("#email").fill(entitydetails[10]);
    await page.locator("text=Submit").click();
    await page.locator("span.pi-check").click();
    const Entitycreationsuccessmsg : boolean = await page.locator(".p-toast-detail").isVisible();
    if (Entitycreationsuccessmsg === true) 
    {
        await expect(page.locator(".p-toast-detail")).toContainText("Entity has been created");  
        await page.waitForTimeout(1500);
        const Success1 = await page.locator(".p-toast-detail").textContent();
        if(Success1 === "Entity has been created")
        {
            console.log("Entity Creation Passed");
        }
        else
        {
            console.log("Entity Creation Failed");
        }
    } 
    else 
    {
        console.log("Error: Submitting Entity Details (Success) toaster message missing!");
    }
    await page.waitForTimeout(3000);
    //-------------------------------Adminstration: Creating New Client---------------------------------
    await page.locator("div[aria-label='Administration']").click(); //clicking on side menu bar of Administration
    await page.locator("div[aria-label='Add Client']").click(); //clicking on Add Client button
    await expect.soft(page).toHaveURL('https://qa-via.outamationlabs.com/via-ui/#/app/admin/client-admin/create');
    await page.locator("text=Submit").click();
    const blankClientCreationtoaster: boolean = await page.locator("p-toastitem").isVisible();
    if (blankClientCreationtoaster === true) 
    {
        await expect(page.locator("p-toastitem")).toContainText("Please fill all the required values!");  
        await page.waitForTimeout(3000);
    } 
    else 
    {
        console.log("Error: Blank Client Creation toaster message missing!");
        await page.waitForTimeout(3000);
    }
    await page.locator("#companyName").type(clientdetails[0]);
    await page.locator("#companyCode").type(clientdetails[1]);
    await page.locator("#address").fill(clientdetails[2]);
    await page.locator("#city").fill(clientdetails[3]);
    await page.locator("p-dropdown#state span").last().click();
    await page.locator("li[aria-label='California']").click();
    await page.locator('p-dropdown span.p-dropdown-label').last().textContent();
    await page.locator("#zip").fill(wclientdetails[0]);
    expect.soft(wclientdetails[0].match(/(^\d{5}$)|(^\d{5}-\d{4}$)/)).toBeFalsy();
    await page.locator("#zip").clear();
    await page.locator("#zip").fill(clientdetails[5]);
    await page.locator("#phoneNumber").type(wclientdetails[1]);
    expect.soft(wclientdetails[1].match(/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/)).toBeFalsy();
    await page.locator("#phoneNumber").clear();
    await page.locator("#phoneNumber").type(clientdetails[6]);
    await page.locator("#phoneExt").fill(clientdetails[7]);
    await page.locator("#alternatePhoneNumber").fill(wclientdetails[2]);
    expect.soft(wclientdetails[2].match(/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/)).toBeFalsy();
    await page.locator("#alternatePhoneNumber").clear();
    await page.locator("#alternatePhoneNumber").fill(clientdetails[8]);
    await page.locator("#alternatePhoneExt").fill(clientdetails[9]);
    await page.locator("#faxNumber").fill(clientdetails[10]);
    await page.locator("#email").fill(wclientdetails[3]);
    expect.soft(wclientdetails[3].match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)).toBeFalsy();
    await page.locator("#email").clear();
    await page.locator("#email").fill(clientdetails[11]);
    await page.locator("text=Submit").click();
    const Clientcreationsuccessmsg : boolean = await page.locator(".p-toast-detail").isVisible();
    if (Clientcreationsuccessmsg === true) 
    {
        await expect(page.locator(".p-toast-detail")).toContainText("Client has been created");  
        await page.waitForTimeout(1500);
        const Success2 = await page.locator(".p-toast-detail").textContent();
        if(Success2 === "Client has been created")
        {
            console.log("Client Creation Passed");
        }
        else
        {
            console.log("Client Creation Failed");
        }
    } 
    else 
    {
        console.log("Error: Submitting Client Details (Success) toaster message missing!");
    }
});