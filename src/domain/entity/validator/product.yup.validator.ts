import ValidatorInterface from "../../@shared/validator/validator.interface";
import * as yup from "yup"
import Product from "../product";

export default class ProductYupValidator implements ValidatorInterface<Product> {
    validate(entity: Product): void {
        try {
            yup
            .object()
            .shape({
                id: yup.string().required("Id is required"),
                name: yup.string().required("Name is required"),
                price: yup.number().positive("Price can not be negative")

            })
            .validateSync({
                id: entity.id,
                name: entity.name,
                price: entity.price
            },
            {
                abortEarly: false,
            }
        )
        } catch (err) {
            const errs = err as yup.ValidationError;
            errs.errors.forEach((error) => {
                entity.notification.addError({
                    context: "Product",
                    message: error
                })
            })
        }
    }
}