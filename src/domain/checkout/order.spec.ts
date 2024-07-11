import Order from "./order";

describe("Order unit tests", () => {
    it("Should throw error when empty", () => {
        expect(() => {
            let order = new Order("", "aaa", []);
        }).toThrow("Id is required")
    });

    it("Should throw error when empty", () => {
        expect(() => {
            let order = new Order("123", "", []);
        }).toThrow("Customer Id is required")
    });

    it("Should throw error when empty", () => {
        expect(() => {
            let order = new Order("123", "124", []);
        }).toThrow("Items are required")
    });

});