const input = {
    id: "123",
    name: "aaa",
    address: {
        street: "Street",
        number: 123,
        zip: "Zip",
        city: "City",
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

describe("Unit test create custoemr use case", () => {
    it("Should create a customer", async () => {
        const customerRepository = MockRepository();
        const customerCreateUseCase = new CustomerCreateUseCase(customerRepository);
        const output = await customerCreateUseCase.create(input);

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
    })
})