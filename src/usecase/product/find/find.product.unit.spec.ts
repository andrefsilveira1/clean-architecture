import Product from "../../../domain/entity/product"
import FindProductUseCase from "./find.product.usecase"

const input = {
    id: "123",
}

const output = {
    id: "123",
    name: "product 1",
    price: 150.00
}

const product = new Product("123", "product 1", 150.00)

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        list: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("Unit test create product use case", () => {
    it("Should find a product", async () => {
        const productRepository = MockRepository();
        const productCreateUseCase = new FindProductUseCase(productRepository);

        const output = await productCreateUseCase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: output.name,
            price: output.price,
        });
    });

    it("Should return an error when product not find", async () => {
        const productRepository = MockRepository();

        productRepository.find.mockImplementation(() => {
            throw new Error("Product not found")
        });

        const productCreateUseCase = new FindProductUseCase(productRepository);

        expect(() => {
            return productCreateUseCase.execute(input);
        }).rejects.toThrow("Product not found")

    })
});