import { Sequelize } from "sequelize-typescript"
import ProductModel from "../db/sequelize/model/product";
import Product from "../../domain/entity/product";
import ProductRepository from "./product";
import CustomerRepository from "./customer";
import Customer from "../../domain/entity/customer";
import Address from "../../domain/entity/address";
import CustomerModel from "../db/sequelize/model/customer";

describe("Customer repository test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([CustomerModel]);
        await sequelize.sync();

    });

    afterEach(async () => {
        await sequelize.close();
    }
    );

    it("Should create a customer on repository", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Street 1", 1, "123456", "Natal");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const customerModel = await CustomerModel.findOne({ where: { id: "1" } });
        expect(customerModel.toJSON()).toStrictEqual({
            id: "1",
            name: customer.name,
            active: customer.isActive(),
            reward: customer.reward,
            street: address.street,
            number: address.number,
            zip: address.zip,
            city: address.city,
        });
    });

    it("Should update a customer on repository", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Street 1", 1, "123456", "Natal");
        customer.address = address;
        await customerRepository.create(customer);

        customer.changeName("New customer");

        await customerRepository.update(customer);
        const model = await CustomerModel.findOne({ where: { id: "1" } });
        expect(model.toJSON()).toStrictEqual({
            id: "1",
            name: "New customer",
            active: customer.isActive(),
            reward: customer.reward,
            street: address.street,
            number: address.number,
            zip: address.zip,
            city: address.city,
        });
    });


    it("Should find a customer on repository", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Street 1", 1, "123456", "Natal");
        customer.address = address;
        await customerRepository.create(customer);

        const customerModel = await CustomerModel.findOne({ where: { id: "1" } });

        const model = await customerRepository.find("1");

        expect(customerModel.toJSON()).toStrictEqual({
            id: "1",
            name: customer.name,
            active: customer.isActive(),
            reward: customer.reward,
            street: address.street,
            number: address.number,
            zip: address.zip,
            city: address.city,
        });

    });
});
