import Customer from "../../../domain/entity/customer";
import CreateCustomerUseCase from "./create.customer.usecase";

const input = {
    id: "123",
    name: "aaa",
    address: {
        street: "street",
        number: 123,
        zip: "zip",
        city: "city",
    },
};


const MockRepository = () => {
    return {
        find: jest.fn(),
        list: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("Unit test create customer use case", () => {
    it("Should create a customer", async () => {
        const customerRepository = MockRepository();
        const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);
        const output = await customerCreateUseCase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            address: {
                street: input.address.street,
                number: input.address.number,
                zip: input.address.zip,
                city: input.address.city
            },
        });
    });

    it("should return an error until customer create without name", async () => {
        const customerRepository = MockRepository();
        const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);

        input.name = "";

        await expect(customerCreateUseCase.execute(input)).rejects.toThrow("Name is required")
    });


    it("hould return an error until customer create without address", async () => {
        const customerRepository = MockRepository();
        const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);

        input.address.street = ""

        await expect(customerCreateUseCase.execute(input)).rejects.toThrow("Street is required")
    });
})