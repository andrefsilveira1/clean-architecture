import Address from "../../../domain/entity/address";
import CustomerRepositoryInterface from "../../../domain/repository/customer";
import { OutputCreateCustomerDto } from "../create/create.customer.dto";
import { InputUpdateCustomerDto } from "./update.customer.dto";

export default class UpdateCustomerUseCase {
    private customerRepository: CustomerRepositoryInterface;

    constructor(CustomerRepository: CustomerRepositoryInterface) {
        this.customerRepository = CustomerRepository;
    }

    async execute(input: InputUpdateCustomerDto): Promise<OutputCreateCustomerDto> {
        const customer = await this.customerRepository.find(input.id);
        customer.changeName(input.name);
        customer.changeAddress(
            new Address(
                input.address.street,
                input.address.number,
                input.address.zip,
                input.address.city,
            )
        );

        return {
            id: customer.id,
            name: customer.name,
            address: {
                street: customer.address.street,
                number: customer.address.number,
                zip: customer.address.zip,
                city: customer.address.city,
            }
        }
    }
}