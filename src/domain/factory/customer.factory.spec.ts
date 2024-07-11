import Address from "../entity/address";
import CustomerFactory from "./customer.factory";

describe("Customer factory unit test", () => {
    it("Should create a customer", () => {
        let customer = CustomerFactory.create("John");
        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("John");
        expect(customer.address).toBeUndefined();

    });

    it("Should create an address from customer", () => {
        const address = new Address("Street 1", 1000, "5929292", "Natal");
        let customer = CustomerFactory.createWithAddress("John", address);
        
        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("John");
        expect(customer.address).toBe(address);
    });

    
})