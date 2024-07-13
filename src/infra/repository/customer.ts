import Address from "../../domain/entity/address";
import Customer from "../../domain/entity/customer";
import CustomerRepositoryInterface from "../../domain/repository/customer";
import CustomerModel from "../db/sequelize/model/customer";
import ProductModel from "../db/sequelize/model/product";

export default class CustomerRepository implements CustomerRepositoryInterface {
    async create(customer: Customer): Promise<void> {
        console.log("CUSTOMER RECEIVED AT CREATE ===>", customer.address)
        await CustomerModel.create({
            id: customer.id,
            name: customer.name,
            street: customer.address.street,
            number: customer.address.number,
            zip: customer.address.zip,
            city: customer.address.city,
            active: customer.isActive(),
            reward: customer.reward
        });
    }

    async update(customer: Customer): Promise<void> {
        await CustomerModel.update(
            {
                id: customer.id,
                name: customer.name,
                street: customer.address.street,
                number: customer.address.number,
                zip: customer.address.zip,
                city: customer.address.city,
                active: customer.isActive(),
                reward: customer.reward
            },
            {
                where: {
                    id: customer.id
                }
            }
        )
    }

    async find(id: string): Promise<Customer> {
        const model = await CustomerModel.findOne({ where: { id } });
        const address = new Address(model.street, model.number, model.zip, model.city)
        const customer = new Customer(model.id, model.name);
        customer.changeAddress(address);
        return customer
    }

    async list(): Promise<Customer[]> {
        const models = await CustomerModel.findAll();
        return models.map((customer) => {
            const address = new Address(customer.street, customer.number, customer.zip, customer.city)
            const model = new Customer(customer.id, customer.name)
            model.changeAddress(address)
            return model
        }
        )
    }
}