import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../db/sequelize/model/customer";
import { customerRoute } from "./routes/customer";

export const app: Express = express();
export let sequelize: Sequelize;
app.use(express.json());
app.use("/customer", customerRoute);

async function setup() {
    sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
    });
    await sequelize.addModels([CustomerModel]);
    await sequelize.sync();
};

setup();
