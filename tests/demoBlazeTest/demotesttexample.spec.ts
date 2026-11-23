import {test,expect,Locator,Dialog} from "@playwright/test";

// Handling dialog pop up

test("Dialog pop up on login", async ({page}) => { 
    
    test.setTimeout(120000);

    await test.step('1) Login in the application', async () => {

        await page.goto("https://www.demoblaze.com/index.html")

    })


    await test.step('2) Navigate to log in and enter credentials', async () => {

        await page.getByRole('link', { name: 'Log in' }).click();
        await page.locator('#loginusername').fill('pavanol');
        await page.locator('#loginpassword').fill('test@123');
        


    })
 
    await test.step('3) Accept dialog handler', async () => {

        // dialog appeared on screen? yes/No
        let dialogMessage: string | undefined;

            // todo when dialog appears
            const dialogHandler = async (dialog: Dialog) => { 
                
                //saves the message to validate dialog handling
                dialogMessage = dialog.message();
                
                // Click OK on the dialog, to get rid of page block
                await dialog.accept();
            };


            //Registers the handler. It’s set up before clicking Log in 
            // so it can catch the alert triggered by that click.
            page.on('dialog', dialogHandler);
            try {
                await page.getByRole('button', { name: 'Log in' }).click();

            //Removes the handler after the click, whether it succeeds or errors. 
            // This prevents it from accidentally handling a later dialog.    
            } finally {
                page.off('dialog', dialogHandler);
            }


            //If a dialog appeared, fails the test and includes the dialog’s message. 
            // The code treats any dialog during login as a login failure.
            if (dialogMessage !== undefined) {
                throw new Error(`Login failed: ${dialogMessage}`);
            }

            //If no dialog appeared, waits for the exact Log out link to become visible. 
            // That’s the success check: the app shows Log out after login succeeds.
            await page.getByRole('link', { name: 'Log out', exact: true }).waitFor({ state: 'visible' });




            //Note:
            /**
             * The handler is registered before the click so it can catch the alert. 
             * The finally block removes it afterward so it won’t handle an unrelated dialog later.
             */
    })

})

