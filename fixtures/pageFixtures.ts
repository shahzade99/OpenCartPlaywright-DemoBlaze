import {test as base, expect} from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage"
import { Register } from "../pages/RegisterPage";
import { ProductPage } from "../pages/ProductPage";
import { demoblazeLoginPage } from "../pages/demoBlazePOMPages/demoBlazeLoginPage";
import { demoBlazeProductPage } from "../pages/demoBlazePOMPages/demoBlazeProductPages";
import { demoBlazeCart } from "../pages/demoBlazePOMPages/demoBlazeCart";


//const APP_URL = "https://www.opencart.com";
const APP_URL = "https://awesomeqa.com/ui"


type pageFixtures = {
    homePage : HomePage;
    loginPage: LoginPage;
    registerPage: Register;
    productPage: ProductPage;
    demoLoginFixture: demoblazeLoginPage;
    demoProductFixture: demoBlazeProductPage;
    demoCartFixture:demoBlazeCart;
};

/**
 * creates a customized Playwright TEST OBJECT with a homePage fixture.
 * base.extend<pageFixtures>(...) adds fixtures to Playwright’s base test, with pageFixtures providing the TypeScript types.
 * homePage: async ({ page }, use) => { ... } defines the fixture. Playwright provides the browser page.
 * await page.goto(APP_URL) opens your application before the test uses the fixture.
 * await use(new HomePage(page)) gives the test a HomePage object wrapping that page. After the test finishes using the fixture, Playwright continues with its cleanup.
 */

export const test = base.extend<pageFixtures> ({
    homePage: async ({page}, use) => {
        //await page.goto(APP_URL);
        await use(new HomePage(page));
    },

    loginPage: async({page},use) =>
    {
        await use(new LoginPage(page))
    },

    registerPage: async({page},use) =>
    {
        await use(new Register(page))
    },
    productPage: async({page},use) =>
    {
        await use(new ProductPage(page))
    },
    demoLoginFixture: async({page},use) =>
    {
        await use(new demoblazeLoginPage(page))
    },
    demoProductFixture: async({page},use) =>
    {
        await use(new demoBlazeProductPage(page))
    },
    demoCartFixture: async({page},use) =>
    {
        await use(new demoBlazeCart(page))
    },
});


export {expect} from "@playwright/test";

