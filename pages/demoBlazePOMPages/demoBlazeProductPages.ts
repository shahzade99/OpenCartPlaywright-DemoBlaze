import {Page,Locator} from "@playwright/test";

export class demoBlazeProductPage{

    // page fixture property declaration
    private readonly page:Page;


    // Locators declaration
    private readonly productList:Locator;
    private readonly addToCartBtn:Locator;
    private readonly cart:Locator;
    private readonly numberOfProducts:Locator;


    // Initializae the above props through constructor
    constructor(page:Page)
    {
        this.page = page;
        this.productList = page.locator('#tbodyid .card-title a');  
        //tbody is the container, .card-title is the heading and 'a' is the product name link
        this.addToCartBtn = page.getByRole("link",{name:'Add to Cart'});
        this.cart = page.getByRole("link",{name:'Cart', exact:true});
        this.numberOfProducts = page.locator('//tbody[@id="tbodyid"]/tr/td[2]');
    }


// Navigate the product
    async addProductToCart(productName:string)
    {
        await this.productList.first().waitFor({state:'visible'}); // first() to select the title of each element
        const productCount = await this.productList.count();

        for (let index = 0; index < productCount; index++)
        {
            const productLink = this.productList.nth(index);
            if ((await productLink.innerText()).trim() === productName.trim())
            {
                await productLink.click();
                await this.addToCartBtn.waitFor({state:'visible'});
                this.page.once('dialog', dialog => dialog.accept());
                await this.addToCartBtn.click();
                await this.page.getByRole('link', {name:'Home'}).click();
                return;
                
            }
        }

        throw new Error(`Product "${productName}" was not found in the product list.`);
    }
}    