import Product from "../../../domain/entity/product";
import ProductFactory from "../../../domain/factory/product.factory";
import ProductRepositoryInterface from "../../../domain/repository/product";
import { InputCreateProductDto, OutputCreateProductDto } from "./create.product.dto";

export default class CreateProductUseCase {
    private productRepository: ProductRepositoryInterface;

    constructor(productRepository: ProductRepositoryInterface) {
        this.productRepository = productRepository
    }

    async execute(input: InputCreateProductDto): Promise<OutputCreateProductDto> {
        const product = ProductFactory.create("a", input.name, input.price);

        await this.productRepository.create(product);
        

        return {
            id: product.id,
            name: product.name,
            price: product.price
        }
    }
}