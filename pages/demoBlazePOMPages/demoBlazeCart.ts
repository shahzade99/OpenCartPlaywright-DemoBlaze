import {Page,Locator} from "@playwright/test";


export class demoBlazeCart{

    // page fixture property declaration
    private readonly page:Page;


    // Locators declaration
    private readonly cart:Locator;
    private readonly cartProductList:Locator;


    // Initializae the above props through constructor
    constructor(page:Page)
    {
        this.page = page;
        this.cart = page.getByRole("link",{name:'Cart', exact:true});
        this.cartProductList = page.locator('#tbodyid tr td:nth-child(2)');
    }


// Navigate to the cart
    async viewCartProduct()
    {
        await this.cart.waitFor({state:'visible'});
        await this.cart.click()
    }
    
    
// View total product in the list
    async TotalCartProduct(productName:string)
    {
        await this.cartProductList.first().waitFor({state:'visible'});
        const productCount = await this.cartProductList.count();

        for (let index = 0; index < productCount; index++)
        {
            const productLink = this.cartProductList.nth(index);
            if ((await productLink.innerText()).trim() === productName.trim())
            {
                return;
                
            }
        }

        throw new Error(`Product "${productName}" was not found in the product list.`);
    }
}    