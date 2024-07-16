import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infra/db/sequelize/model/product";
import FindProductUseCase from "./find.product.usecase";
import ProductRepository from "../../../infra/repository/product";
import Product from "../../../domain/entity/product";

describe("Test find product use case", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should find a product", async () => {
        const productRepository = new ProductRepository();
        const usecase = new FindProductUseCase(productRepository);

        const product = new Product("123", "aaa", 150);
        await productRepository.create(product);

        const input = {
            id: "123",
        }

        const output = {
            id: "123",
            name: "aaa",
            price: 150.00
        }
        
        const result = await usecase.execute(input);
        expect(result).toEqual(output);
    });
});