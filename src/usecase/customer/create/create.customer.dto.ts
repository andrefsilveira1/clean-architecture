import Address from "../../../domain/entity/address";

export interface InputCreateCustomerDto {
    name: string;
    address: {
        street: string;
        number: number;
        zip: string;
        city: string
    };
}

export interface OutputCreateCustoemrDto {
    id: string;
    name: string;
    address: {
        street: string;
        number: number;
        zip: string;
        city: string
    };
}