import Address from "../../../domain/entity/address";
import CustomerRepositoryInterface from "../../../domain/repository/customer";
import ProductRepositoryInterface from "../../../domain/repository/product";
import { InputUpdateProductDto, OutputUpdateProductDto } from "./update.product.dto";

export default class UpdateProductUseCase {
    private productRepository: ProductRepositoryInterface;

    constructor(productRepository: ProductRepositoryInterface) {
        this.productRepository = productRepository;
    }

    async execute(input: InputUpdateProductDto): Promise<OutputUpdateProductDto> {
        const product = await this.productRepository.find(input.id);
        product.changeName(input.name);
        product.changePrice(input.price);

        return {
            id: product.id,
            name: product.name,
            price: product.price
        }
    }
}