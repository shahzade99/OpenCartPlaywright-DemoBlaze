import { test, expect } from '../../fixtures/pageFixtures';
import {Helper} from "../../utils/helper";
import {products} from '../../testdata/productsData.json';

const {uemail, upassword} = Helper.getdemoBlazeRegisterDetails();

test("DemoBlaze Product Add", async ({demoProductFixture, demoLoginFixture }) => {
    await test.step('1) Navigate to the url', async () => {
        await demoLoginFixture.navigateToURL();
    })

    await test.step('2) Login to the application', async () => {
        await demoLoginFixture.performLoginAction(uemail,upassword);
    })

    
    for (const data of products) {
        await test.step(`3) Add ${data.productName} to the cart`, async () => {
            await demoProductFixture.addProductToCart(data.productName);
        });
    }
    

})