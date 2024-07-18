import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../db/sequelize/model/customer";

export const app: Express = express();
export let sequelize: Sequelize;
app.use(express.json());

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
