import Address from "../../../domain/entity/address";
import CustomerFactory from "../../../domain/factory/customer.factory";
import ListCustomerUseCase from "./list.customer.usecase";


const customer = CustomerFactory.createWithAddress(
    "aaa", new Address("street 1", 1, "111", "city 1")
);

const customer2 = CustomerFactory.createWithAddress(
    "bbb", new Address("street 2", 2, "222", "city 2")
);


const MockRepository = () => {
    return {
        create: jest.fn(),
        find: jest.fn(),
        list: jest.fn().mockReturnValue(Promise.resolve([customer, customer2])),
        update: jest.fn(),
    }
}


describe("Unit test for listing customer use case", () => {
    it("should list a customer", async () => {
        const repository = MockRepository();
        const useCase = new ListCustomerUseCase(repository);

        const output = await useCase.execute({});

        expect(output.customers.length).toBe(2);
        expect(output.customers[0].id).toBe(customer.id);
        expect(output.customers[0].name).toBe(customer.name);
        expect(output.customers[0].address.street).toBe(customer.address.street);

        expect(output.customers[1].id).toBe(customer2.id);
        expect(output.customers[1].name).toBe(customer2.name);
        expect(output.customers[1].address.street).toBe(customer2.address.street);
    })
})