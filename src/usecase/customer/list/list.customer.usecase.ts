import Customer from "../../../domain/entity/customer";
import CustomerRepositoryInterface from "../../../domain/repository/customer";
import { InputListCustomerDto, OutputListCustomerDto } from "./list.custumer.dto";

export default class ListCustomerUseCase {
    private CustomerRepository: CustomerRepositoryInterface;

    constructor(CustomerRepository: CustomerRepositoryInterface) {
        this.CustomerRepository = CustomerRepository
    }

    async execute(input: InputListCustomerDto): Promise<OutputListCustomerDto> {
        const customers = await this.CustomerRepository.list();

        return OutputMapper.toOutput(customers);
    }
}


class OutputMapper {
    static toOutput(customer: Customer[]): OutputListCustomerDto {
        return {
            customers: customer.map((customer) => ({
                id: customer.id,
                name: customer.name,
                address: {
                    street: customer.address.street,
                    number: customer.address.number,
                    zip: customer.address.zip,
                    city: customer.address.city
                }
            }))
        }
    }
}