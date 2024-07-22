import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../db/sequelize/model/customer";
import { customerRoute } from "./routes/customer";
import { productRouter } from "./routes/products";
import ProductModel from "../db/sequelize/model/product";

export const app: Express = express();
export let sequelize: Sequelize;
app.use(express.json());
app.use("/customer", customerRoute);
app.use("/product", productRouter);

async function setup() {
    sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
    });
    await sequelize.addModels([CustomerModel, ProductModel]);
    await sequelize.sync();
};

setup();
