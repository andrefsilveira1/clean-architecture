import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/entity/product";
import ProductModel from "../../../infra/db/sequelize/model/product";
import ProductRepository from "../../../infra/repository/product";
import UpdateProductUseCase from "./update.product.usecase";

describe("Test update product use case integration", () => {
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

    it("should update a product", async () => {
        const productRepository = new ProductRepository();
        const usecase = new UpdateProductUseCase(productRepository);

        const product = new Product("123", "aaa", 150);
        await productRepository.create(product);

        const input = {
            id: "123",
            name: "aaa updated",
            price: 159.99
        }

        const output = {
            id: "123",
            name: "aaa updated",
            price: 159.99
        }

        const result = await usecase.execute(input);

        expect(result).toEqual(output);
    });
});