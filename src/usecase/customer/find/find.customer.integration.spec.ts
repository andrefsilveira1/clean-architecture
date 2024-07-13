import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../infra/db/sequelize/model/customer";
import CustomerRepository from "../../../infra/repository/customer";
import Customer from "../../../domain/entity/customer";
import Address from "../../../domain/entity/address";
import FindCustomerUseCase from "./find.customer.usecase";

describe("Test find customer use case", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([CustomerModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should find a costumer", async () => {
        const customerRepository = new CustomerRepository();
        const usecase = new FindCustomerUseCase(customerRepository);

        const customer = new Customer("123", "aaa");
        const address = new Address("Street", 123456, "zip", "city");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const input = {
            id: "123",
        }

        const output = {
            id: "123",
            name: "aaa",
            address: {
                street: "Street",
                city: "city",
                number: 123456,
                zip: "zip"
            }
        }

        const result = await usecase.execute(input);

        expect(result).toEqual(output);
    });
});