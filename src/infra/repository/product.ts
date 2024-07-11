import Product from "../../domain/entity/product";
import ProductRepositoryInterface from "../../domain/repository/product";
import ProductModel from "../db/sequelize/model/product";

export default class ProductRepository implements ProductRepositoryInterface {
    async create(product: Product): Promise<void> {
        await ProductModel.create({
            id: product.id,
            name: product.name,
            price: product.price
        })
    }

    async update(product: Product): Promise<void> {
        await ProductModel.update(
            {
                name: product.name,
                price: product.price
            },
            {
                where: {
                    id: product.id
                }
            }
        )
    }

    async find(id: string): Promise<Product> {
        const model = await ProductModel.findOne({where: { id }});
        return new Product(model.id, model.name, model.price);
    }

    async list(): Promise<Product[]> {
        const models = await ProductModel.findAll();
        return models.map((product) => 
            new Product(product.id, product.name, product.price)
        )
    }
}