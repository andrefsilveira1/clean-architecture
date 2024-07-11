import Product from "../domain/entity/product";
import ProductService from "./product.service";

describe("Product Service unit tests", () => {
    it("Should change all of the prices", () => {
        const product = new Product("product1", "Product1", 10);
        const product2 = new Product("product2", "Product2", 30);

        const products = [product, product2];

        ProductService.increasePrice(products, 100);

        expect(product.price).toBe(20)
        expect(product2.price).toBe(60)
        
    });
})