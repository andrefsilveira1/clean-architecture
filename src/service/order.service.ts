import Customer from "../domain/entity/customer";
import OrderItem from "../domain/checkout/items";
import Order from "../domain/checkout/order";

export default class OrderService {
    static total(orders: Order[]): number {
        return orders.reduce((acc, order) => acc + order.total(), 0);
    }

    static placeOrder(customer: Customer, items: OrderItem[]): Order {
        if(items.length === 0) {
            throw new Error("Order can't be empty");
        }

        const order = new Order("1", customer.id, items);
        customer.addReward(order.total()/2);
        return  order
    }
}