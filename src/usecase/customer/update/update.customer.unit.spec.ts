import Address from "../../../domain/entity/address";
import CustomerFactory from "../../../domain/factory/customer.factory";

const customer = CustomerFactory.createWithAddress(
    "aaa", new Address("street", 123, "zip", "city")
);

const input = {
    id: customer.id,
    name: "aaa updated",
    address: {
        street: "street updated",
        number: 123456,
        zip: "zip updated",
        city: "city updated",
    },
};

const MockRepository = () => {
    return {
        create: jest.fn(),
        list: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        update: jest.fn()
    }
}


describe("Unit test for update customer use case", () => {
    it("should update a customer", async () => {
        const customerRepository = MockRepository();
        const customerUpdateUseCase = new UpdateCustomerUseCase(customerRepository);

        const output = await customerUpdateUseCase.execute(input);

        expect(output).toEqual(input)
    })
})