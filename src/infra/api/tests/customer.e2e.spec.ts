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
        expect(respose.body.address.street).toBe("street");
        expect(respose.body.address.city).toBe("city");
        expect(respose.body.address.number).toBe(123);
        expect(respose.body.address.zip).toBe("12345");
    });

    it("Should not create a costumer", async () => {
        const response = await request(app)
            .post("/customer")
            .send({
                name: "John"
            });

        expect(response.status).toBe(500);
    });

    it("Should list costumers", async () => {
        const response1 = await request(app)
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

        const response2 = await request(app)
            .post("/customer")
            .send({
                name: "Vlogs",
                address: {
                    street: "street",
                    city: "city",
                    number: 123,
                    zip: "12345",
                }
            });

        expect(response1.status).toBe(200);

        const response = await request(app)
            .get("/customer")
            .send();
        
        expect(response.status).toBe(200);
        expect(response.body.customers.length).toBe(2);
        const customer = response.body.customers[0];
        expect(customer.name).toBe("John");
        expect(customer.address.street).toBe("street");

        const customer2 = response.body.customers[1];
        expect(customer2.name).toBe("Vlogs");
        expect(customer2.address.street).toBe("street");
    });
});