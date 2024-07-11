import Customer from "../domain/entity/customer";
import OrderItem from "../domain/checkout/items"
import Order from "../domain/checkout/order";
import OrderService from "./order.service";

describe("Order service unit tests", () => {

    it("should place an order", () => {
        const customer = new Customer("1", "Customer 1");
        const item = new OrderItem("1", "Item1", 10, "p1", 1);

        const order = OrderService.placeOrder(customer, [item]);

        expect(customer.reward).toBe(5);
        expect(order.total()).toBe(10);
    })

    it("Should get total of all orders", () => {
        const item = new OrderItem("1", "item 1", 100, "p1", 1);
        const item2 = new OrderItem("2", "item 2", 100, "p2", 2);
        
        const order = new Order("1", "1", [item]);
        const order2 = new Order("2", "2", [item2]);
        
        const total = OrderService.total([order,order2]);

        expect(total).toBe(300)
    });
})