import CreateProductUseCase from "./create.product.usecase";

const input = {
    name: "product 1",
    price: 150.00,
}

const MockRepository = () => {
    return {
        find: jest.fn(),
        list: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("Unit test create product use case", () => {
    it("Should create a product", async () => {
        const productRepository = MockRepository();
        const productCreateUseCase = new CreateProductUseCase(productRepository);

        const output = await productCreateUseCase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price,
        });
    });

    it("Should return an error until product create without name", async () => {
        const productRepository = MockRepository();
        const productCreateUseCase = new CreateProductUseCase(productRepository);

        input.name = "";

        await expect(productCreateUseCase.execute(input)).rejects.toThrow("Name is required");
    });

    it("Should return an error until product create without price", async () => {
        const productRepository = MockRepository();
        const productCreateUseCase = new CreateProductUseCase(productRepository);
        input.name = "aaa";
        input.price = -1;

        await expect(productCreateUseCase.execute(input)).rejects.toThrow("Price can not be negative");
    });
});