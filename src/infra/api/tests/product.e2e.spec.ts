import request from "supertest";
import { app, sequelize } from "../express";

describe("E2E test for product", () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("Should create a product", async () => {
        const respose = await request(app)
            .post("/product")
            .send({
                name: "product 1",
                price: 150.5
            });
        expect(respose.status).toBe(200);
        expect(respose.body.name).toBe("product 1");
        expect(respose.body.price).toBe(150.5);
    });

    it("Should not create a product", async () => {
        const response = await request(app)
            .post("/product")
            .send({
                name: "aaa"
            });

        expect(response.status).toBe(500);
    });

    it("Should list products", async () => {
        const response1 = await request(app)
            .post("/product")
            .send({
                name: "product 1",
                price: 150.5
            });

        const response2 = await request(app)
            .post("/product")
            .send({
                name: "product 2",
                price: 199.9
            });

        expect(response1.status).toBe(200);

        const response = await request(app)
            .get("/product")
            .send();
        
        expect(response.status).toBe(200);
        expect(response.body.products.length).toBe(2);
        const product = response.body.products[0];
        expect(product._name).toBe("product 1");
        expect(product._price).toBe(150.5);

        const product2 = response.body.products[1];
        expect(product2._name).toBe("product 2");
        expect(product2._price).toBe(199.9);
    });
});