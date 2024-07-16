import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infra/db/sequelize/model/product";
import ProductRepository from "../../../infra/repository/product";
import Product from "../../../domain/entity/product";
import ListProductUseCase from "./list.product.usecase";

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

    it("should list products", async () => {
        const productRepository = new ProductRepository();
        const usecase = new ListProductUseCase(productRepository);

        const product = new Product("123", "aaa", 150);
        await productRepository.create(product);

        
        const result = await usecase.execute({});
        expect(result.products).toEqual([product]);
    });
});