import {Page,Locator} from "@playwright/test";


export class demoBlazePayment{

    // page fixture property declaration
    private readonly page:Page;


    // Locators declaration
    private readonly placeOrder:Locator;
    private readonly pname:Locator;
    private readonly pcountry:Locator;
    private readonly pcity:Locator;
    private readonly pcard:Locator;
    private readonly pmonth:Locator;
    private readonly pyear:Locator;
    private readonly ppurchase:Locator;


    // Initializae the above props through constructor
    constructor(page:Page)
    {
        this.page = page;
        this.placeOrder = page.getByRole('button', { name: 'Place Order' })
        this.pname = page.locator("//input[@id='name']");
        this.pcountry = page.locator("//input[@id='country']");
        this.pcity = page.locator("//input[@id='city']");
        this.pcard = page.locator("//input[@id='card']");
        this.pmonth = page.locator("//input[@id='month']");
        this.pyear = page.locator("//input[@id='year']");
        this.ppurchase = page.locator("//*[@id='orderModal']/div/div/div[3]/button[2]");

    }

    /**
     * navigate to login
     * add products to cart
     * validate cart
     * navigate to payment
     * enter details and hit place order
     */

    async demoPlaceOrder()
    {
        await this.placeOrder.click();
        await this.pname.fill("foo");
        await this.pcountry.fill("usa");
        await this.pcity.fill("deborah");
        await this.pcard.fill('12345643455');
        await this.pmonth.fill('05');
        await this.pyear.fill('2027');
        await this.ppurchase.click();
    }

}