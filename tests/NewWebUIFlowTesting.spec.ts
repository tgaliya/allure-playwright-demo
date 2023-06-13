import { test, expect } from '@playwright/test';
import AllTestResultLog from '../testResults';
//const {sendMail} = require('../SendMail');
const { addTestResult } = require('../testResults');

interface AllTestResultLog
{
    SrNo: string;
    Module: string;
    Status: string;
}
//const myList: AllTestResultLog[] = [];
test.beforeEach(async({page}) =>
{
    //-----------------------------------------Login Module---------------------------------------------
    await page.goto("https://qa-via.outamationlabs.com/via-ui");
    await page.waitForTimeout(1500);
    console.log("\nLogin:");
    await page.locator("button[label='Login']").click();
    await page.waitForTimeout(1500);
    const blanklogininfotoaster: boolean = await page.locator("p-toastitem").isVisible();
    if (blanklogininfotoaster === true)
    {
        await expect.soft(page.locator("p-toastitem")).toContainText("Please fill all the required values!");  
        await page.waitForTimeout(3000);
    } 
    else
    {
        console.log("Error: Blank Login toaster message missing!");
    }
    await page.locator("button[label='Verify my account']").click();
    await page.waitForTimeout(1500);
    const blankotptoaster: boolean = await page.locator("p-toastitem").isVisible();
    if (blankotptoaster === true) 
    {
        await expect.soft(page.locator("p-toastitem")).toContainText("Please enter OTP!");  
        await page.waitForTimeout(3000);
    } 
    else 
    {
        console.log("Error: Blank OTP toaster message missing!");
        await page.waitForTimeout(3000);
    }
    await page.locator("input[type='tel']").first().type("1",{delay:50});
    await page.locator("input[type='tel']").nth(1).type("2",{delay:50});
    await page.locator("input[type='tel']").nth(2).type("3",{delay:50});
    await page.locator("input[type='tel']").nth(3).type("4",{delay:50});
    await page.locator("input[type='tel']").nth(4).type("5",{delay:50});
    await page.locator("input[type='tel']").last().type("6",{delay:50});
    await Promise.all([
        page.waitForURL("https://qa-via.outamationlabs.com/via-ui/#/app/dashboard"),
        page.locator("button[label='Verify my account']").click()
    ]);
    if(page.url().includes("app/dashboard"))
    {
        const result: AllTestResultLog = {
            SrNo: "1",
            Module: "Login",
            Status: "Pass"
        }
        console.log("User Login Successful");
        addTestResult(result);
        //console.log(AllTestResultLog);
        //AllTestResultLog.push(result);
    }
    else
    {   
        const result: AllTestResultLog = {
            SrNo: "1",
            Module: "Login",
            Status: "Fail"
        }
        console.log("User Login Failed");
        addTestResult(result);
        //console.log(AllTestResultLog);
        //AllTestResultLog.push(result);
    }
});
let userdetails: string[] = ['albertjerry321@gmail.com', 'Albert','Jerry','k','281-890-0036',
'Sales Executive', 'Sales'];
let wuserdetails: string[] = ["albertjerry@gmail-com","+1 572-790-1002","4391","(567) 890-5682"];
let entitydetails: string[] = ['Delfas Technologies', 'albertjerry@gmail.com', '011-772-8511', '313-661-9191',
'1', '772-123-4567','1', '201 Cypress Avenue', 'Texas', 'Houston', '77070'];
let wentitydetails: string[] = ["albertjerry@gmail-com", "+1 571-789-1231", "(890) 027-5682", "9876"];
let clientdetails: string[] = ['Delfas Technologies','DTPL', 'albertjerry@gmail.com', '011-772-8511', 
'201 Cypress Avenue', 'Texas', 'Houston', '71707-7015','313-661-9191','1','772-123-4567','1'];
let wclientdetails: string[] = ["albertjerry@gmail-com", "43901.0110", "+2 571-789-1111", "(890) 026-5681"];
let trusteeinfo: string[] = ['Andrew Tye', '2618 Caldwell Road', 'Simform Apt', '14428', 'Miami'];
test('@UpdatedViaFlow VIA Flow Testing from Login till Logout', async({page})=>
{
        //-------------------------------User Management: Creating New User---------------------------------
        console.log("\nUser Management: New User Creation");
        await page.locator("div[aria-label='Administration']").click(); //clicking on side nav bar of Administration
        await page.locator("div[aria-label='User Management']").click(); //selecting User Management from side menu bar
        await page.locator("button[label='Add User']").click(); //clicking on Add User button
        await page.waitForTimeout(1500);
        expect.soft(page.url().includes("app/admin/user-management/user-info")).toBeTruthy();
        await page.locator("p-button[label='Save & Close']").click();
        const UserInfoSubmittoaster: boolean = await page.locator("p-toastitem").isVisible();
        if (UserInfoSubmittoaster === true)
        {
            await expect.soft(page.locator("p-toastitem")).toContainText("Please fill all the required values!");  
            await page.waitForTimeout(3000);
        } 
        else 
        {
            console.log("Error: Blank User Information toaster message missing!");
            await page.waitForTimeout(3000);
        }
        await page.locator("#email").type(wuserdetails[0],{delay:50});
        expect.soft(wuserdetails[0].match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)).toBeFalsy();
        await page.locator("#email").clear();
        await page.locator("#email").type(userdetails[0],{delay:50});
        expect.soft(userdetails[0]).toMatch(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
        await page.locator("#firstName").type(userdetails[1],{delay:100});
        await page.locator("#lastName").type(userdetails[2],{delay:100});
        await page.locator("#middleInitial").type(userdetails[3]);
        await page.locator("#phoneNumber").fill(wuserdetails[1]);
        expect.soft(wuserdetails[1].match(/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/)).toBeFalsy();
        await page.locator("#phoneNumber").clear();
        await page.locator("#phoneNumber").fill(userdetails[4]);
        expect.soft(userdetails[4]).toMatch(/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/);
        await page.locator("#title").type(userdetails[5],{delay:100});
        await page.locator("#department").type(userdetails[6],{delay:100});
        await page.locator('#state').click();
        await page.locator("li[aria-label='Florida']").click();
        await page.locator('#county').click();
        await page.locator("li[aria-label='Miami-Dade']").click();
        //await page.locator("button span.pi-calendar").click();
        await page.locator("calendaricon").click();
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
            await expect.soft(page.locator("p-toastitem")).toContainText("Please fill all the required values!");  
            await page.waitForTimeout(3000);
        } 
        else 
        {
            console.log("Error: Adding new user (Success) toaster message missing!");
            await page.waitForTimeout(3000);
        }
        //-------------------------------Adminstration: Creating New Entity---------------------------------
        await page.locator("div[aria-label='Administration']").click(); //clicking on side menu bar of Administration
        await page.locator("div[aria-label='Entity Management']").click(); //selecting Entity Management from side menu bar
        await page.waitForTimeout(1500);
        if (page.url().includes("app/admin/entity-management/entities")) 
        {
            console.log("Privilege Set Up Successfull - User Creation - Completed");
        } 
        else
        {
            console.log("Privilege Set Up Unsuccessfull - User Creation - Failed");
        }
        console.log("\nEntity Management: New Entity Creation");
        await page.locator("button[label='Add Entity']").click(); //clicking on Add Entity button
        expect.soft(page.url().includes("app/admin/entity-management/entity-info")).toBeTruthy();
        await page.locator("text=Save & Close").click();
        const blankEntityCreationtoaster: boolean = await page.locator("p-toastitem").isVisible();
        if (blankEntityCreationtoaster === true) 
        {
            await expect.soft(page.locator("p-toastitem")).toContainText("Please fill all the required values!");  
            await page.waitForTimeout(3000);
        } 
        else 
        {
            console.log("Error: Blank Entity Creation toaster message missing!");
            await page.waitForTimeout(3000);
        }
        await page.locator("p-dropdown div.p-dropdown").nth(1).click();
        await page.locator("li[aria-label='User']").click();
        await page.locator("input[formcontrolname='companyName']").type(entitydetails[0],{delay:50});
        await page.locator("input[formcontrolname='email']").type(wentitydetails[0],{delay:50});
        expect.soft(wentitydetails[0].match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)).toBeFalsy();
        await page.locator("input[formcontrolname='email']").clear();
        await page.locator("input[formcontrolname='email']").type(entitydetails[1],{delay:50});
        expect.soft(entitydetails[1]).toMatch(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
        await page.locator("#faxNumber").fill(entitydetails[2]);
        await page.locator("#phoneNumber").type(wentitydetails[1],{delay:50});
        expect.soft(wentitydetails[1].match(/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/)).toBeFalsy();
        await page.locator("#phoneNumber").clear();
        await page.locator("#phoneNumber").type(entitydetails[3],{delay:50});
        expect.soft(entitydetails[3]).toMatch(/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/);
        await page.locator("#phoneExt").fill(entitydetails[4]);
        await page.locator("#alternatePhoneNumber").type(wentitydetails[2],{delay:50});
        expect.soft(wentitydetails[2].match(/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/)).toBeFalsy();
        await page.locator("#alternatePhoneNumber").clear();
        await page.locator("#alternatePhoneNumber").type(entitydetails[5],{delay:50});
        expect.soft(entitydetails[5]).toMatch(/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/);
        await page.locator("#alternatePhoneExt").fill(entitydetails[6]);
        await page.locator("#address").type(entitydetails[7],{delay:50});
        await page.locator("#state").click();
        await page.locator("li[aria-label='Texas']").click();
        await page.locator("#city").fill(entitydetails[9]);
        await page.locator("#zip").type(wentitydetails[3],{delay:100});
        expect.soft(wentitydetails[3].match(/(^\d{5}$)|(^\d{5}-\d{4}$)/)).toBeFalsy();
        await page.locator("#zip").clear();
        await page.locator("#zip").type(entitydetails[10],{delay:100});
        expect.soft(entitydetails[10]).toMatch(/(^\d{5}$)|(^\d{5}-\d{4}$)/);
        await page.locator("text=Save & Close").click();
        await page.locator("button.p-button span.pi-check").click();
        const Entitycreationsuccessmsg : boolean = await page.locator(".p-toast-detail").isVisible();
        if (Entitycreationsuccessmsg === true) 
        {
            const Success1 = await page.locator(".p-toast-detail").textContent();
            await expect.soft(page.locator(".p-toast-detail")).toContainText("Entity has been created");  
            //await page.waitForTimeout(1500);
            if(Success1 === "Entity has been created")
            {
                console.log("Entity Creation Passed");
                await page.waitForTimeout(3000);
            }
            else
            {
                console.log("Entity Creation Failed");
                await page.waitForTimeout(3000);
            }
        } 
        else 
        {
            console.log("Error: Submitting Entity Details (Success) toaster message missing!");
            await page.waitForTimeout(3000);
        }
        //-------------------------------Adminstration: Creating New Client---------------------------------
        console.log("\nClient Management: New Client Creation");
        await page.locator("div[aria-label='Administration']").click(); //clicking on side menu bar of Administration
        await page.locator("div[aria-label='Client Management']").click(); //selecting Client Management from side menu bar
        await expect.soft(page).toHaveURL('https://qa-via.outamationlabs.com/via-ui/#/app/admin/client-management/clients');
        await page.locator("button[label='Add Client']").click(); //clicking on Add Client button
        await page.locator("text=Save & Close").click();
        const blankClientCreationtoaster: boolean = await page.locator("p-toastitem").isVisible();
        if (blankClientCreationtoaster === true) 
        {
            await expect.soft(page.locator("p-toastitem")).toContainText("Please fill all the required values!");  
            await page.waitForTimeout(3000);
        } 
        else 
        {
            console.log("Error: Blank Client Creation toaster message missing!");
            await page.waitForTimeout(3000);
        }
        await page.locator("#companyName").type(clientdetails[0],{delay:50});
        await page.locator("#companyCode").type(clientdetails[1],{delay:100});
        await page.locator("#email").type(wclientdetails[0],{delay:50});
        expect.soft(wclientdetails[0].match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)).toBeFalsy();
        await page.locator("#email").clear();
        await page.locator("#email").type(clientdetails[2],{delay:50});
        expect.soft(clientdetails[2]).toMatch(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
        await page.locator("#faxNumber").fill(clientdetails[3]);
        await page.locator("#address").type(clientdetails[4],{delay:50});
        await page.locator("#state").click();
        await page.locator("li[aria-label='California']").click();
        await page.locator("#city").fill(clientdetails[6]);
        await page.locator("#zip").fill(wclientdetails[1]);
        expect.soft(wclientdetails[1].match(/(^\d{5}$)|(^\d{5}-\d{4}$)/)).toBeFalsy();
        await page.locator("#zip").clear();
        await page.locator("#zip").fill(clientdetails[7]);
        expect.soft(clientdetails[7]).toMatch(/(^\d{5}$)|(^\d{5}-\d{4}$)/);
        await page.locator("#phoneNumber").type(wclientdetails[2],{delay:50});
        expect.soft(wclientdetails[2].match(/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/)).toBeFalsy();
        await page.locator("#phoneNumber").clear();
        await page.locator("#phoneNumber").type(clientdetails[8],{delay:50});
        expect.soft(clientdetails[8]).toMatch(/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/);
        await page.locator("#phoneExt").fill(clientdetails[9]);
        await page.locator("#alternatePhoneNumber").type(wclientdetails[3],{delay:50});
        expect.soft(wclientdetails[3].match(/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/)).toBeFalsy();
        await page.locator("#alternatePhoneNumber").clear();
        await page.locator("#alternatePhoneNumber").type(clientdetails[10],{delay:50});
        expect.soft(clientdetails[10]).toMatch(/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/);
        await page.locator("#alternatePhoneExt").fill(clientdetails[11]);
        await page.locator("text=Save & Close").click();
        const Clientcreationsuccessmsg : boolean = await page.locator(".p-toast-detail").isVisible();
        if (Clientcreationsuccessmsg === true) 
        {
            const Success2 = await page.locator(".p-toast-detail").textContent();
            await expect.soft(page.locator(".p-toast-detail")).toContainText("Client has been created");  
            //await page.waitForTimeout(1500);
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
        await page.waitForTimeout(3000);
        //---------------------------Case Management : Case/File Info Module--------------------------------
        await page.locator("div[aria-label='Case Management']").click(); //clicking on side menu button of Case Management
        await page.waitForTimeout(1500);
        await Promise.all([
            page.waitForURL("https://qa-via.outamationlabs.com/via-ui/#/app/case-management/case-form/referral-info"),
            page.locator("div[aria-label='New Case']").click() //clicking on New Case button
        ]);
        await page.waitForTimeout(1500);
        console.log("\nNew Case Creation:");
        if(page.url().includes("app/case-management/case-form/referral-info"))
        {
            console.log("User landed on create case page");
            await page.waitForTimeout(3000);
        }
        else
        {   
            console.log("User failed to land on create case page");
            await page.waitForTimeout(3000);
        }
        let CaseNo: any = await page.locator("via-referral-header span.font-medium").textContent();
        console.log("New Referral Number Generated is : " + CaseNo);
        await page.waitForTimeout(3000);
        await Promise.all([
            page.waitForURL("https://qa-via.outamationlabs.com/via-ui/#/app/case-management/case-form/"+ CaseNo +"/document"),
            page.locator("text=Next").click()
        ]);
        const blanktrusteeinfotoaster: boolean = await page.locator("p-toastitem").isVisible();
        if (blanktrusteeinfotoaster === true) 
        {
            await expect.soft(page.locator("p-toastitem")).toContainText("Please fill all the required values!");  
            await page.waitForTimeout(3000);
            await page.locator("input[formcontrolname='TrusteeName']").type(trusteeinfo[0], {delay: 50});
            await page.locator("input[formcontrolname='TrusteeAddress1']").type(trusteeinfo[1], {delay: 50});
            await page.locator("input[formcontrolname='TrusteeAddress2']").type(trusteeinfo[2], {delay: 50});
            await page.locator("input[formcontrolname='TrusteeZip']").type(trusteeinfo[3], {delay: 50});
            await page.locator("input[formcontrolname='TrusteeCity']").type(trusteeinfo[4], {delay: 50});
            await page.locator("p-dropdown[formcontrolname='TrusteeState']").click(); //clicking on state dropdown
            await page.locator("li[aria-label='Arizona']").click(); //selecting state from dropdown
        } 
        else
        {
            console.log("Error: Blank Trustee info toaster message missing!");
            await page.waitForTimeout(3000);
        }
        //---------------------------Case Management : Choose Document Module-------------------------------
        await page.waitForTimeout(3000);
        await Promise.all([
            page.waitForURL("https://qa-via.outamationlabs.com/via-ui/#/app/case-management/cases"),
            page.locator("p-button[label='Next']").click()
        ]);
        if(page.url().includes("app/case-management/cases"))
        {
            console.log("Workflow Information Submitted");
            console.log("Success, Case Creation Pass");
            console.log("User redirected to cases page");
            await page.waitForTimeout(3000);
        }
        else
        {   
            console.log("Workflow Information Not Submitted");
            console.log("Failure, Case Creation Unsuccessful");
            console.log("User failed to land on cases page");
            await page.waitForTimeout(3000);
        }
        // await Promise.all([
        //     page.waitForURL("https://qa-via.outamationlabs.com/via-ui/#/app/case-management/case-form/"+ CaseNo +"/document"),
        //     page.locator("text=Next").click()
        // ]);
        //await page.locator("p-button[label='Next']").click();
        // const blankdocumenttoaster: boolean = await page.locator("p-toastitem").isVisible();
        // if (blankdocumenttoaster === true) 
        // {
        //     await expect.soft(page.locator("p-toastitem")).toContainText("Please fill all the required values!");  
        //     await page.waitForTimeout(3000);
        //     await page.locator("p-dropdown[formcontrolname='documentType']").click(); //clicking on document type dropdown
        //     await page.locator("li[aria-label='Loan Application']").click(); //selecting document type from dropdown
        //     await page.setInputFiles('input[type="file"]', 'Documents/CPT Assignment 1.pdf');
        //     const fileName = await page.locator("p-fileupload span.p-button-label").textContent();
        //     console.log("Uploaded file name is : " + fileName);
        //     await Promise.all([
        //         page.waitForURL("https://qa-via.outamationlabs.com/via-ui/#/app/case-management/case-form/"+ CaseNo +"/workflow"),
        //         page.locator("text=Next").click()
        //     ]);
        //     if(fileName === "CPT Assignment 1.pdf" && page.url().includes("app/case-management/case-form/"+ CaseNo +"/workflow"))
        //     {
        //         console.log("Document Information Submitted");
        //         console.log("User redirected to workflow page");
        //     }
        //     else
        //     {   
        //         console.log("Document Information Not Submitted");
        //         console.log("User failed to land on workflow page");
        //     }
        // } 
        // else
        // {
        //     console.log("Error: Blank document info toaster message missing!");
        //     await page.waitForTimeout(3000);
        //     if(page.url().includes("app/case-management/case-form/"+ CaseNo +"/workflow"))
        //     {
        //         console.log("Document Information Skipped");
        //         console.log("User redirected to workflow page");
        //         await page.waitForTimeout(3000);
        //     }
        //     else
        //     {   
        //         console.log("Document Information Skipped");
        //         console.log("User failed to land on workflow page");
        //         await page.waitForTimeout(3000);
        //     }
        // }
        //await page.waitForTimeout(5000);
        var caseValues = new Array();
        await page.locator("tbody").waitFor();
        const rows = page.locator("tbody tr");
        for(let i = 0; i < await rows.count(); ++i)
        {
            const CaseSearchNos = await rows.nth(i).locator("td").first().textContent();
            caseValues.push(CaseSearchNos);
            for(var j in caseValues)
            {
                if((" " + CaseNo + " ").includes(caseValues[j]))
                {
                    await rows.nth(i).locator("a").click();
                    break;
                }
            }
        }
        await page.waitForTimeout(5000);
        console.log("\nCase Search and Verifying details:");
        const CaseNumberDetail: any = await page.locator("#p-panel-2-content > div > div > div:nth-child(2) > span:nth-child(2)").textContent();
        console.log("Law Firm ID is : " + CaseNumberDetail);
        if(CaseNo.match(CaseNumberDetail))
        {
            console.log("Case found on case search page");
            console.log("Case Number Found on Search Page is : " + CaseNumberDetail);
        }
        else
        {
            console.log("Failed to found case on case search page");
        }
        //-----------------------------------------Verify Case Details---------------------------------------
        const BorrowerName = "John Doe";
        const FullAddress = "859 South 12th St #104";
        const Case_Number = await page.locator("#p-panel-2-content > div > div > div:nth-child(1) > span:nth-child(2)").textContent();
        const Law_FirmID = await page.locator("#p-panel-2-content > div > div > div:nth-child(2) > span:nth-child(2)").textContent();
        const Borrower_Name = await page.locator("#p-panel-2-content > div > div > div:nth-child(3) > span:nth-child(2)").textContent();
        const Loan_Number = await page.locator("#p-panel-2-content > div > div > div:nth-child(4) > span:nth-child(2)").textContent();
        const Investor_Type = await page.locator("#p-panel-2-content > div > div > div:nth-child(5) > span:nth-child(2)").textContent();
        const Case_Type = await page.locator("#p-panel-2-content > div > div > div:nth-child(6) > span:nth-child(2)").textContent();
        const Servicer_Name = await page.locator("#p-panel-2-content > div > div > div:nth-child(7) > span:nth-child(2)").textContent();
        const Property_Address = await page.locator("#p-panel-2-content > div > div > div:nth-child(8) > span:nth-child(2)").textContent();
        const Property_City = await page.locator("#p-panel-2-content > div > div > div:nth-child(9) > span:nth-child(2)").textContent();
        const Property_State = await page.locator("#p-panel-2-content > div > div > div:nth-child(10) > span:nth-child(2)").textContent();
        const Property_Zip = await page.locator("#p-panel-2-content > div > div > div:nth-child(11) > span:nth-child(2)").textContent();
        const Case_Status = await page.locator("#p-panel-2-content > div > div > div:nth-child(12) > span:nth-child(2)").textContent();
        const Workflow_Name = await page.locator("#p-panel-2-content > div > div > div:nth-child(13) > span:nth-child(2)").textContent();
        if(Case_Number?.match("23-4527") && Law_FirmID?.match(CaseNumberDetail) && 
        Borrower_Name?.match(BorrowerName) && Loan_Number?.match("79845612") && Investor_Type?.match("FHLMC") && 
        Case_Type?.match("Foreclosure") && Servicer_Name?.match("ABC Bank") && Property_Address?.match(FullAddress) 
        && Property_City?.match("Cottonwood") && Property_State?.match("AZ") && 
        Property_Zip?.match("86326") && Case_Status?.match("In-Progress") && Workflow_Name?.match("Foreclosure-TX"))
        {
            console.log("Success, Case Details Verification Pass");
            await page.waitForTimeout(3000);
        }
        else
        {
            console.log("Failure, Case Details Verification Unsuccessful");
            await page.waitForTimeout(3000);
        }
        console.log("\nCase Editing:");
        await Promise.all([
            page.waitForURL("https://qa-via.outamationlabs.com/via-ui/#/app/case-management/case-form/"+ CaseNo +"/referral-info"),
            page.locator("p-button[ptooltip='Edit Case']").click(), //Edit Case
            page.waitForTimeout(1500)
        ]);
        await Promise.all([
            page.waitForURL("https://qa-via.outamationlabs.com/via-ui/#/app/case-management/case-form/"+ CaseNo +"/document"),
            page.locator("p-button[label='Next']").click(),
            page.waitForTimeout(1500)
        ]);
        await Promise.all([
            page.waitForURL("https://qa-via.outamationlabs.com/via-ui/#/app/case-management/case-form/"+ CaseNo +"/workflow"),
            page.locator("p-button[label='Next']").click(),
            page.waitForTimeout(1500)
        ]);
        //----------------------------Case Management : Choose Workflow Module-----------------------------
        await page.locator("p-button[label='Submit']").click();
        const blankworkflowtoaster: boolean = await page.locator("p-toastitem").isVisible();
        if (blankworkflowtoaster === true) 
        {
            await expect.soft(page.locator("p-toastitem")).toContainText("Please select a workflow!");  
            await page.waitForTimeout(3000);
        } 
        else
        {
            console.log("Error: select workflow toaster message missing!");
            await page.waitForTimeout(3000);
        }
        //await page.pause();
        await page.locator("div[role='radio']").nth(2).click();
        expect.soft(await page.locator("div[role='radio']").nth(2).isChecked());
        await Promise.all([
            page.waitForURL("https://qa-via.outamationlabs.com/via-ui/#/app/case-management/cases"),
            page.locator("p-button[label='Submit']").click()
        ]);
        if(page.url().includes("app/case-management/cases"))
        {
            console.log("Workflow Information Submitted");
            console.log("Success, Case Edit Pass");
            console.log("User redirected to cases page");
            await page.waitForTimeout(3000);
        }
        else
        {   
            console.log("Workflow Information Not Submitted");
            console.log("Failure, Case Edit Unsuccessful");
            console.log("User failed to land on cases page");
            await page.waitForTimeout(3000);
        }
        var caseValues = new Array();
        await page.locator("tbody").waitFor();
        const rowss = page.locator("tbody tr");
        for(let i = 0; i < await rowss.count(); ++i)
        {
            const CaseSearchNos = await rows.nth(i).locator("td").first().textContent();
            caseValues.push(CaseSearchNos);
            for(var j in caseValues)
            {
                if((" " + CaseNo + " ").includes(caseValues[j]))
                {
                    await rowss.nth(i).locator("a").click();
                    break;
                }
            }
        }
        await page.waitForTimeout(5000);
        console.log("\nCase Search and Verifying details after editing the case:");
        const CaseNumberDetail1: any = await page.locator("#p-panel-3-content > div > div > div:nth-child(2) > span:nth-child(2)").textContent();
        console.log("Law Firm ID is : " + CaseNumberDetail1);
        if(CaseNo.match(CaseNumberDetail1))
        {
            console.log("Case found on case search page");
            console.log("Case Number Found on Search Page is : " + CaseNumberDetail1);
        }
        else
        {
            console.log("Failed to found case on case search page");
        }
        const Case_Number1 = await page.locator("#p-panel-3-content > div > div > div:nth-child(1) > span:nth-child(2)").textContent();
        const Law_FirmID1 = await page.locator("#p-panel-3-content > div > div > div:nth-child(2) > span:nth-child(2)").textContent();
        const Borrower_Name1 = await page.locator("#p-panel-3-content > div > div > div:nth-child(3) > span:nth-child(2)").textContent();
        const Loan_Number1 = await page.locator("#p-panel-3-content > div > div > div:nth-child(4) > span:nth-child(2)").textContent();
        const Investor_Type1 = await page.locator("#p-panel-3-content > div > div > div:nth-child(5) > span:nth-child(2)").textContent();
        const Case_Type1 = await page.locator("#p-panel-3-content > div > div > div:nth-child(6) > span:nth-child(2)").textContent();
        const Servicer_Name1 = await page.locator("#p-panel-3-content > div > div > div:nth-child(7) > span:nth-child(2)").textContent();
        const Property_Address1 = await page.locator("#p-panel-3-content > div > div > div:nth-child(8) > span:nth-child(2)").textContent();
        const Property_City1 = await page.locator("#p-panel-3-content > div > div > div:nth-child(9) > span:nth-child(2)").textContent();
        const Property_State1 = await page.locator("#p-panel-3-content > div > div > div:nth-child(10) > span:nth-child(2)").textContent();
        const Property_Zip1 = await page.locator("#p-panel-3-content > div > div > div:nth-child(11) > span:nth-child(2)").textContent();
        const Case_Status1 = await page.locator("#p-panel-3-content > div > div > div:nth-child(12) > span:nth-child(2)").textContent();
        const Workflow_Name1 = await page.locator("#p-panel-3-content > div > div > div:nth-child(13) > span:nth-child(2)").textContent();
        if(Case_Number1?.match("23-4527") && Law_FirmID1?.match(CaseNumberDetail1) && 
        Borrower_Name1?.match(BorrowerName) && Loan_Number1?.match("79845612") && Investor_Type1?.match("FHLMC") && 
        Case_Type1?.match("Foreclosure") && Servicer_Name1?.match("ABC Bank") && Property_Address1?.match(FullAddress) 
        && Property_City1?.match("Cottonwood") && Property_State1?.match("AZ") && 
        Property_Zip1?.match("86326") && Case_Status1?.match("In-Progress") && 
        Workflow_Name1?.match("Foreclosure-AZ-FHA"))
        {
            console.log("Success, Case Details Verification Pass after editing the case");
            await page.waitForTimeout(3000);
        }
        else
        {
            console.log("Failure, Case Details Verification Unsuccessful after editing the case");
            await page.waitForTimeout(3000);
        }
        //Case Steps
        //await page.screenshot({ path: 'casestepflowbefore.png', fullPage: true });
        console.log("\nCase Steps Flow are as below:");
        const Step_ReferralReceived = await page.locator("td:nth-child(1) > div > span > span").first().textContent();
        const Step_TitleOrder = await page.locator("td:nth-child(1) > div > span > span").nth(1).textContent();
        console.log("\nStep 1 :" + Step_ReferralReceived);
        await page.locator("text= Referral Received ").click();
        //const Step_ReferralReceived = await page.locator(".p-dialog-title").textContent();
        await page.locator("p-dropdown[id='StepStatus']").click();
        await page.waitForTimeout(1000);
        //const RRStep_Status: any = await page.locator("div[trigger='true']").textContent();
        await page.locator("div[trigger='true']").click();
        await page.waitForTimeout(1000);
        await page.locator("p-button[label='Submit']").click();
        let Toaster_ReferralReceived: any = Step_ReferralReceived + "toaster";
        Toaster_ReferralReceived = await page.locator("p-toastitem").isVisible();
        if (Toaster_ReferralReceived === true) 
        {
            await expect.soft(page.locator("p-toastitem")).toContainText("Successfully updated data!");  
            await page.waitForTimeout(3000);
        } 
        else 
        {
            console.log("Error: " + Step_ReferralReceived + "(Success) toaster message missing!");
            await page.waitForTimeout(3000);
        }
        await page.locator("tbody").waitFor();
        let RR_Badge: any = await page.locator("p-badge").first().getAttribute("status");
        if (RR_Badge.includes("Completed")) 
        {
            console.log(Step_ReferralReceived?.trim() + " step completed");
            await page.waitForTimeout(3000);
        } 
        else
        {
            console.log(Step_ReferralReceived?.trim() + " step failed");
            await page.waitForTimeout(3000);
        }
        await page.locator("tbody").waitFor();
        console.log("\nStep 2 :" + Step_TitleOrder);
        await page.locator("p-treetabletoggler").nth(1).click();
        await page.locator("text= Title Requested ").click();
        const Step_TitleRequested = await page.locator(".p-dialog-title").textContent();
        await page.locator("p-dropdown[id='TitleSearchType']").click();
        await page.waitForTimeout(1000);
        await page.locator("li[aria-label='Full Search']").click();
        await page.waitForTimeout(1000);
        await page.locator("p-dropdown[id='StepStatus']").click();
        await page.waitForTimeout(1000);
        //const TReqStep_Status: any = await page.locator("div[trigger='true']").textContent();
        await page.locator("div[trigger='true']").click();
        await page.waitForTimeout(1000);
        await page.locator("p-button[label='Submit']").click();
        let Toaster_TitleRequested: any = Step_TitleRequested + "toaster";
        Toaster_TitleRequested = await page.locator("p-toastitem").isVisible();
        if (Toaster_TitleRequested === true) 
        {
            await expect.soft(page.locator("p-toastitem")).toContainText("Successfully updated data!");  
            await page.waitForTimeout(3000);
        } 
        else 
        {
            console.log("Error: " + Step_TitleRequested + "(Success) toaster message missing!");
            await page.waitForTimeout(3000);
        }
        await page.locator("p-treetabletoggler").nth(1).click();
        await page.locator("text= Title Requested ").waitFor();
        let TRec_Badge: any = await page.locator("p-badge").nth(2).getAttribute("status");
        if (TRec_Badge.includes("Completed"))
        {
            console.log(Step_TitleRequested + " step completed");
            await page.waitForTimeout(3000);
        } 
        else 
        {
            console.log(Step_TitleRequested + " step failed");
            await page.waitForTimeout(3000);
        }
        await page.locator("text= Title Received ").click();
        const Step_TitleReceived = await page.locator(".p-dialog-title").textContent();
        await page.waitForTimeout(1000);
        await page.locator("p-dropdown[id='StepStatus']").click();
        await page.waitForTimeout(1000);
        //const TRecStep_Status: any = await page.locator("div[trigger='true']").textContent();
        await page.locator("div[trigger='true']").click();
        await page.waitForTimeout(1000);
        await page.locator("p-button[label='Submit']").click();
        let Toaster_TitleReceived: any = Step_TitleReceived + "toaster";
        Toaster_TitleReceived = await page.locator("p-toastitem").isVisible();
        if (Toaster_TitleReceived === true)
        {
            await expect.soft(page.locator("p-toastitem")).toContainText("Successfully updated data!");  
            await page.waitForTimeout(3000);
        } 
        else 
        {
            console.log("Error: " + Step_TitleReceived + "(Success) toaster message missing!");
            await page.waitForTimeout(3000);
        }
        await page.locator("p-treetabletoggler").nth(1).click();
        await page.locator("text= Title Requested ").waitFor();
        let TReq_Badge: any = await page.locator("p-badge").nth(3).getAttribute("status");
        if (TReq_Badge.includes("Completed"))
        {
            console.log(Step_TitleReceived + " step completed");
            await page.waitForTimeout(3000);
        }
        else
        {
            console.log(Step_TitleReceived + " step failed");
            await page.waitForTimeout(3000);
        }
        await page.locator("text= Title Review ").first().click();
        const Step_TitleReview = await page.locator(".p-dialog-title").textContent();
        await page.waitForTimeout(1000);
        await page.locator("p-dropdown[id='StepStatus']").click();
        await page.waitForTimeout(1000);
        //const TRevStep_Status: any = await page.locator("div[trigger='true']").textContent();
        await page.locator("div[trigger='true']").click();
        await page.waitForTimeout(1000);
        await page.locator("p-button[label='Submit']").click();
        let Toaster_TitleReview: any = Step_TitleReview + "toaster";
        Toaster_TitleReview = await page.locator("p-toastitem").isVisible();
        if (Toaster_TitleReview === true)
        {
            await expect.soft(page.locator("p-toastitem")).toContainText("Successfully updated data!");  
            await page.waitForTimeout(3000);
        } 
        else 
        {
            console.log("Error: " + Step_TitleReview + "(Success) toaster message missing!");
            await page.waitForTimeout(3000);
        }
        await page.locator("p-treetabletoggler").nth(1).click();
        await page.locator("text= Title Review ").first().waitFor();
        let TRev_Badge: any = await page.locator("p-badge").nth(5).getAttribute("status");
        if (TRev_Badge.includes("Completed"))
        {
            console.log(Step_TitleReview + " step completed");
            await page.waitForTimeout(3000);
        }
        else
        {
            console.log(Step_TitleReview + " step failed");
            await page.waitForTimeout(3000);
        }
        await page.locator("p-treetabletoggler").nth(1).click();
        let TOrder_Badge: any = await page.locator("p-badge").nth(1).getAttribute("status");
        if (TOrder_Badge.includes("Completed"))
        {
            console.log(Step_TitleOrder?.trim() + " step completed");
            await page.waitForTimeout(3000);
        }
        else
        {
            console.log(Step_TitleOrder?.trim() + " step failed");
            await page.waitForTimeout(3000);
        }
        const Step_FHALetter = await page.locator("td:nth-child(1) > div > span > span").nth(2).textContent();
        console.log("\nStep 3 :" + Step_FHALetter);
        await page.locator("text= FHA Letter ").click();
        //const Step_FHALetter = await page.locator(".p-dialog-title").textContent();
        await page.waitForTimeout(1000);
        await page.locator("p-dropdown[id='StepStatus']").click();
        await page.waitForTimeout(1000);
        //const FHAStep_Status: any = await page.locator("div[trigger='true']").textContent();
        await page.locator("div[trigger='true']").click();
        await page.waitForTimeout(1000);
        await page.locator("p-button[label='Submit']").click();
        let Toaster_FHALetter: any = Step_FHALetter + "toaster";
        Toaster_FHALetter = await page.locator("p-toastitem").isVisible();
        if (Toaster_FHALetter === true)
        {
            await expect.soft(page.locator("p-toastitem")).toContainText("Successfully updated data!");  
            await page.waitForTimeout(3000);
        } 
        else 
        {
            console.log("Error: " + Step_FHALetter + "(Success) toaster message missing!");
            await page.waitForTimeout(3000);
        }
        await page.locator("text= FHA Letter ").waitFor();
        let FHA_Badge: any = await page.locator("p-badge").nth(2).getAttribute("status");
        if (FHA_Badge.includes("Completed"))
        {
            console.log(Step_FHALetter?.trim() + " step completed");
            await page.waitForTimeout(3000);
        }
        else
        {
            console.log(Step_FHALetter?.trim() + " step failed");
            await page.waitForTimeout(3000);
        }
        const Step_Complaint = await page.locator("td:nth-child(1) > div > span > span").nth(3).textContent();
        console.log("\nStep 4 :" + Step_Complaint);
        await page.locator("p-treetabletoggler").nth(3).click();
        await page.locator("text= Prepare Complaint ").click();
        const Step_PrepareComplaint = await page.locator(".p-dialog-title").textContent();
        await page.waitForTimeout(1000);
        await page.locator("p-dropdown[id='StepStatus']").click();
        await page.waitForTimeout(1000);
        //const PCStep_Status: any = await page.locator("div[trigger='true']").first().textContent();
        await page.locator("div[trigger='true']").click();
        await page.waitForTimeout(1000);
        await page.locator("p-button[label='Submit']").click();
        let Toaster_PrepareComplaint: any = Step_PrepareComplaint + "toaster";
        Toaster_PrepareComplaint = await page.locator("p-toastitem").isVisible();
        if (Toaster_PrepareComplaint === true)
        {
            await expect.soft(page.locator("p-toastitem")).toContainText("Successfully updated data!");  
            await page.waitForTimeout(3000);
        } 
        else 
        {
            console.log("Error: " + Step_PrepareComplaint + "(Success) toaster message missing!");
            await page.waitForTimeout(3000);
        }
        await page.locator("p-treetabletoggler").nth(3).click();
        await page.locator("text= Prepare Complaint ").waitFor();
        let PC_Badge: any = await page.locator("p-badge").nth(5).getAttribute("status");
        if (PC_Badge.includes("Completed"))
        {
            console.log(Step_PrepareComplaint + " step completed");
            await page.waitForTimeout(3000);
        }
        else
        {
            console.log(Step_PrepareComplaint + " step failed");
            await page.waitForTimeout(3000);
        }
        await page.locator("text= Attorney Review And Approve Complaint ").click();
        const Step_AttorneyReview = await page.locator(".p-dialog-title").textContent();
        await page.waitForTimeout(1000);
        await page.locator("p-dropdown[id='StepStatus']").click();
        await page.waitForTimeout(1000);
        //const ARStep_Status: any = await page.locator("div[trigger='true']").first().textContent();
        await page.locator("div[trigger='true']").last().click();
        await page.waitForTimeout(1000);
        await page.locator("p-button[label='Submit']").click();
        let Toaster_AttorneyReview: any = Step_AttorneyReview + "toaster";
        Toaster_AttorneyReview = await page.locator("p-toastitem").isVisible();
        if (Toaster_AttorneyReview === true)
        {
            await expect.soft(page.locator("p-toastitem")).toContainText("Successfully updated data!");  
            await page.waitForTimeout(3000);
        } 
        else 
        {
            console.log("Error: " + Step_AttorneyReview + "(Success) toaster message missing!");
            await page.waitForTimeout(3000);
        }
        await page.locator("p-treetabletoggler").nth(3).click();
        await page.locator("text= Attorney Review And Approve Complaint ").waitFor();
        let AR_Badge: any = await page.locator("p-badge").nth(6).getAttribute("status");
        //console.log("Attorney Review : " + AR_Badge);
        if (AR_Badge.includes("Completed"))
        {
            console.log(Step_AttorneyReview + " step completed");
            await page.waitForTimeout(3000);
        }
        else
        {
            console.log(Step_AttorneyReview + " step failed");
            await page.waitForTimeout(3000);
        }
        await page.locator("text= Revise The Complaint ").click();
        const Step_ReviseComplaint = await page.locator(".p-dialog-title").textContent();
        await page.waitForTimeout(1000);
        await page.locator("p-dropdown[id='StepStatus']").click();
        await page.waitForTimeout(1000);
        //const ARStep_Status: any = await page.locator("div[trigger='true']").first().textContent();
        await page.locator("div[trigger='true']").click();
        await page.waitForTimeout(1000);
        await page.locator("p-button[label='Submit']").click();
        let Toaster_ReviseComplaint: any = Step_ReviseComplaint + "toaster";
        Toaster_ReviseComplaint = await page.locator("p-toastitem").isVisible();
        if (Toaster_ReviseComplaint === true)
        {
            await expect.soft(page.locator("p-toastitem")).toContainText("Successfully updated data!");  
            await page.waitForTimeout(3000);
        } 
        else 
        {
            console.log("Error: " + Step_ReviseComplaint + "(Success) toaster message missing!");
            await page.waitForTimeout(3000);
        }
        await page.locator("p-treetabletoggler").nth(3).click();
        await page.locator("text= Revise The Complaint ").waitFor();
        let AR_Badge1: any = await page.locator("p-badge").nth(6).getAttribute("status");
        let RC_Badge: any = await page.locator("p-badge").nth(7).getAttribute("status");
        if (AR_Badge1.includes("In-Progress") && RC_Badge.includes("Completed"))
        {
            console.log(Step_ReviseComplaint + " step completed");
            await page.waitForTimeout(3000);
        }
        else
        {
            console.log(Step_ReviseComplaint + " step failed");
            await page.waitForTimeout(3000);
        }
        await page.locator("text= Attorney Review And Approve Complaint ").click();
        const Step_AttorneyReview1 = await page.locator(".p-dialog-title").textContent();
        await page.waitForTimeout(1000);
        await page.locator("p-dropdown[id='StepStatus']").click();
        await page.waitForTimeout(1000);
        //const ARStep_Status: any = await page.locator("div[trigger='true']").first().textContent();
        await page.locator("div[trigger='true']").first().click();
        await page.waitForTimeout(1000);
        await page.locator("p-button[label='Submit']").click();
        let Toaster_AttorneyReview1: any = Step_AttorneyReview + "toaster";
        Toaster_AttorneyReview1 = await page.locator("p-toastitem").isVisible();
        if (Toaster_AttorneyReview1 === true)
        {
            await expect.soft(page.locator("p-toastitem")).toContainText("Successfully updated data!");  
            await page.waitForTimeout(3000);
        } 
        else 
        {
            console.log("Error: " + Step_AttorneyReview + "(Success) toaster message missing!");
            await page.waitForTimeout(3000);
        }
        await page.locator("p-treetabletoggler").nth(3).click();
        await page.locator("text= Attorney Review And Approve Complaint ").waitFor();
        let AR_Badge2: any = await page.locator("p-badge").nth(6).getAttribute("status");
        //console.log("Attorney Review : " + AR_Badge);
        if (AR_Badge2.includes("Completed"))
        {
            console.log(Step_AttorneyReview + " step completed after " + Step_ReviseComplaint);
            await page.waitForTimeout(3000);
        }
        else
        {
            console.log(Step_AttorneyReview + " step failed after " + Step_ReviseComplaint);
            await page.waitForTimeout(3000);
        }
        await page.locator("text= Send Complaint For Client Approval ").click();
        const Step_SendComplaint = await page.locator(".p-dialog-title").textContent();
        await page.waitForTimeout(1000);
        await page.locator("p-dropdown[id='StepStatus']").click();
        await page.waitForTimeout(1000);
        //const ARStep_Status: any = await page.locator("div[trigger='true']").first().textContent();
        await page.locator("div[trigger='true']").click();
        await page.waitForTimeout(1000);
        await page.locator("p-button[label='Submit']").click();
        let Toaster_SendComplaint: any = Step_SendComplaint + "toaster";
        Toaster_SendComplaint = await page.locator("p-toastitem").isVisible();
        if (Toaster_SendComplaint === true)
        {
            await expect.soft(page.locator("p-toastitem")).toContainText("Successfully updated data!");  
            await page.waitForTimeout(3000);
        } 
        else 
        {
            console.log("Error: " + Step_SendComplaint + "(Success) toaster message missing!");
            await page.waitForTimeout(3000);
        }
        await page.locator("p-treetabletoggler").nth(3).click();
        await page.locator("text= Send Complaint For Client Approval ").waitFor();
        let SC_Badge: any = await page.locator("p-badge").nth(8).getAttribute("status");
        if (SC_Badge.includes("Completed"))
        {
            console.log(Step_SendComplaint + " step completed");
            await page.waitForTimeout(3000);
        }
        else
        {
            console.log(Step_SendComplaint + " step failed");
            await page.waitForTimeout(3000);
        }
        await page.locator("text= Received Approved Complaint From Client ").click();
        const Step_ApproveComplaint = await page.locator(".p-dialog-title").textContent();
        await page.waitForTimeout(1000);
        await page.locator("p-dropdown[id='StepStatus']").click();
        await page.waitForTimeout(1000);
        //const ARStep_Status: any = await page.locator("div[trigger='true']").first().textContent();
        await page.locator("div[trigger='true']").click();
        await page.waitForTimeout(1000);
        await page.locator("p-button[label='Submit']").click();
        let Toaster_ApproveComplaint: any = Step_ApproveComplaint + "toaster";
        Toaster_ApproveComplaint = await page.locator("p-toastitem").isVisible();
        if (Toaster_ApproveComplaint === true)
        {
            await expect.soft(page.locator("p-toastitem")).toContainText("Successfully updated data!");  
            await page.waitForTimeout(3000);
        } 
        else 
        {
            console.log("Error: " + Step_ApproveComplaint + "(Success) toaster message missing!");
            await page.waitForTimeout(3000);
        }
        await page.locator("p-treetabletoggler").nth(3).click();
        await page.locator("text= Received Approved Complaint From Client ").waitFor();
        let AC_Badge: any = await page.locator("p-badge").nth(9).getAttribute("status");
        if (AC_Badge.includes("Completed"))
        {
            console.log(Step_ApproveComplaint + " step completed");
            await page.waitForTimeout(3000);
        }
        else
        {
            console.log(Step_ApproveComplaint + " step failed");
            await page.waitForTimeout(3000);
        }
        await page.locator("text= Submit Complaint For Filling ").click();
        const Step_SubmitComplaint = await page.locator(".p-dialog-title").textContent();
        await page.waitForTimeout(1000);
        await page.locator("p-dropdown[id='StepStatus']").click();
        await page.waitForTimeout(1000);
        //const ARStep_Status: any = await page.locator("div[trigger='true']").first().textContent();
        await page.locator("div[trigger='true']").click();
        await page.waitForTimeout(1000);
        await page.locator("p-button[label='Submit']").click();
        let Toaster_SubmitComplaint: any = Step_SubmitComplaint + "toaster";
        Toaster_SubmitComplaint = await page.locator("p-toastitem").isVisible();
        if (Toaster_SubmitComplaint === true)
        {
            await expect.soft(page.locator("p-toastitem")).toContainText("Successfully updated data!");  
            await page.waitForTimeout(3000);
        } 
        else 
        {
            console.log("Error: " + Step_SubmitComplaint + "(Success) toaster message missing!");
            await page.waitForTimeout(3000);
        }
        await page.locator("p-treetabletoggler").nth(3).click();
        await page.locator("text= Submit Complaint For Filling ").waitFor();
        let SubmitC_Badge: any = await page.locator("p-badge").nth(11).getAttribute("status");
        if (SubmitC_Badge.includes("Completed"))
        {
            console.log(Step_SubmitComplaint + " step completed");
            await page.waitForTimeout(3000);
        }
        else
        {
            console.log(Step_SubmitComplaint + " step failed");
            await page.waitForTimeout(3000);
        }
        await page.locator("text= First Legal Filed ").click();
        const Step_FirstLegalFiled = await page.locator(".p-dialog-title").textContent();
        await page.waitForTimeout(1000);
        await page.locator("p-dropdown[id='StepStatus']").click();
        await page.waitForTimeout(1000);
        //const ARStep_Status: any = await page.locator("div[trigger='true']").first().textContent();
        await page.locator("div[trigger='true']").click();
        await page.waitForTimeout(1000);
        await page.locator("p-button[label='Submit']").click();
        let Toaster_FirstLegalFiled: any = Step_FirstLegalFiled + "toaster";
        Toaster_FirstLegalFiled = await page.locator("p-toastitem").isVisible();
        if (Toaster_FirstLegalFiled === true)
        {
            await expect.soft(page.locator("p-toastitem")).toContainText("Successfully updated data!");  
            await page.waitForTimeout(3000);
        } 
        else 
        {
            console.log("Error: " + Step_FirstLegalFiled + "(Success) toaster message missing!");
            await page.waitForTimeout(3000);
        }
        await page.locator("p-treetabletoggler").nth(3).click();
        await page.locator("text= First Legal Filed ").waitFor();
        let Legal_Badge: any = await page.locator("p-badge").nth(13).getAttribute("status");
        if (Legal_Badge.includes("Completed"))
        {
            console.log(Step_FirstLegalFiled + " step completed");
            await page.waitForTimeout(3000);
        }
        else
        {
            console.log(Step_FirstLegalFiled + " step failed");
            await page.waitForTimeout(3000);
        }
        await page.locator("p-treetabletoggler").nth(3).click();
        let Complaint_Badge: any = await page.locator("p-badge").nth(4).getAttribute("status");
        if (Complaint_Badge.includes("Completed"))
        {
            console.log(Step_Complaint?.trim() + " step completed");
            await page.waitForTimeout(3000);
        }
        else
        {
            console.log(Step_Complaint?.trim() + " step failed");
            await page.waitForTimeout(3000);
        }
        const Step_Service = await page.locator("td:nth-child(1) > div > span > span").nth(4).textContent();
        console.log("\nStep 5 :" + Step_Service);
        await page.locator("p-treetabletoggler").nth(4).click();
        await page.locator("text= Service Started ").click();
        const Step_ServiceStarted = await page.locator(".p-dialog-title").textContent();
        await page.waitForTimeout(1000);
        await page.locator("p-dropdown[id='StepStatus']").click();
        await page.waitForTimeout(1000);
        //const PCStep_Status: any = await page.locator("div[trigger='true']").first().textContent();
        await page.locator("div[trigger='true']").click();
        await page.waitForTimeout(1000);
        await page.locator("p-button[label='Submit']").click();
        let Toaster_ServiceStarted: any = Step_ServiceStarted + "toaster";
        Toaster_ServiceStarted = await page.locator("p-toastitem").isVisible();
        if (Toaster_ServiceStarted === true)
        {
            await expect.soft(page.locator("p-toastitem")).toContainText("Successfully updated data!");  
            await page.waitForTimeout(3000);
        } 
        else 
        {
            console.log("Error: " + Step_ServiceStarted + "(Success) toaster message missing!");
            await page.waitForTimeout(3000);
        }
        await page.locator("p-treetabletoggler").nth(4).click();
        await page.locator("text= Service Started ").waitFor();
        let SS_Badge: any = await page.locator("p-badge").nth(6).getAttribute("status");
        if (SS_Badge.includes("Completed"))
        {
            console.log(Step_ServiceStarted + " step completed");
            await page.waitForTimeout(3000);
        }
        else
        {
            console.log(Step_ServiceStarted + " step failed");
            await page.waitForTimeout(3000);
        }
        await page.locator("text= Service Completed ").click();
        const Step_ServiceCompleted = await page.locator(".p-dialog-title").textContent();
        await page.waitForTimeout(1000);
        await page.locator("p-dropdown[id='StepStatus']").click();
        await page.waitForTimeout(1000);
        //const PCStep_Status: any = await page.locator("div[trigger='true']").first().textContent();
        await page.locator("div[trigger='true']").click();
        await page.waitForTimeout(1000);
        await page.locator("p-button[label='Submit']").click();
        let Toaster_ServiceCompleted: any = Step_ServiceCompleted + "toaster";
        Toaster_ServiceCompleted = await page.locator("p-toastitem").isVisible();
        if (Toaster_ServiceCompleted === true)
        {
            await expect.soft(page.locator("p-toastitem")).toContainText("Successfully updated data!");  
            await page.waitForTimeout(3000);
        } 
        else 
        {
            console.log("Error: " + Step_ServiceCompleted + "(Success) toaster message missing!");
            await page.waitForTimeout(3000);
        }
        await page.locator("p-treetabletoggler").nth(4).click();
        await page.locator("text= Service Completed ").waitFor();
        let SComp_Badge: any = await page.locator("p-badge").nth(7).getAttribute("status");
        if (SComp_Badge.includes("Completed"))
        {
            console.log(Step_ServiceCompleted + " step completed");
            await page.waitForTimeout(3000);
        }
        else
        {
            console.log(Step_ServiceCompleted + " step failed");
            await page.waitForTimeout(3000);
        }
        await page.locator("text= Answer Period Expiration ").click();
        const Step_AnsPeriodExp = await page.locator(".p-dialog-title").textContent();
        await page.waitForTimeout(1000);
        await page.locator("p-dropdown[id='StepStatus']").click();
        await page.waitForTimeout(1000);
        //const PCStep_Status: any = await page.locator("div[trigger='true']").first().textContent();
        await page.locator("div[trigger='true']").click();
        await page.waitForTimeout(1000);
        await page.locator("p-button[label='Submit']").click();
        let Toaster_AnsPeriodExp: any = Step_AnsPeriodExp + "toaster";
        Toaster_AnsPeriodExp = await page.locator("p-toastitem").isVisible();
        if (Toaster_AnsPeriodExp === true)
        {
            await expect.soft(page.locator("p-toastitem")).toContainText("Successfully updated data!");  
            await page.waitForTimeout(3000);
        } 
        else 
        {
            console.log("Error: " + Step_AnsPeriodExp + "(Success) toaster message missing!");
            await page.waitForTimeout(3000);
        }
        await page.locator("p-treetabletoggler").nth(4).click();
        await page.locator("text= Answer Period Expiration ").waitFor();
        let AnsPerExp_Badge: any = await page.locator("p-badge").nth(9).getAttribute("status");
        if (AnsPerExp_Badge.includes("Completed"))
        {
            console.log(Step_AnsPeriodExp + " step completed");
            await page.waitForTimeout(3000);
        }
        else
        {
            console.log(Step_AnsPeriodExp + " step failed");
            await page.waitForTimeout(3000);
        }
        await page.locator("p-treetabletoggler").nth(4).click();
        let Service_Badge: any = await page.locator("p-badge").nth(5).getAttribute("status");
        if (Service_Badge.includes("Completed"))
        {
            console.log(Step_Service?.trim() + " step completed");
            await page.waitForTimeout(3000);
        }
        else
        {
            console.log(Step_Service?.trim() + " step failed");
            await page.waitForTimeout(3000);
        }
        const Step_Judgement = await page.locator("td:nth-child(1) > div > span > span").nth(5).textContent();
        console.log("\nStep 6 :" + Step_Judgement);
        await page.locator("p-treetabletoggler").nth(5).click();
        await page.locator("text= Request Judgement Figures ").click();
        const Step_ReqJudgement = await page.locator(".p-dialog-title").textContent();
        await page.waitForTimeout(1000);
        await page.locator("p-dropdown[id='StepStatus']").click();
        await page.waitForTimeout(1000);
        //const PCStep_Status: any = await page.locator("div[trigger='true']").first().textContent();
        await page.locator("div[trigger='true']").click();
        await page.waitForTimeout(1000);
        await page.locator("p-button[label='Submit']").click();
        let Toaster_ReqJudgement: any = Step_ReqJudgement + "toaster";
        Toaster_ReqJudgement = await page.locator("p-toastitem").isVisible();
        if (Toaster_ReqJudgement === true)
        {
            await expect.soft(page.locator("p-toastitem")).toContainText("Successfully updated data!");  
            await page.waitForTimeout(3000);
        } 
        else 
        {
            console.log("Error: " + Step_ReqJudgement + "(Success) toaster message missing!");
            await page.waitForTimeout(3000);
        }
        await page.locator("p-treetabletoggler").nth(5).click();
        await page.locator("text= Request Judgement Figures ").waitFor();
        let ReqJudgement_Badge: any = await page.locator("p-badge").nth(7).getAttribute("status");
        if (ReqJudgement_Badge.includes("Completed"))
        {
            console.log(Step_ReqJudgement + " step completed");
            await page.waitForTimeout(3000);
        }
        else
        {
            console.log(Step_ReqJudgement + " step failed");
            await page.waitForTimeout(3000);
        }
        await page.locator("text= Receive Judgement Figures ").click();
        const Step_RecJudgement = await page.locator(".p-dialog-title").textContent();
        await page.waitForTimeout(1000);
        await page.locator("p-dropdown[id='StepStatus']").click();
        await page.waitForTimeout(1000);
        //const PCStep_Status: any = await page.locator("div[trigger='true']").first().textContent();
        await page.locator("div[trigger='true']").click();
        await page.waitForTimeout(1000);
        await page.locator("p-button[label='Submit']").click();
        let Toaster_RecJudgement: any = Step_RecJudgement + "toaster";
        Toaster_RecJudgement = await page.locator("p-toastitem").isVisible();
        if (Toaster_RecJudgement === true)
        {
            await expect.soft(page.locator("p-toastitem")).toContainText("Successfully updated data!");  
            await page.waitForTimeout(3000);
        } 
        else 
        {
            console.log("Error: " + Step_RecJudgement + "(Success) toaster message missing!");
            await page.waitForTimeout(3000);
        }
        await page.locator("p-treetabletoggler").nth(5).click();
        await page.locator("text= Receive Judgement Figures ").waitFor();
        let RecJudgement_Badge: any = await page.locator("p-badge").nth(8).getAttribute("status");
        if (RecJudgement_Badge.includes("Completed"))
        {
            console.log(Step_RecJudgement + " step completed");
            await page.waitForTimeout(3000);
        }
        else
        {
            console.log(Step_RecJudgement + " step failed");
            await page.waitForTimeout(3000);
        }
        await page.locator("text= Judgement Prepare ").click();
        const Step_JudgementPrepare = await page.locator(".p-dialog-title").textContent();
        await page.waitForTimeout(1000);
        await page.locator("p-dropdown[id='StepStatus']").click();
        await page.waitForTimeout(1000);
        //const PCStep_Status: any = await page.locator("div[trigger='true']").first().textContent();
        await page.locator("div[trigger='true']").click();
        await page.waitForTimeout(1000);
        await page.locator("p-button[label='Submit']").click();
        let Toaster_JudgementPrepare: any = Step_JudgementPrepare + "toaster";
        Toaster_JudgementPrepare = await page.locator("p-toastitem").isVisible();
        if (Toaster_JudgementPrepare === true)
        {
            await expect.soft(page.locator("p-toastitem")).toContainText("Successfully updated data!");  
            await page.waitForTimeout(3000);
        } 
        else
        {
            console.log("Error: " + Step_JudgementPrepare + "(Success) toaster message missing!");
            await page.waitForTimeout(3000);
        }
        await page.locator("p-treetabletoggler").nth(5).click();
        await page.locator("text= Judgement Prepare ").waitFor();
        let JudgementPrepare_Badge: any = await page.locator("p-badge").nth(10).getAttribute("status");
        if (JudgementPrepare_Badge.includes("Completed"))
        {
            console.log(Step_JudgementPrepare + " step completed");
            await page.waitForTimeout(3000);
        }
        else
        {
            console.log(Step_JudgementPrepare + " step failed");
            await page.waitForTimeout(3000);
        }
        await page.locator("text= Attorney Review & Approve Judgement ").click();
        const Step_ApproveJudgement = await page.locator(".p-dialog-title").textContent();
        await page.waitForTimeout(1000);
        await page.locator("p-dropdown[id='StepStatus']").click();
        await page.waitForTimeout(1000);
        //const PCStep_Status: any = await page.locator("div[trigger='true']").first().textContent();
        await page.locator("div[trigger='true']").click();
        await page.waitForTimeout(1000);
        await page.locator("p-button[label='Submit']").click();
        let Toaster_ApproveJudgement: any = Step_ApproveJudgement + "toaster";
        Toaster_ApproveJudgement = await page.locator("p-toastitem").isVisible();
        if (Toaster_ApproveJudgement === true)
        {
            await expect.soft(page.locator("p-toastitem")).toContainText("Successfully updated data!");  
            await page.waitForTimeout(3000);
        } 
        else 
        {
            console.log("Error: " + Step_ApproveJudgement + "(Success) toaster message missing!");
            await page.waitForTimeout(3000);
        }
        await page.locator("p-treetabletoggler").nth(5).click();
        await page.locator("text= Attorney Review & Approve Judgement ").waitFor();
        let ApproveJudgement_Badge: any = await page.locator("p-badge").nth(11).getAttribute("status");
        if (ApproveJudgement_Badge.includes("Completed"))
        {
            console.log(Step_ApproveJudgement + " step completed");
            await page.waitForTimeout(3000);
        }
        else
        {
            console.log(Step_ApproveJudgement + " step failed");
            await page.waitForTimeout(3000);
        }
        await page.locator("text= Submit Judgement To Court ").click();
        const Step_SubmitJudgement = await page.locator(".p-dialog-title").textContent();
        await page.waitForTimeout(1000);
        await page.locator("p-dropdown[id='StepStatus']").click();
        await page.waitForTimeout(1000);
        //const PCStep_Status: any = await page.locator("div[trigger='true']").first().textContent();
        await page.locator("div[trigger='true']").click();
        await page.waitForTimeout(1000);
        await page.locator("p-button[label='Submit']").click();
        let Toaster_SubmitJudgement: any = Step_SubmitJudgement + "toaster";
        Toaster_SubmitJudgement = await page.locator("p-toastitem").isVisible();
        if (Toaster_SubmitJudgement === true)
        {
            await expect.soft(page.locator("p-toastitem")).toContainText("Successfully updated data!");  
            await page.waitForTimeout(3000);
        } 
        else 
        {
            console.log("Error: " + Step_SubmitJudgement + "(Success) toaster message missing!");
            await page.waitForTimeout(3000);
        }
        await page.locator("p-treetabletoggler").nth(5).click();
        await page.locator("text= Submit Judgement To Court ").waitFor();
        let SubmitJudgement_Badge: any = await page.locator("p-badge").nth(12).getAttribute("status");
        if (SubmitJudgement_Badge.includes("Completed"))
        {
            console.log(Step_SubmitJudgement + " step completed");
            await page.waitForTimeout(3000);
        }
        else
        {
            console.log(Step_SubmitJudgement + " step failed");
            await page.waitForTimeout(3000);
        }
        await page.locator("text= Judgement Entered ").click();
        const Step_JudgementEntered = await page.locator(".p-dialog-title").textContent();
        await page.waitForTimeout(1000);
        await page.locator("p-dropdown[id='StepStatus']").click();
        await page.waitForTimeout(1000);
        //const PCStep_Status: any = await page.locator("div[trigger='true']").first().textContent();
        await page.locator("div[trigger='true']").click();
        await page.waitForTimeout(1000);
        await page.locator("p-button[label='Submit']").click();
        let Toaster_JudgementEntered: any = Step_JudgementEntered + "toaster";
        Toaster_JudgementEntered = await page.locator("p-toastitem").isVisible();
        if (Toaster_JudgementEntered === true)
        {
            await expect.soft(page.locator("p-toastitem")).toContainText("Successfully updated data!");  
            await page.waitForTimeout(3000);
        } 
        else 
        {
            console.log("Error: " + Step_JudgementEntered + "(Success) toaster message missing!");
            await page.waitForTimeout(3000);
        }
        await page.locator("p-treetabletoggler").nth(5).click();
        await page.locator("text= Judgement Entered ").waitFor();
        let JudgementEntered_Badge: any = await page.locator("p-badge").nth(13).getAttribute("status");
        if (JudgementEntered_Badge.includes("Completed"))
        {
            console.log(Step_JudgementEntered + " step completed");
            await page.waitForTimeout(3000);
        }
        else
        {
            console.log(Step_JudgementEntered + " step failed");
            await page.waitForTimeout(3000);
        }
        await page.locator("p-treetabletoggler").nth(5).click();
        let Judgement_Badge: any = await page.locator("p-badge").nth(6).getAttribute("status");
        if (Judgement_Badge.includes("Completed"))
        {
            console.log(Step_Judgement?.trim() + " step completed");
            await page.waitForTimeout(3000);
        }
        else
        {
            console.log(Step_Judgement?.trim() + " step failed");
            await page.waitForTimeout(3000);
        }
        const Step_Sale = await page.locator("td:nth-child(1) > div > span > span").nth(6).textContent();
        console.log("\nStep 7 :" + Step_Sale);
        await page.locator("p-treetabletoggler").nth(6).click();
        await page.locator("text= Request Bidding Instruction ").click();
        const Step_ReqBidding = await page.locator(".p-dialog-title").textContent();
        await page.waitForTimeout(1000);
        await page.locator("p-dropdown[id='StepStatus']").click();
        await page.waitForTimeout(1000);
        //const PCStep_Status: any = await page.locator("div[trigger='true']").first().textContent();
        await page.locator("div[trigger='true']").click();
        await page.waitForTimeout(1000);
        await page.locator("p-button[label='Submit']").click();
        let Toaster_ReqBidding: any = Step_ReqBidding + "toaster";
        Toaster_ReqBidding = await page.locator("p-toastitem").isVisible();
        if (Toaster_ReqBidding === true)
        {
            await expect.soft(page.locator("p-toastitem")).toContainText("Successfully updated data!");  
            await page.waitForTimeout(3000);
        } 
        else 
        {
            console.log("Error: " + Step_ReqBidding + "(Success) toaster message missing!");
            await page.waitForTimeout(3000);
        }
        await page.locator("p-treetabletoggler").nth(6).click();
        await page.locator("text= Request Bidding Instruction ").waitFor();
        let ReqBidding_Badge: any = await page.locator("p-badge").nth(8).getAttribute("status");
        if (ReqBidding_Badge.includes("Completed"))
        {
            console.log(Step_ReqBidding + " step completed");
            await page.waitForTimeout(3000);
        }
        else
        {
            console.log(Step_ReqBidding + " step failed");
            await page.waitForTimeout(3000);
        }
        await page.locator("text= Receive Bidding Instruction ").click();
        const Step_RecBidding = await page.locator(".p-dialog-title").textContent();
        await page.waitForTimeout(1000);
        await page.locator("p-dropdown[id='StepStatus']").click();
        await page.waitForTimeout(1000);
        //const PCStep_Status: any = await page.locator("div[trigger='true']").first().textContent();
        await page.locator("div[trigger='true']").click();
        await page.waitForTimeout(1000);
        await page.locator("p-button[label='Submit']").click();
        let Toaster_RecBidding: any = Step_RecBidding + "toaster";
        Toaster_RecBidding = await page.locator("p-toastitem").isVisible();
        if (Toaster_RecBidding === true)
        {
            await expect.soft(page.locator("p-toastitem")).toContainText("Successfully updated data!");  
            await page.waitForTimeout(3000);
        } 
        else 
        {
            console.log("Error: " + Step_RecBidding + "(Success) toaster message missing!");
            await page.waitForTimeout(3000);
        }
        await page.locator("p-treetabletoggler").nth(6).click();
        await page.locator("text= Receive Bidding Instruction ").waitFor();
        let RecBidding_Badge: any = await page.locator("p-badge").nth(9).getAttribute("status");
        if (RecBidding_Badge.includes("Completed"))
        {
            console.log(Step_RecBidding + " step completed");
            await page.waitForTimeout(3000);
        }
        else
        {
            console.log(Step_RecBidding + " step failed");
            await page.waitForTimeout(3000);
        }
        await page.locator("text= Sale Bid Confirmed ").click();
        const Step_SaleBid = await page.locator(".p-dialog-title").textContent();
        await page.waitForTimeout(1000);
        await page.locator("p-dropdown[id='StepStatus']").click();
        await page.waitForTimeout(1000);
        //const PCStep_Status: any = await page.locator("div[trigger='true']").first().textContent();
        await page.locator("div[trigger='true']").click();
        await page.waitForTimeout(1000);
        await page.locator("p-button[label='Submit']").click();
        let Toaster_SaleBid: any = Step_SaleBid + "toaster";
        Toaster_SaleBid = await page.locator("p-toastitem").isVisible();
        if (Toaster_SaleBid === true)
        {
            await expect.soft(page.locator("p-toastitem")).toContainText("Successfully updated data!");  
            await page.waitForTimeout(3000);
        } 
        else 
        {
            console.log("Error: " + Step_SaleBid + "(Success) toaster message missing!");
            await page.waitForTimeout(3000);
        }
        await page.locator("p-treetabletoggler").nth(6).click();
        await page.locator("text= Sale Bid Confirmed ").waitFor();
        let SaleBid_Badge: any = await page.locator("p-badge").nth(11).getAttribute("status");
        if (SaleBid_Badge.includes("Completed"))
        {
            console.log(Step_SaleBid + " step completed");
            await page.waitForTimeout(3000);
        }
        else
        {
            console.log(Step_SaleBid + " step failed");
            await page.waitForTimeout(3000);
        }
        const Step_BankruptcySearch = await page.locator("td:nth-child(1) > div > span > span").nth(10).textContent();
        console.log("\nStep 7.1 :" + Step_BankruptcySearch);
        await page.locator("p-treetabletoggler").nth(10).click();
        await page.locator("text= Request Bankruptcy Search ").click();
        const Step_ReqBankSearch = await page.locator(".p-dialog-title").textContent();
        await page.waitForTimeout(1000);
        await page.locator("p-dropdown[id='StepStatus']").click();
        await page.waitForTimeout(1000);
        //const PCStep_Status: any = await page.locator("div[trigger='true']").first().textContent();
        await page.locator("div[trigger='true']").click();
        await page.waitForTimeout(1000);
        await page.locator("p-button[label='Submit']").click();
        let Toaster_ReqBankSearch: any = Step_ReqBankSearch + "toaster";
        Toaster_ReqBankSearch = await page.locator("p-toastitem").isVisible();
        if (Toaster_ReqBankSearch === true)
        {
            await expect.soft(page.locator("p-toastitem")).toContainText("Successfully updated data!");  
            await page.waitForTimeout(3000);
        } 
        else 
        {
            console.log("Error: " + Step_ReqBankSearch + "(Success) toaster message missing!");
            await page.waitForTimeout(3000);
        }
        await page.locator("p-treetabletoggler").nth(6).click();
        await page.locator("p-treetabletoggler").nth(10).click();
        await page.locator("text= Request Bankruptcy Search ").waitFor();
        let ReqBankSearch_Badge: any = await page.locator("p-badge").nth(13).getAttribute("status");
        if (ReqBankSearch_Badge.includes("Completed"))
        {
            console.log(Step_ReqBankSearch + " step completed");
            await page.waitForTimeout(3000);
        }
        else
        {
            console.log(Step_ReqBankSearch + " step failed");
            await page.waitForTimeout(3000);
        }
        await page.locator("text= Receive Bankruptcy Search ").click();
        const Step_RecBankSearch = await page.locator(".p-dialog-title").textContent();
        await page.waitForTimeout(1000);
        await page.locator("p-dropdown[id='StepStatus']").click();
        await page.waitForTimeout(1000);
        //const PCStep_Status: any = await page.locator("div[trigger='true']").first().textContent();
        await page.locator("div[trigger='true']").click();
        await page.waitForTimeout(1000);
        await page.locator("p-button[label='Submit']").click();
        let Toaster_RecBankSearch: any = Step_RecBankSearch + "toaster";
        Toaster_RecBankSearch = await page.locator("p-toastitem").isVisible();
        if (Toaster_RecBankSearch === true)
        {
            await expect.soft(page.locator("p-toastitem")).toContainText("Successfully updated data!");  
            await page.waitForTimeout(3000);
        } 
        else 
        {
            console.log("Error: " + Step_RecBankSearch + "(Success) toaster message missing!");
            await page.waitForTimeout(3000);
        }
        await page.locator("p-treetabletoggler").nth(6).click();
        await page.locator("p-treetabletoggler").nth(10).click();
        await page.locator("text= Receive Bankruptcy Search ").waitFor();
        let RecBankSearch_Badge: any = await page.locator("p-badge").nth(14).getAttribute("status");
        if (RecBankSearch_Badge.includes("Completed"))
        {
            console.log(Step_RecBankSearch + " step completed");
            await page.waitForTimeout(3000);
        }
        else
        {
            console.log(Step_RecBankSearch + " step failed");
            await page.waitForTimeout(3000);
        }
        await page.locator("p-treetabletoggler").nth(10).click();
        let BankruptcySearch_Badge: any = await page.locator("p-badge").nth(12).getAttribute("status");
        if (BankruptcySearch_Badge.includes("Completed"))
        {
            console.log(Step_BankruptcySearch?.trim() + " step completed");
            await page.waitForTimeout(3000);
        }
        else
        {
            console.log(Step_BankruptcySearch?.trim() + " step failed");
            await page.waitForTimeout(3000);
        }
        //Military Search
        const Step_MilitarySearch = await page.locator("td:nth-child(1) > div > span > span").nth(11).textContent();
        console.log("\nStep 7.2 :" + Step_MilitarySearch);
        await page.locator("p-treetabletoggler").nth(11).click();
        await page.locator("text= Request Military Search ").click();
        const Step_ReqMilitarySearch = await page.locator(".p-dialog-title").textContent();
        await page.waitForTimeout(1000);
        await page.locator("p-dropdown[id='StepStatus']").click();
        await page.waitForTimeout(1000);
        //const PCStep_Status: any = await page.locator("div[trigger='true']").first().textContent();
        await page.locator("div[trigger='true']").click();
        await page.waitForTimeout(1000);
        await page.locator("p-button[label='Submit']").click();
        let Toaster_ReqMilitarySearch: any = Step_ReqMilitarySearch + "toaster";
        Toaster_ReqMilitarySearch = await page.locator("p-toastitem").isVisible();
        if (Toaster_ReqMilitarySearch === true)
        {
            await expect.soft(page.locator("p-toastitem")).toContainText("Successfully updated data!");  
            await page.waitForTimeout(3000);
        } 
        else 
        {
            console.log("Error: " + Step_ReqMilitarySearch + "(Success) toaster message missing!");
            await page.waitForTimeout(3000);
        }
        await page.locator("p-treetabletoggler").nth(6).click();
        await page.locator("p-treetabletoggler").nth(11).click();
        await page.locator("text= Request Military Search ").waitFor();
        let ReqMilitarySearch_Badge: any = await page.locator("p-badge").nth(14).getAttribute("status");
        if (ReqMilitarySearch_Badge.includes("Completed"))
        {
            console.log(Step_ReqMilitarySearch + " step completed");
            await page.waitForTimeout(3000);
        }
        else
        {
            console.log(Step_ReqMilitarySearch + " step failed");
            await page.waitForTimeout(3000);
        }
        await page.locator("text= Receive Military Search ").click();
        const Step_RecMilitarySearch = await page.locator(".p-dialog-title").textContent();
        await page.waitForTimeout(1000);
        await page.locator("p-dropdown[id='StepStatus']").click();
        await page.waitForTimeout(1000);
        //const PCStep_Status: any = await page.locator("div[trigger='true']").first().textContent();
        await page.locator("div[trigger='true']").click();
        await page.waitForTimeout(1000);
        await page.locator("p-button[label='Submit']").click();
        let Toaster_RecMilitarySearch: any = Step_RecMilitarySearch + "toaster";
        Toaster_RecMilitarySearch = await page.locator("p-toastitem").isVisible();
        if (Toaster_RecMilitarySearch === true)
        {
            await expect.soft(page.locator("p-toastitem")).toContainText("Successfully updated data!");  
            await page.waitForTimeout(3000);
        } 
        else 
        {
            console.log("Error: " + Step_RecMilitarySearch + "(Success) toaster message missing!");
            await page.waitForTimeout(3000);
        }
        await page.locator("p-treetabletoggler").nth(6).click();
        await page.locator("p-treetabletoggler").nth(11).click();
        await page.locator("text= Receive Military Search ").waitFor();
        let RecMilitarySearch_Badge: any = await page.locator("p-badge").nth(15).getAttribute("status");
        if (RecMilitarySearch_Badge.includes("Completed"))
        {
            console.log(Step_RecMilitarySearch + " step completed");
            await page.waitForTimeout(3000);
        }
        else
        {
            console.log(Step_RecMilitarySearch + " step failed");
            await page.waitForTimeout(3000);
        }
        await page.locator("p-treetabletoggler").nth(11).click();
        let MilitarySearch_Badge: any = await page.locator("p-badge").nth(13).getAttribute("status");
        if (MilitarySearch_Badge.includes("Completed"))
        {
            console.log(Step_MilitarySearch?.trim() + " step completed");
            await page.waitForTimeout(3000);
        }
        else
        {
            console.log(Step_MilitarySearch?.trim() + " step failed");
            await page.waitForTimeout(3000);
        }
        //Sale Held
        const Step_SaleHeld = await page.locator("td:nth-child(1) > div > span > span").nth(13).textContent();
        console.log("\nStep 7.3 :" + Step_SaleHeld);
        await page.locator("text= Sale Held ").click();
        //const Step_ReqMilitarySearch = await page.locator(".p-dialog-title").textContent();
        await page.waitForTimeout(1000);
        await page.locator("p-dropdown[id='StepStatus']").click();
        await page.waitForTimeout(1000);
        //const PCStep_Status: any = await page.locator("div[trigger='true']").first().textContent();
        await page.locator("div[trigger='true']").click();
        await page.waitForTimeout(1000);
        await page.locator("p-button[label='Submit']").click();
        let Toaster_SaleHeld: any = Step_SaleHeld + "toaster";
        Toaster_SaleHeld = await page.locator("p-toastitem").isVisible();
        if (Toaster_SaleHeld === true)
        {
            await expect.soft(page.locator("p-toastitem")).toContainText("Successfully updated data!");  
            await page.waitForTimeout(3000);
        } 
        else 
        {
            console.log("Error: " + Step_SaleHeld + "(Success) toaster message missing!");
            await page.waitForTimeout(3000);
        }
        await page.locator("p-treetabletoggler").nth(6).click();
        //await page.locator("p-treetabletoggler").nth(11).click();
        await page.locator("text= Sale Held ").waitFor();
        let SaleHeld_Badge: any = await page.locator("p-badge").nth(15).getAttribute("status");
        if (SaleHeld_Badge.includes("Completed"))
        {
            console.log(Step_SaleHeld?.trim() + " step completed");
            await page.waitForTimeout(3000);
        }
        else
        {
            console.log(Step_SaleHeld?.trim() + " step failed");
            await page.waitForTimeout(3000);
        }
        await page.locator("p-treetabletoggler").nth(6).click();
        let Sale_Badge: any = await page.locator("p-badge").nth(7).getAttribute("status");
        if (Sale_Badge.includes("Completed"))
        {
            console.log(Step_Sale?.trim() + " step completed");
            await page.waitForTimeout(3000);
        }
        else
        {
            console.log(Step_Sale?.trim() + " step failed");
            await page.waitForTimeout(3000);
        }
        //await page.screenshot({ path: 'casestepflowafter.png', fullPage: true });
        //Case Processing Final Output
        console.log("\nCase Processing Final Result : ");
        const Step_ReferralReceived_Status = page.locator("p-badge").nth(0);
        const Step_ReferralReceived_StatusText = page.locator(".p-tooltip-text");
        await Step_ReferralReceived_Status.hover();
        await expect(Step_ReferralReceived_StatusText).toBeVisible();
        await expect.soft(Step_ReferralReceived_StatusText).toHaveText("Referral received");
        const Step_TitleOrder_Status = page.locator("p-badge").nth(1);
        const Step_TitleOrder_StatusText = page.locator(".p-tooltip-text");
        await Step_TitleOrder_Status.hover();
        await expect(Step_TitleOrder_StatusText).toBeVisible();
        await expect.soft(Step_TitleOrder_StatusText).toHaveText("Completed");
        const Step_FHALetter_Status = page.locator("p-badge").nth(2);
        const Step_FHALetter_StatusText = page.locator(".p-tooltip-text");
        await Step_FHALetter_Status.hover();
        await expect(Step_FHALetter_StatusText).toBeVisible();
        await expect.soft(Step_FHALetter_StatusText).toHaveText("Review completed");
        const Step_Complaint_Status = page.locator("p-badge").nth(4);
        const Step_Complaint_StatusText = page.locator(".p-tooltip-text");
        await Step_Complaint_Status.hover();
        await expect(Step_Complaint_StatusText).toBeVisible();
        await expect.soft(Step_Complaint_StatusText).toHaveText("Completed");
        const Step_Service_Status = page.locator("p-badge").nth(5);
        const Step_Service_StatusText = page.locator(".p-tooltip-text");
        await Step_Service_Status.hover();
        await expect(Step_Service_StatusText).toBeVisible();
        await expect.soft(Step_Service_StatusText).toHaveText("Completed");
        const Step_Judgement_Status = page.locator("p-badge").nth(6);
        const Step_Judgement_StatusText = page.locator(".p-tooltip-text");
        await Step_Judgement_Status.hover();
        await expect(Step_Judgement_StatusText).toBeVisible();
        await expect.soft(Step_Judgement_StatusText).toHaveText("Completed");
        const Step_Sale_Status = page.locator("p-badge").nth(7);
        const Step_Sale_StatusText = page.locator(".p-tooltip-text");
        await Step_Sale_Status.hover();
        await expect(Step_Sale_StatusText).toBeVisible();
        await expect.soft(Step_Sale_StatusText).toHaveText("Completed"); 
        expect.soft(test.info().errors).toHaveLength(0);
        if(test.info().status == test.info().expectedStatus)
        {
            console.log("Success, Case Steps Pass");
        }
        else
        {
            console.log("Error, Case Steps Failed ");
        }
        console.log("\nLogout:");
        await Promise.all([
            page.waitForURL("https://qa-via.outamationlabs.com/via-ui/#/login"),
            page.locator("div[aria-label='Logout']").click()
        ]);
        if(page.url().includes("via-ui/#/login"))
        {
            console.log("User Logout Successful");
            await page.waitForTimeout(3000);
        }
        else
        {   
            console.log("User Logout Unsuccessful");
            await page.waitForTimeout(3000);
        }
});

//sendMail;