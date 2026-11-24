import { test, expect } from '../../fixtures/pageFixtures';
import {Helper} from "../../utils/helper";
import {products} from "../../testdata/productsData.json";

const {uemail, upassword} = Helper.getdemoBlazeRegisterDetails();
        
        
test("DemoBlaze Login Process", async({demoLoginFixture,demoCartFixture,demoPaymentFixture}) => {
    await test.step('1) Navigate to the url', async() => {
    await demoLoginFixture.navigateToURL();
    })


    await test.step('2) Enter credential and hit enter', async() => {
    await demoLoginFixture.performLoginAction(uemail,upassword);
    })


    await test.step('3) Navigate and View Cart Product', async () => {
    await demoCartFixture.viewCartProduct();
    })

    for (const data of products) {
        await test.step(`5) Verify ${data.productName} is in the cart`, async () => {
            await demoCartFixture.TotalCartProduct(data.productName);
            expect(await demoCartFixture.TotalCartProduct(data.productName)).toBe(await demoCartFixture.TotalCartProduct(data.expectedResult));
        });
    }

    await test.step('6) Purchase the product', async () => {
    await demoPaymentFixture.demoPlaceOrder();
    })

})