import { Sequelize } from "sequelize-typescript"
import ProductModel from "../db/sequelize/model/product";
import Product from "../../domain/entity/product";
import ProductRepository from "./product";
import CustomerRepository from "./customer";
import Customer from "../../domain/entity/customer";
import Address from "../../domain/entity/address";
import CustomerModel from "../db/sequelize/model/customer";
import OrderModel from "../db/sequelize/model/order";
import ItemModel from "../db/sequelize/model/items";
import OrderItem from "../../domain/checkout/items";
import Order from "../../domain/checkout/order";
import OrderRepository from "./order";

describe("Order repository test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([CustomerModel, OrderModel, ItemModel, ProductModel]);
        await sequelize.sync();

    });

    afterEach(async () => {
        await sequelize.close();
    }
    );

    it("Should create a new order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Street 1", 1, "123456", "Natal");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("1", "Product 1", 100);
        await productRepository.create(product);

        const orderRepository = new OrderRepository();
        const orderItem = new OrderItem(
            "1",
            product.name,
            product.price,
            product.id,
            2
        );

        const order = new Order("1", "1", [orderItem])
        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({
            where: { id: order.id },
            include: ["items"],
        });

        expect(orderModel.toJSON()).toStrictEqual({
            id: "1",
            customer_id: "1",
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                    order_id: "1",
                    product_id: "1"
                }
            ]
        });
    });

    it("Should update a order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Street 1", 1, "123456", "Natal");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("1", "Product 1", 100);
        await productRepository.create(product);

        const orderRepository = new OrderRepository();
        const orderItem = new OrderItem(
            "1",
            product.name,
            product.price,
            product.id,
            2
        );

        const order = new Order("1", "1", [orderItem])
        await orderRepository.create(order);

        // Item to be inserted in the same order
        const product2 = new Product("2", "Product 2", 50);
        await productRepository.create(product2);
        const orderItem2 = new OrderItem(
            "2",
            product2.name,
            product2.price,
            product2.id,
            5
        );

        order.items.push(orderItem2)
        await orderRepository.update(order)
        const updatedModel = await OrderModel.findOne({
            where: { id: order.id },
            include: ["items"],
        });

        expect(updatedModel.toJSON()).toStrictEqual({
            id: "1",
            customer_id: "1",
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                    order_id: "1",
                    product_id: "1"
                },
                {
                    id: orderItem2.id,
                    name: orderItem2.name,
                    price: orderItem2.price,
                    quantity: orderItem2.quantity,
                    order_id: "1",
                    product_id: "2"
                },
            ]
        });
    });

    it("Should get a order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Street 1", 1, "123456", "Natal");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("1", "Product 1", 100);
        await productRepository.create(product);

        const orderRepository = new OrderRepository();
        const orderItem = new OrderItem(
            "1",
            product.name,
            product.price,
            product.id,
            2
        );

        const order = new Order("1", "1", [orderItem]);
        await orderRepository.create(order);

        const orderModel = await orderRepository.find("1");
        
        expect(orderModel).toStrictEqual(order);
    });

    it("Should return all orders", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Street 1", 1, "123456", "Natal");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("1", "Product 1", 100);
        await productRepository.create(product);

        const orderRepository = new OrderRepository();
        const orderItem = new OrderItem(
            "1",
            product.name,
            product.price,
            product.id,
            2
        );

        // Creating second product and order
        const product2 = new Product("2", "Product 2", 50);
        await productRepository.create(product2);
        const orderItem2 = new OrderItem(
            "2",
            product2.name,
            product2.price,
            product2.id,
            5
        );

        const order = new Order("1", "1", [orderItem]);
        const order2 = new Order("2", "1", [orderItem2]);
        await orderRepository.create(order);
        await orderRepository.create(order2);

        const orders = await orderRepository.list();
        const ordersArray = [order, order2];

        expect(orders).toEqual(ordersArray);
    })

});
