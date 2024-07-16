import Product from "../../../domain/entity/product"
import ListProductUseCase from "./list.product.usecase";


const product = new Product("123", "product 1", 150.00);

const MockRepository = () => {
    return {
        find: jest.fn(),
        list: jest.fn().mockReturnValue(Promise.resolve([product])),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("Unit test list products use case", () => {
    it("Should list products", async () => {
        const productRepository = MockRepository();
        const productListUseCase = new ListProductUseCase(productRepository);

        const output = await productListUseCase.execute({});

        expect(output.products).toEqual([product]);
    });

});