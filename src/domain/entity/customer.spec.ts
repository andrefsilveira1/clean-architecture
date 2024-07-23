import Address from "./address";
import Customer from "./customer";

describe("Customer unit test", () => {
    it("Should throw error when id is null", () => {
        expect(() => {
            let customer = new Customer("", "John");
        }).toThrowError("Id is required");
    });

    it("Should throw error when Name is empty", () => {
        expect(() => {
            let customer = new Customer("123", "");
        }).toThrowError("Name is required");
    });

    it("Should change Name", () => {
        const customer = new Customer("123", "John");
        customer.changeName("Johnny");
        expect(customer.name).toBe("Johnny");
    });

    it("Should throw error when address is undefined", () => {
        expect(() => {
            const customer = new Customer("1", "Customer 1");
            customer.activate();
        }).toThrowError("Address is required")
    });

    it("Should throw error when Name is empty and Id is undefined", () => {
        expect(() => {
            let customer = new Customer("", "");
        }).toThrowError("Customer: Id is required,Customer: Name is required");
    });


    it("Should deactivate customer", () => {
        expect(() => {
            let customer = new Customer("1", "John");
            customer.deactivate();
            expect(customer.active).toBe(false)
        })
    });

    it("Should activate customer", () => {
        expect(() => {
            let customer = new Customer("1", "John");
            const address = new Address("Rua 1", 123, "133", "Natal");
            customer.activate();
            expect(customer.active).toBe(true)
        })
    });

    it("Should add points", () => {
        const customer = new Customer("1", "Customer 1");
        expect(customer.reward).toBe(0);

        customer.addReward(10);
        expect(customer.reward).toBe(10);

        customer.addReward(10);
        expect(customer.reward).toBe(20);

    });
});
