import Product from "../../../domain/entity/product";
import UpdateProductUseCase from "./update.product.usecase";

const product = new Product("123", "aaa", 150);


const input = {
    id: product.id,
    name: "aaa updated",
    price: 159.99,
};

const MockRepository = () => {
    return {
        create: jest.fn(),
        list: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        update: jest.fn()
    }
}


describe("Unit test for update product use case", () => {
    it("should update a product", async () => {
        const productRepository = MockRepository();
        const productUpdateUseCase = new UpdateProductUseCase(productRepository);

        const output = await productUpdateUseCase.execute(input);

        expect(output).toEqual(input)
    })
})