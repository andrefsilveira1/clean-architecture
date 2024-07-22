// import express, {Request, Response} from "express";
// import CreateCustomerUseCase from "../../../usecase/customer/create/create.customer.usecase";
// import CustomerRepository from "../../repository/customer";
// import ListCustomerUseCase from "../../../usecase/customer/list/list.customer.usecase";
// import CreateProductUseCase from "../../../usecase/product/create/create.product.usecase";
// import ProductRepository from "../../repository/product";

// export const productRouter = express.Router();

// productRouter.post("/", async (req: Request, res: Response) => {
//     const usecase = new CreateProductUseCase(new ProductRepository());

//     try {
//         const customerDto = {
//             name: req.body.name,
//             address: {
//                 street: req.body.address.street,
//                 city: req.body.address.city,
//                 number: req.body.address.number,
//                 zip: req.body.address.zip,
//             }
//         }

//         const output = await usecase.execute(customerDto);
//         res.send(output);
//     } catch (err) {
//         res.status(500).send(err);
//     }
// });

// productRouter.get("/", async (req: Request, res: Response) => {
//     const usecase = new ListCustomerUseCase(new CustomerRepository());

//     try {
//         const output = await usecase.execute({});
//         res.send(output);
//     } catch (err) {
//         res.status(500).send(err);
//     }
// });