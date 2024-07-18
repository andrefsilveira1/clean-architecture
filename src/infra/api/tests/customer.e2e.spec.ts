import request from "supertest";
import { app, sequelize } from "../express";

describe("E2E test for customer", () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("Should create a customer", async () => {
        const respose = await request(app)
            .post("/customer")
            .send({
                name: "John",
                address: {
                    street: "street",
                    city: "city",
                    number: 123,
                    zip: "12345",
                }
            });
        expect(respose.status).toBe(200);
        expect(respose.body.name).toBe("John");
        expect(respose.body.street).toBe("street");
        expect(respose.body.city).toBe("city");
        expect(respose.body.number).toBe(123);
        expect(respose.body.zip).toBe("12345");
    })
});