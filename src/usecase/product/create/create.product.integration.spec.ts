import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../infra/db/sequelize/model/customer";
import CreateProductUseCase from "./create.product.usecase";
import ProductRepository from "../../../infra/repository/product";
import Product from "../../../domain/entity/product";
import ProductModel from "../../../infra/db/sequelize/model/product";

describe("Test find customer use case", () => {
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

    it("should create a product", async () => {
        const productRepository = new ProductRepository();
        const usecase = new CreateProductUseCase(productRepository);

        const product = new Product("1", "product 1", 150)
        await productRepository.create(product);

        const input = {
            name: "product 1",
            price: 150.00,
        }

        const result = await usecase.execute(input);

        expect(result).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price,
        });
    });
});